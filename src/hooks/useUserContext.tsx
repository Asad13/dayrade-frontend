import { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error('useAppContext must be used inside the UserProvider');
  }

  return userContext;
};
