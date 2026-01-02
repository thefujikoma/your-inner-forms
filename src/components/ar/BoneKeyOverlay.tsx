import { BONE_GROUPS } from '@/types/species';
import { X } from 'lucide-react';

interface BoneKeyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BoneKeyOverlay({ isOpen, onClose }: BoneKeyOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-card border-t border-border rounded-t-2xl p-6 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground tracking-wide">
            Bone Color Key
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Bone List */}
        <div className="space-y-3">
          {BONE_GROUPS.map((bone) => (
            <div 
              key={bone.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 border border-border/50"
            >
              <div 
                className="w-5 h-5 rounded-full shadow-lg"
                style={{ 
                  backgroundColor: bone.color,
                  boxShadow: `0 0 12px ${bone.color}40`
                }}
              />
              <span className="text-sm font-medium text-foreground">
                {bone.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          These bone groups are homologous across all vertebrate limbs
        </p>
      </div>
    </div>
  );
}
