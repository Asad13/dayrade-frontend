import { ReactNode, Suspense } from 'react';
import ErrorBoundary from '@src/components/utils/ErrorBoundary';
import Loader from '@ui/Loader';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const SuspenseBoundary = ({ children, fallback }: SuspenseBoundaryProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback !== undefined ? fallback : <Loader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseBoundary;
