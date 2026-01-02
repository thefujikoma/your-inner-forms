import { Species } from '@/types/species';
import { Palette } from 'lucide-react';

interface FormSelectorProps {
  species: Species[];
  selected: Species;
  onSelect: (species: Species) => void;
  onOpenBoneKey: () => void;
}

export function FormSelector({ species, selected, onSelect, onOpenBoneKey }: FormSelectorProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-8 px-4">
        {/* Title */}
        <p className="text-center text-sm text-muted-foreground tracking-widest uppercase mb-4">
          See your hand as a…
        </p>
        
        {/* Species Pills */}
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {species.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selected.id === s.id
                  ? 'bg-primary text-primary-foreground box-glow'
                  : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border/50'
              }`}
            >
              {s.commonName}
            </button>
          ))}
        </div>
        
        {/* Bottom Info Bar */}
        <div className="flex items-center justify-between px-2">
          {/* Era Info */}
          <div className="flex gap-4">
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Geological Era</p>
              <p className="text-sm font-semibold text-foreground">{selected.era}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Time Period</p>
              <p className="text-sm font-semibold text-foreground">{selected.period}</p>
            </div>
          </div>
          
          {/* Bone Key Button */}
          <button
            onClick={onOpenBoneKey}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 border border-border/50 hover:bg-secondary transition-colors"
          >
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Bone Key</span>
          </button>
        </div>
      </div>
    </div>
  );
}
