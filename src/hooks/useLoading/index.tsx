import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { createContext } from 'react';
import { LoadingProviderProps, LoadingContextData } from './types';

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData,
);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextData {
  const ctx = useContext(LoadingContext);

  if (!ctx) return {} as LoadingContextData;

  return ctx;
}
