import { ReactNode } from 'react';
import { LoadingProvider } from './useLoading';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      <LoadingProvider>{children}</LoadingProvider>
    </>
  );
}
