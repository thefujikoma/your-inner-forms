import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HandLandmark } from './useHandTracking';
import { MODEL_CONFIG } from '@/constants/modelConfig';

interface SkeletonOverlayProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  landmarks: HandLandmark[] | null;
  speciesId: string;
  modelPath?: string;
  userScale?: number;
  isMirrored?: boolean;
}

export function useSkeletonOverlay({ canvasRef, landmarks, speciesId, modelPath, userScale = 1, isMirrored = false }: SkeletonOverlayProps) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const loaderRef = useRef<GLTFLoader | null>(null);
  const loadedModelPathRef = useRef<string | null>(null);
  
  // Smoothing refs for temporal filtering
  const prevPositionRef = useRef(new THREE.Vector3());
  const prevQuaternionRef = useRef(new THREE.Quaternion());
  const isFirstFrameRef = useRef(true);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera for 2D overlay
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create skeleton group
    const skeletonGroup = new THREE.Group();
    scene.add(skeletonGroup);
    skeletonGroupRef.current = skeletonGroup;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Initialize GLTF loader
    loaderRef.current = new GLTFLoader();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [canvasRef]);

  // Load GLB model when modelPath changes
  useEffect(() => {
    if (!sceneRef.current || !modelPath || !loaderRef.current) return;
    
    // Skip if already loaded this model
    if (loadedModelPathRef.current === modelPath && modelRef.current) return;
    
    const scene = sceneRef.current;
    const loader = loaderRef.current;
    
    // Remove previous model if exists
    if (modelRef.current) {
      scene.remove(modelRef.current);
      modelRef.current = null;
    }
    
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene.clone();
        model.visible = false; // Start hidden, show when hand detected
        scene.add(model);
        modelRef.current = model;
        loadedModelPathRef.current = modelPath;
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );
  }, [modelPath]);

  // Update model/skeleton based on hand landmarks
  useEffect(() => {
    if (!landmarks) {
      // Hide model when no hand detected
      if (modelRef.current) {
        modelRef.current.visible = false;
      }
      return;
    }

    // If we have a model loaded, position it on the hand
    if (modelRef.current && modelPath) {
      const model = modelRef.current;
      model.visible = true;
      
      // Hide skeleton wireframe when using 3D model
      if (skeletonGroupRef.current) {
        skeletonGroupRef.current.visible = false;
      }
      
      // Get key landmarks for orientation calculation
      // Landmark 0 = Wrist, 5 = Index MCP, 17 = Pinky MCP, 9 = Middle MCP
      const wrist = landmarks[0];
      const indexMcp = landmarks[5];
      const pinkyMcp = landmarks[17];
      const middleMcp = landmarks[9];
      const middleFingerTip = landmarks[12];
      
      // Helper function to mirror X coordinate when in mirrored mode
      const mirrorX = (x: number) => isMirrored ? 1 - x : x;
      
      // Apply mirroring to landmark X coordinates
      const wristX = mirrorX(wrist.x);
      const indexMcpX = mirrorX(indexMcp.x);
      const pinkyMcpX = mirrorX(pinkyMcp.x);
      const middleMcpX = mirrorX(middleMcp.x);
      const middleFingerTipX = mirrorX(middleFingerTip.x);
      
      // Calculate hand center (between wrist and middle finger base)
      const centerX = (wristX + middleMcpX) / 2;
      const centerY = (wrist.y + middleMcp.y) / 2;
      
      // Calculate hand size for scaling
      const handSize = Math.sqrt(
        Math.pow(middleFingerTipX - wristX, 2) + 
        Math.pow(middleFingerTip.y - wrist.y, 2)
      );
      
      // Calculate target position (convert normalized coords to NDC)
      // Note: In mirrored mode, we also need to flip the final X position
      const targetPosition = new THREE.Vector3(
        (isMirrored ? -(centerX - 0.5) : (centerX - 0.5)) * 2,
        -(centerY - 0.5) * 2,
        0
      );
      
      // === Fresh 3D Rotation Alignment for RIGHT HAND ===
      // Using back camera (no mirroring) OR laptop webcam (mirrored)
      // Models are Y-up from Blender export
      
      // Z-axis: Direction from index MCP (5) back to wrist (0)
      // Flipped to align model's "forward" with fingers pointing away
      // In mirrored mode, we flip X direction
      const zAxis = new THREE.Vector3(
        isMirrored ? -(wristX - indexMcpX) : (wristX - indexMcpX),  // X: reversed direction, flipped in mirror
        -(wrist.y - indexMcp.y),        // Y: flip (screen Y is inverted)
        -(wrist.z - indexMcp.z)         // Z: flip (MediaPipe Z is opposite)
      ).normalize();
      
      // X-axis: Direction from index MCP (5) to pinky MCP (17)
      // This is the "right" direction across the knuckles
      // In mirrored mode, we flip X direction
      const xAxis = new THREE.Vector3(
        isMirrored ? -(pinkyMcpX - indexMcpX) : (pinkyMcpX - indexMcpX),  // X: same direction, flipped in mirror
        -(pinkyMcp.y - indexMcp.y),     // Y: flip
        -(pinkyMcp.z - indexMcp.z)      // Z: flip
      ).normalize();
      
      // Y-axis: Cross product gives palm normal (up direction)
      // For right-handed coordinate system with right hand: Y = Z cross X
      const yAxis = new THREE.Vector3().crossVectors(zAxis, xAxis).normalize();
      
      // Recalculate X to ensure perfect orthogonality: X = Y cross Z
      xAxis.crossVectors(yAxis, zAxis).normalize();
      
      // Build rotation matrix from orthonormal basis
      const handRotation = new THREE.Matrix4();
      handRotation.makeBasis(xAxis, yAxis, zAxis);
      
      // Calculate target quaternion from rotation matrix
      const targetQuaternion = new THREE.Quaternion();
      targetQuaternion.setFromRotationMatrix(handRotation);
      
      // Apply temporal smoothing
      const smoothing = MODEL_CONFIG.SMOOTHING_FACTOR;
      
      if (isFirstFrameRef.current) {
        // First frame: no smoothing, set directly
        prevPositionRef.current.copy(targetPosition);
        prevQuaternionRef.current.copy(targetQuaternion);
        isFirstFrameRef.current = false;
      } else {
        // Smooth position using lerp (interpolate toward target)
        targetPosition.lerp(prevPositionRef.current, 1 - smoothing);
        prevPositionRef.current.copy(targetPosition);
        
        // Smooth rotation using slerp (spherical interpolation)
        targetQuaternion.slerp(prevQuaternionRef.current, 1 - smoothing);
        prevQuaternionRef.current.copy(targetQuaternion);
      }
      
      // Apply smoothed position and rotation
      model.position.copy(targetPosition);
      model.setRotationFromQuaternion(targetQuaternion);
      
      // Scale based on hand size with calibrated multiplier and user scale
      const dynamicScale = handSize * MODEL_CONFIG.HAND_MODE_SCALE_MULTIPLIER * userScale;
      model.scale.set(dynamicScale, dynamicScale, dynamicScale);
      
      return; // Don't draw wireframe when using model
    }

    // Fallback: draw wireframe skeleton if no model
    const group = skeletonGroupRef.current;
    if (!group) return;
    
    // Make skeleton visible when no model
    group.visible = true;
    
    // Clear previous skeleton
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
      group.remove(child);
    }

    // Get hand bounds from landmarks
    const wrist = landmarks[0];
    const middleFingerTip = landmarks[12];
    
    // Calculate hand center and size
    const centerX = (wrist.x + middleFingerTip.x) / 2;
    const centerY = (wrist.y + middleFingerTip.y) / 2;
    const handSize = Math.sqrt(
      Math.pow(middleFingerTip.x - wrist.x, 2) + 
      Math.pow(middleFingerTip.y - wrist.y, 2)
    );

    // Create a simple placeholder box/wireframe
    const geometry = new THREE.BoxGeometry(handSize * 1.5, handSize * 2, 0.02);
    const edges = new THREE.EdgesGeometry(geometry);
    
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.8,
    });
    
    const wireframe = new THREE.LineSegments(edges, material);
    
    // Position based on hand
    wireframe.position.x = (centerX - 0.5) * 2;
    wireframe.position.y = -(centerY - 0.5) * 2;
    
    group.add(wireframe);

    // Add bone-like segments connecting key landmarks
    const boneColor = 0x00d4ff;
    const boneMaterial = new THREE.MeshBasicMaterial({ 
      color: boneColor,
      transparent: true,
      opacity: 0.7,
    });

    // Simplified bone connections (wrist to each fingertip)
    const connections = [
      [0, 5, 9],   // palm
      [5, 6, 7, 8], // index
      [9, 10, 11, 12], // middle
      [13, 14, 15, 16], // ring
      [17, 18, 19, 20], // pinky
      [0, 1, 2, 3, 4], // thumb
    ];

    connections.forEach((chain) => {
      for (let i = 0; i < chain.length - 1; i++) {
        const start = landmarks[chain[i]];
        const end = landmarks[chain[i + 1]];
        
        const startVec = new THREE.Vector3(
          (start.x - 0.5) * 2,
          -(start.y - 0.5) * 2,
          0
        );
        const endVec = new THREE.Vector3(
          (end.x - 0.5) * 2,
          -(end.y - 0.5) * 2,
          0
        );

        const boneGeometry = new THREE.CylinderGeometry(0.01, 0.008, startVec.distanceTo(endVec), 6);
        const bone = new THREE.Mesh(boneGeometry, boneMaterial.clone());
        
        // Position at midpoint
        bone.position.copy(startVec.clone().add(endVec).multiplyScalar(0.5));
        
        // Rotate to align with direction
        bone.lookAt(endVec);
        bone.rotateX(Math.PI / 2);
        
        group.add(bone);
      }
    });

    // Add joint spheres
    const jointMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
    });

    landmarks.forEach((lm, index) => {
      const jointSize = index === 0 ? 0.02 : 0.012;
      const jointGeometry = new THREE.SphereGeometry(jointSize, 8, 8);
      const joint = new THREE.Mesh(jointGeometry, jointMaterial.clone());
      
      joint.position.x = (lm.x - 0.5) * 2;
      joint.position.y = -(lm.y - 0.5) * 2;
      joint.position.z = 0;
      
      group.add(joint);
    });

  }, [landmarks, speciesId, modelPath, userScale, isMirrored]);

  // Animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { sceneRef, cameraRef, rendererRef };
}
