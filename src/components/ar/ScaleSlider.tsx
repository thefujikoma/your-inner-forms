import { Minus, Plus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { MODEL_CONFIG } from '@/constants/modelConfig';

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function ScaleSlider({ value, onChange }: ScaleSliderProps) {
  const min = MODEL_CONFIG.MIN_USER_SCALE;
  const max = MODEL_CONFIG.MAX_USER_SCALE;
  const percentage = Math.round(value * 100);

  return (
    <div className="flex flex-col items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full py-3 px-2 border border-border/50">
      <button
        onClick={() => onChange(Math.min(max, value + 0.1))}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label="Increase scale"
      >
        <Plus className="w-4 h-4 text-muted-foreground" />
      </button>
      
      <div className="h-24 flex items-center">
        <Slider
          orientation="vertical"
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={0.1}
          className="h-full"
        />
      </div>
      
      <button
        onClick={() => onChange(Math.max(min, value - 0.1))}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label="Decrease scale"
      >
        <Minus className="w-4 h-4 text-muted-foreground" />
      </button>
      
      <span className="text-xs text-muted-foreground font-medium">
        {percentage}%
      </span>
    </div>
  );
}
