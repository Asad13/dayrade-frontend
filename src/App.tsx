import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useUserContext } from '@hooks/useUserContext';
import AuthRouter from '@router/auth';
import DefaultRouter from '@router/default';
import { checkAuth } from '@services/auth';
import Loader from './ui/Loader';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useUserContext();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const data = await checkAuth();
      setIsAuthenticated(data.status ?? false);
    };

    checkAuthStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated == null) {
    return <Loader />;
  }

  let router;

  if (isAuthenticated) {
    router = createBrowserRouter([...DefaultRouter], {
      basename: '/dashboard',
    });
  } else {
    router = createBrowserRouter([...AuthRouter], {
      basename: '/dashboard',
    });
  }

  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
