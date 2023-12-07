import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Anonymous/LoginPage.tsx';
import ErrorPage from '../pages/errorPage.tsx';
import CreatePage, {
  action as createAction,
} from '../pages/private/CreatePage.tsx';
import EditPage from '../pages/private/EditPage.tsx';
import CrystalPage from '../pages/public/CrystalPage.tsx';
import { crystalLoader } from '../pages/public/crystalLoader.tsx';
import Root, { loader as RootLoader } from '../pages/components/root.tsx';

import { RouteObject } from 'react-router-dom';
import { useAuth } from '../DB/AuthProvider.tsx';
import HomePage from '../pages/Anonymous/HomePage.tsx';
import { DeleteAction } from '../pages/private/DeleteAction.tsx';
import UserHomePage from '../pages/public/UserHomePage.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

const Router = () => {
  const { isAuthenticated } = useAuth();
  const routesForPublic: RouteObject[] = [
    {
      path: 'crystal/:crystalId',
      element: <CrystalPage />,
      loader: crystalLoader,
      errorElement: <ErrorPage />,
    },
  ];

  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <UserHomePage />,
        },
        { path: 'new', element: <CreatePage />, action: createAction },

        {
          path: 'crystal/:crystalId/edit',
          element: <EditPage />,
          loader: crystalLoader,
        },
        {
          path: 'crystal/:crystalId/delete',
          action: DeleteAction,
          element: <div>Deleting</div>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
  ];

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: RootLoader,
        children: [
          ...routesForPublic,
          ...(!isAuthenticated ? routesForNotAuthenticatedOnly : []),
          ...routesForAuthenticatedOnly,
        ],
      },
    ],
    { basename: '/CrystalTracker/' }
  );

  return <RouterProvider router={router} />;
};

export default Router;
