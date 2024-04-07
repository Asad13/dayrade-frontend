import { Suspense } from 'react';
import type { ReactNode } from 'react';
import AppProvider from '@contexts/AppContext';
import UserProvider from '@contexts/UserContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@utils/queryClient';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Loader from '@ui/Loader';

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <AppProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </I18nextProvider>
        </QueryClientProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default Provider;
