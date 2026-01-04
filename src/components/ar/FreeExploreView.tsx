import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { FormSelector } from './FormSelector';
import { InstructionOverlay } from './InstructionOverlay';
import { InsightMoment } from './InsightMoment';
import { BoneKeyOverlay } from './BoneKeyOverlay';
import { CreditsOverlay } from './CreditsOverlay';
import { AnimalDetailDrawer } from './AnimalDetailDrawer';
import { SPECIES_DATA, Species, BONE_GROUPS } from '@/types/species';
import { Info, ChevronDown, Hand, Move3D, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { MODEL_CONFIG } from '@/constants/modelConfig';

// GLB Model component - Zero transforms to test raw Blender export
function SpeciesModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  // Clone the scene to avoid issues with reusing
  const clonedScene = scene.clone();
  
  return (
    <primitive 
      object={clonedScene} 
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Placeholder skeleton visualization
function PlaceholderSkeleton() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Create a simple bone structure placeholder
  const bonePositions = [
    { pos: [0, 0, 0], scale: [0.8, 0.15, 0.15], color: BONE_GROUPS[0].color }, // Humerus
    { pos: [0, -0.5, 0], scale: [0.12, 0.7, 0.12], color: BONE_GROUPS[1].color }, // Radius
    { pos: [0.15, -0.5, 0], scale: [0.1, 0.65, 0.1], color: BONE_GROUPS[2].color }, // Ulna
    { pos: [-0.1, -1, 0], scale: [0.3, 0.15, 0.1], color: BONE_GROUPS[3].color }, // Carpals
    { pos: [-0.2, -1.3, 0], scale: [0.08, 0.25, 0.08], color: BONE_GROUPS[4].color }, // Metacarpal 1
    { pos: [-0.05, -1.35, 0], scale: [0.08, 0.3, 0.08], color: BONE_GROUPS[4].color }, // Metacarpal 2
    { pos: [0.1, -1.35, 0], scale: [0.08, 0.28, 0.08], color: BONE_GROUPS[4].color }, // Metacarpal 3
    { pos: [-0.2, -1.55, 0], scale: [0.06, 0.15, 0.06], color: BONE_GROUPS[5].color }, // Phalanx 1
    { pos: [-0.05, -1.65, 0], scale: [0.06, 0.18, 0.06], color: BONE_GROUPS[5].color }, // Phalanx 2
    { pos: [0.1, -1.6, 0], scale: [0.06, 0.16, 0.06], color: BONE_GROUPS[5].color }, // Phalanx 3
  ];

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {bonePositions.map((bone, i) => (
        <mesh key={i} position={bone.pos as [number, number, number]}>
          <boxGeometry args={bone.scale as [number, number, number]} />
          <meshStandardMaterial 
            color={bone.color} 
            emissive={bone.color}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#3157FF" wireframe />
    </mesh>
  );
}

// Scene component with controls
function Scene({ modelPath }: { modelPath?: string }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 3);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#8b5cf6" />
      
      <Suspense fallback={<LoadingFallback />}>
        {modelPath ? (
          <SpeciesModel modelPath={modelPath} />
        ) : (
          <PlaceholderSkeleton />
        )}
      </Suspense>
      
      <OrbitControls 
        enablePan={false}
        minDistance={1.5}
        maxDistance={5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export function FreeExploreView() {
  const navigate = useNavigate();
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(SPECIES_DATA[0]);
  const [showInstruction, setShowInstruction] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBoneKey, setShowBoneKey] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Hide instruction after interaction
  useEffect(() => {
    if (hasInteracted && showInstruction) {
      const timer = setTimeout(() => {
        setShowInstruction(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, showInstruction]);

  const handleSpeciesChange = (species: Species) => {
    setSelectedSpecies(species);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleCanvasInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (showInstruction) {
      setShowInstruction(false);
    }
  };

  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      {/* 3D Canvas */}
      <div 
        className="absolute inset-0"
        onPointerDown={handleCanvasInteraction}
      >
        <Canvas>
          <Scene modelPath={selectedSpecies.modelPath} />
        </Canvas>
      </div>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 pointer-events-none" />
      
      {/* Instruction Overlay - modified for free explore */}
      {showInstruction && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center space-y-4 p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-xs mx-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Move3D className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium">Touch & Drag to Rotate</p>
            <p className="text-muted-foreground text-sm">Pinch to zoom • Swipe below to change animals</p>
          </div>
        </div>
      )}
      
      {/* Top Info Button */}
      <button
        onClick={() => setShowCredits(true)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-secondary transition-colors z-10"
      >
        <Info className="w-5 h-5 text-muted-foreground" />
      </button>
      
      {/* Mode Switch Button */}
      <button
        onClick={() => navigate('/explore?mode=hand')}
        className="absolute top-4 right-16 h-10 px-3 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center gap-2 border border-border/50 hover:bg-secondary transition-colors z-10"
      >
        <Hand className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Try Hand Mode</span>
      </button>
      
      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-secondary transition-colors z-10"
      >
        <Home className="w-5 h-5 text-muted-foreground" />
      </button>
      
      {/* Species Info Display */}
      <div className="absolute top-16 left-4 z-10">
        <button
          onClick={() => setShowDetail(true)}
          className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50 text-left hover:bg-card/90 transition-colors group"
        >
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            {selectedSpecies.commonName}
          </h2>
          <p className="text-sm text-muted-foreground italic">
            {selectedSpecies.scientificName}
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
            <span>More info</span>
            <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
      
      {/* Form Selector */}
      <FormSelector
        species={SPECIES_DATA}
        selected={selectedSpecies}
        onSelect={handleSpeciesChange}
        onOpenBoneKey={() => setShowBoneKey(true)}
      />
      
      {/* Insight Moment */}
      <InsightMoment show={hasInteracted} />
      
      {/* Bone Key Overlay */}
      <BoneKeyOverlay 
        isOpen={showBoneKey} 
        onClose={() => setShowBoneKey(false)} 
      />
      
      {/* Credits Overlay */}
      <CreditsOverlay 
        isOpen={showCredits} 
        onClose={() => setShowCredits(false)} 
      />
      
      {/* Animal Detail Drawer */}
      <AnimalDetailDrawer
        species={selectedSpecies}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </div>
  );
}
