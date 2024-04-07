import type { LoaderFunctionArgs, RouteObject } from 'react-router-dom';
import Root from '@src/Root';
import DefaultLayout from '@layouts/DefaultLayout';
import ErrorComp from '@components/utils/ErrorComp';
import { queryClient } from '@utils/queryClient';

const DefaultRouter: Array<RouteObject> = [
  {
    element: <Root />,
    errorElement: <ErrorComp />,
    children: [
      {
        element: <DefaultLayout />,
        // errorElement: <ErrorComp />,
        children: [
          {
            path: '/',
            lazy: () => import('@pages/dashboard/Component'),
          },
          {
            path: '/trades',
            lazy: () => import('@pages/trades/Component'),
          },
          {
            path: '/leaderboard',
            lazy: () => import('@pages/leaderboard/Component'),
          },
          {
            path: '/contestants',
            lazy: () => import('@pages/contestants/Component'),
          },
          {
            path: '/comparison',
            lazy: () => import('@pages/comparison/Component'),
          },
          {
            path: '/market-calendar',
            lazy: () => import('@pages/market-calendar/Component'),
          },
          {
            path: '/settings',
            lazy: () => import('@pages/settings/Component'),
          },
          {
            path: '/profile',
            lazy: () => import('@pages/profile/Component'),
          },
          {
            path: 'posts',
            async loader() {
              const { loader } = await import('@pages/posts/loader');
              return loader(queryClient)();
            },
            lazy: () => import('@pages/posts/Component'),
            // personalized ErrorBoundary can be exported from the Component or any other file
          },
          {
            path: 'posts/:id',
            async loader({ params }) {
              const { loader } = await import('@pages/posts/post/loader');
              return loader(queryClient)({ params } as LoaderFunctionArgs);
            },
            lazy: () => import('@pages/posts/post/Component'),
            // personalized ErrorBoundary can be exported from the Component or any other file
          },
        ],
      },
    ],
  },
  {
    path: '*',
    lazy: () => import('@pages/not-found/Component'),
  },
];

export default DefaultRouter;
