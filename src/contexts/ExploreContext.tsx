import { createContext, useContext, useState, ReactNode } from 'react';

export type ExploreMode = 'hand' | 'free';

interface ExploreContextType {
  mode: ExploreMode;
  setMode: (mode: ExploreMode) => void;
}

const ExploreContext = createContext<ExploreContextType | undefined>(undefined);

export function ExploreProvider({ children, initialMode = 'hand' }: { children: ReactNode; initialMode?: ExploreMode }) {
  const [mode, setMode] = useState<ExploreMode>(initialMode);

  return (
    <ExploreContext.Provider value={{ mode, setMode }}>
      {children}
    </ExploreContext.Provider>
  );
}

export function useExploreMode() {
  const context = useContext(ExploreContext);
  if (context === undefined) {
    throw new Error('useExploreMode must be used within an ExploreProvider');
  }
  return context;
}
