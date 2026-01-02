import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

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

  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const onResults = useCallback((results: Results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0].map((lm) => ({
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
  }, []);

  const initializeTracking = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);
      handsRef.current = hands;

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (handsRef.current && videoRef.current) {
            await handsRef.current.send({ image: videoRef.current });
          }
        },
        width: 1280,
        height: 720,
        facingMode: 'environment',
      });

      cameraRef.current = camera;
      await camera.start();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Hand tracking initialization error:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to initialize camera or hand tracking',
      }));
    }
  }, [videoRef, onResults]);

  useEffect(() => {
    initializeTracking();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [initializeTracking]);

  return state;
}
