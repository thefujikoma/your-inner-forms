import { useEffect, useState } from 'react';

interface InsightMomentProps {
  show: boolean;
}

export function InsightMoment({ show }: InsightMomentProps) {
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (show && !hasShown) {
      // Delay before showing
      const showTimer = setTimeout(() => {
        setVisible(true);
        setHasShown(true);
      }, 500);

      return () => clearTimeout(showTimer);
    }
  }, [show, hasShown]);

  useEffect(() => {
    if (visible) {
      // Auto-hide after 4 seconds
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(hideTimer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <div className="text-center px-8 fade-in">
        <p className="text-2xl md:text-3xl font-light text-foreground tracking-wide text-glow">
          Different animals.
        </p>
        <p className="text-2xl md:text-3xl font-bold text-primary tracking-wide mt-1 text-glow">
          Same bones.
        </p>
      </div>
    </div>
  );
}
