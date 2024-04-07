import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (appContext === undefined) {
    throw new Error('useAppContext must be used inside the AppProvider');
  }

  return appContext;
};
