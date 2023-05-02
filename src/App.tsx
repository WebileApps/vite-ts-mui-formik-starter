import { LinearProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { AppThemeContextProvider } from './AppTheme';
import DashboardLayout from './components/layouts/dashboard.layout';
// import RequireAuth from './components/require-auth/require-auth';

const Dashboard = lazy(() => import('./components/dashboard/dashboard.component'));
const LoginRouter = lazy(() => import('./components/login/router'));

function App() {
  return (
    <>
      <AppThemeContextProvider>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <AppRoutes />
        </SnackbarProvider>
      </AppThemeContextProvider>
    </>
  );
}

const routes = (isLoggedIn: boolean) => [
  {
    path: '/login/*',
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <LoginRouter />,
  },
  {
    element: <Outlet />, // Replace with <RequireAuth /> to require authentication
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          {
            path: 'dashboard/*',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

function AppRoutes() {
  const isLoggedIn = Boolean(sessionStorage.getItem('token'));
  const routing = useRoutes(routes(isLoggedIn));
  return <Suspense fallback={<LinearProgress />}>{routing}</Suspense>;
}

export default App;
