import { Hand } from 'lucide-react';

interface InstructionOverlayProps {
  visible: boolean;
}

export function InstructionOverlay({ visible }: InstructionOverlayProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="text-center space-y-4 fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto pulse-glow">
          <Hand className="w-10 h-10 text-primary" />
        </div>
        <p className="text-lg text-foreground font-medium tracking-wide">
          Hold up your hand
        </p>
        <p className="text-sm text-muted-foreground">
          Position your hand in view of the camera
        </p>
      </div>
    </div>
  );
}
