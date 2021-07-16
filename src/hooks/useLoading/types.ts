import { ReactNode } from 'react';

export type LoadingProviderProps = {
  children: ReactNode;
};

export type LoadingContextData = {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
};
