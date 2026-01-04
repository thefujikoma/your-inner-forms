import { useRef, useState, useEffect } from 'react';
import { useHandTracking } from '@/hooks/useHandTracking';
import { useSkeletonOverlay } from '@/hooks/useSkeletonOverlay';
import { FormSelector } from './FormSelector';
import { InstructionOverlay } from './InstructionOverlay';
import { InsightMoment } from './InsightMoment';
import { BoneKeyOverlay } from './BoneKeyOverlay';
import { CreditsOverlay } from './CreditsOverlay';
import { AnimalDetailDrawer } from './AnimalDetailDrawer';
import { ScaleSlider } from './ScaleSlider';
import { SPECIES_DATA, Species } from '@/types/species';
import { Info, ChevronDown, Move3D, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MODEL_CONFIG } from '@/constants/modelConfig';

export function CameraView() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(SPECIES_DATA[0]);
  const [showInstruction, setShowInstruction] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBoneKey, setShowBoneKey] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [userScale, setUserScale] = useState(MODEL_CONFIG.DEFAULT_USER_SCALE);
  const [showScaleSlider, setShowScaleSlider] = useState(false);
  
  const { isLoading, isTracking, landmarks, error } = useHandTracking(videoRef);
  
  useSkeletonOverlay({
    canvasRef,
    landmarks,
    speciesId: selectedSpecies.id,
    modelPath: selectedSpecies.modelPath,
    userScale,
  });

  // Hide instruction after hand is detected
  useEffect(() => {
    if (isTracking && showInstruction) {
      const timer = setTimeout(() => {
        setShowInstruction(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTracking, showInstruction]);

  const handleSpeciesChange = (species: Species) => {
    setSelectedSpecies(species);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />
      
      {/* Dark overlay for hand area - creates depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 pointer-events-none" />
      
      {/* 3D Skeleton Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm tracking-wide uppercase">
              Initializing AR
            </p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 p-6">
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
              <span className="text-destructive text-2xl">!</span>
            </div>
            <p className="text-foreground font-medium">Camera Access Required</p>
            <p className="text-muted-foreground text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {/* Instruction Overlay */}
      <InstructionOverlay visible={showInstruction && !isLoading && !error} />
      
      {/* Mode Switch Button */}
      <button
        onClick={() => navigate('/explore?mode=free')}
        className="absolute top-4 right-16 h-10 px-3 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center gap-2 border border-border/50 hover:bg-secondary transition-colors z-10"
      >
        <Move3D className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Free Explore</span>
      </button>
      
      {/* Top Info Button */}
      <button
        onClick={() => setShowCredits(true)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-secondary transition-colors z-10"
      >
        <Info className="w-5 h-5 text-muted-foreground" />
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
      
      {/* Tracking Indicator */}
      <div className="absolute top-20 right-4 z-10">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
          isTracking 
            ? 'bg-primary/20 text-primary border border-primary/30' 
            : 'bg-secondary/50 text-muted-foreground border border-border/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isTracking ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
          }`} />
          {isTracking ? 'Tracking' : 'No Hand'}
        </div>
      </div>
      
      {/* Form Selector */}
      <FormSelector
        species={SPECIES_DATA}
        selected={selectedSpecies}
        onSelect={handleSpeciesChange}
        onOpenBoneKey={() => setShowBoneKey(true)}
        onOpenScaleSlider={() => setShowScaleSlider(true)}
      />
      
      {/* Scale Slider Overlay */}
      <ScaleSlider 
        value={userScale} 
        onChange={setUserScale}
        isOpen={showScaleSlider}
        onToggle={() => setShowScaleSlider(!showScaleSlider)}
      />
      
      {/* Insight Moment - appears once after first interaction */}
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
