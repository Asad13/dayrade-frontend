import { useEffect } from 'react';
import {
  Outlet,
  ScrollRestoration,
  useNavigation,
  useLocation,
} from 'react-router-dom';
import AxiosInterceptors from '@components/utils/AxiosInterceptors';
import { checkAuth } from '@services/auth';
import { useUserContext } from '@hooks/useUserContext';

const Root = () => {
  const { isAuthenticated, setIsAuthenticated } = useUserContext();
  const navigation = useNavigation();
  const location = useLocation();

  useEffect(() => {
    // Get New Access Token if already is authenticated(has access token or isAuthenticated is true)
    // In backend do Refresh Token rotation: create a new refresh token and update the cookie
    const checkAuthStatus = async () => {
      const data = await checkAuth();
      setIsAuthenticated(data?.status ?? false);
    };

    if (isAuthenticated) {
      checkAuthStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {/* If necessary Make Outlet and ScrollRestoration wait until app requiremnts like AxiosInterceptors are loaded using a state */}
      {/* ToastContainer */}
      <AxiosInterceptors />
      <div
        id="page"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Root;
