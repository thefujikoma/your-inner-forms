import { useSearchParams } from 'react-router-dom';
import { CameraView } from '@/components/ar/CameraView';
import { FreeExploreView } from '@/components/ar/FreeExploreView';
import { ExploreProvider, ExploreMode } from '@/contexts/ExploreContext';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  
  // Default to 'hand' mode if not specified or invalid
  const mode: ExploreMode = modeParam === 'free' ? 'free' : 'hand';

  return (
    <ExploreProvider initialMode={mode}>
      <div className="h-full w-full">
        {mode === 'free' ? <FreeExploreView /> : <CameraView />}
      </div>
    </ExploreProvider>
  );
}
