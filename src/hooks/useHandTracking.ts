import { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface HandTrackingState {
  isLoading: boolean;
  isTracking: boolean;
  landmarks: HandLandmark[] | null;
  error: string | null;
}

export function useHandTracking(videoRef: React.RefObject<HTMLVideoElement>) {
  const [state, setState] = useState<HandTrackingState>({
    isLoading: true,
    isTracking: false,
    landmarks: null,
    error: null,
  });

  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const processFrame = useCallback(() => {
    if (!handLandmarkerRef.current || !videoRef.current) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const video = videoRef.current;
    
    if (video.readyState >= 2) {
      try {
        const results: HandLandmarkerResult = handLandmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0].map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
          }));
          setState((prev) => ({
            ...prev,
            isTracking: true,
            landmarks,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isTracking: false,
            landmarks: null,
          }));
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [videoRef]);

  const initializeTracking = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      // Request camera access first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      
      await new Promise<void>((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            resolve();
          };
        }
      });

      // Initialize MediaPipe HandLandmarker
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      handLandmarkerRef.current = handLandmarker;

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      // Start processing frames
      processFrame();
    } catch (error) {
      console.error('Hand tracking initialization error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize';
      
      let userMessage = 'Failed to initialize camera or hand tracking';
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        userMessage = 'Camera access denied. Please allow camera access and reload.';
      } else if (errorMessage.includes('NotFoundError')) {
        userMessage = 'No camera found. Please connect a camera.';
      }
      
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: userMessage,
      }));
    }
  }, [videoRef, processFrame]);

  useEffect(() => {
    initializeTracking();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, [initializeTracking]);

  return state;
}
