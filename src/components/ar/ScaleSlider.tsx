import { Minus, Plus, Search, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { MODEL_CONFIG } from '@/constants/modelConfig';

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ScaleSlider({ value, onChange, isOpen, onToggle }: ScaleSliderProps) {
  const min = MODEL_CONFIG.MIN_USER_SCALE;
  const max = MODEL_CONFIG.MAX_USER_SCALE;
  const percentage = Math.round(value * 100);

  // Only render the overlay when open
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onToggle}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-card border-t border-border rounded-t-2xl p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground tracking-wide">
            Zoom In/Out
          </h3>
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Slider */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
          <button
            onClick={() => onChange(Math.max(min, value - 0.1))}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Decrease scale"
          >
            <Minus className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex-1">
            <Slider
              value={[value]}
              onValueChange={([v]) => onChange(v)}
              min={min}
              max={max}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <button
            onClick={() => onChange(Math.min(max, value + 0.1))}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Increase scale"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Scale Display */}
        <div className="text-center mt-4">
          <span className="text-2xl font-semibold text-foreground">{percentage}%</span>
        </div>
        
        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Adjust the model size to fit your screen
        </p>
      </div>
    </div>
  );
}
