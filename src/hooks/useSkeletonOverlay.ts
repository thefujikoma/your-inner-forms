import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HandLandmark } from './useHandTracking';

interface SkeletonOverlayProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  landmarks: HandLandmark[] | null;
  speciesId: string;
}

export function useSkeletonOverlay({ canvasRef, landmarks, speciesId }: SkeletonOverlayProps) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);

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

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [canvasRef]);

  // Update skeleton based on hand landmarks
  useEffect(() => {
    if (!skeletonGroupRef.current || !landmarks) return;

    const group = skeletonGroupRef.current;
    
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

  }, [landmarks, speciesId]);

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
