import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Root from '@src/Root';
import AuthLayout from '@src/layouts/AuthLayout';
import { Component as Login } from '@src/pages/login/Component';
import ErrorComp from '@src/components/utils/ErrorComp';

const AuthRouter: Array<RouteObject> = [
  {
    element: <Root />,
    errorElement: <ErrorComp />,
    children: [
      {
        element: <AuthLayout />,
        // errorElement: <ErrorComp />,
        children: [
          {
            path: '/',
            element: <Login />,
          },
          {
            path: '/register',
            lazy: () => import('@src/pages/register/Component'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default AuthRouter;
