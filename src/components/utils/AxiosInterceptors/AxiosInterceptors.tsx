import { useEffect } from 'react';
import { axiosPrivate } from '@src/utils/axiosInstances';
import { useNavigate, useLocation } from 'react-router-dom';

const AxiosInterceptors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          // Make the user logout => invalidate the query which keeps the authenticate state fetch in App.tsx and Root.tsx
          // if (location.pathname === '/') {
          //   navigate(0);
          // } else {
          //   navigate('/', {
          //     state: { from: location.pathname },
          //   });
          // }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [navigate, location]);

  return null;
};

export default AxiosInterceptors;
