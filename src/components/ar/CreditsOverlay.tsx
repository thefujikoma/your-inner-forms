import { X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreditsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsOverlay({ isOpen, onClose }: CreditsOverlayProps) {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleViewReferences = () => {
    onClose();
    navigate('/references');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl p-6 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground tracking-wide">
            Your Inner Form
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This AR experience reveals the deep evolutionary history hidden within your hand. 
            The same bones that form your fingers also appear in fish fins, bat wings, and 
            tortoise limbs—evidence of our shared ancestry across hundreds of millions of years.
          </p>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground/70">
              Hand tracking powered by MediaPipe
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              3D rendering with Three.js
            </p>
          </div>
          
          <div className="pt-4 border-t border-border">
            <button
              onClick={handleViewReferences}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
            >
              View Full Attribution
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="pt-3 text-center space-y-2">
            <p className="text-xs text-primary">
              Designed for Educational Use
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/eawilkinson/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Built by Eric Wilkinson
              </a>
              <span>•</span>
              <a
                href="https://lovable.dev/invite/ZHS1ZL2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Made with Lovable
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
