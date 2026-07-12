import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from './shared/layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { EnvironmentDashboard } from './modules/environment/pages/EnvironmentDashboard';
import { SocialDashboard } from './modules/social/pages/SocialDashboard';
import { GovernanceDashboard } from './modules/governance/pages/GovernanceDashboard';
import { ReportsDashboard } from './modules/reports/pages/ReportsDashboard';
import { GamificationDashboard } from './modules/gamification/pages/GamificationDashboard';
import { SettingsDashboard } from './modules/settings/pages/SettingsDashboard';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { NotFound } from './pages/NotFound';
import { Forbidden } from './pages/Forbidden';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: (
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'environment/*',
        element: <EnvironmentDashboard />,
      },
      {
        path: 'social/*',
        element: <SocialDashboard />,
      },
      {
        path: 'governance/*',
        element: <GovernanceDashboard />,
      },
      {
        path: 'gamification/*',
        element: <GamificationDashboard />,
      },
      {
        path: 'reports/*',
        element: <ReportsDashboard />,
      },
      {
        path: 'settings/*',
        element: <SettingsDashboard />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
