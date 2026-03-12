import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout/index.tsx'
import AuthLayout from '../layouts/AuthLayout/index.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'

// Pages
import DashboardOverview from '../pages/dashboard/index.tsx'
import ProjectsPage from '../pages/projects/index.tsx'
import ProjectDetailsPage from '../pages/projects/details.tsx'
import LoginPage from '../pages/auth/LoginPage.tsx'
import RegisterPage from '../pages/auth/RegisterPage.tsx'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.tsx'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.tsx'
import TasksPage from '../pages/tasks/index.tsx'
import TaskDetailsPage from '../pages/tasks/details.tsx'
import CRMPage from '../pages/crm/index.tsx'
import LeadDetailsPage from '../pages/crm/details.tsx'
import TeamPage from '../pages/team/index.tsx'
import MemberProfilePage from '../pages/team/details.tsx'
import ActivityFeedPage from '../pages/notifications/index.tsx'
import AnalyticsPage from '../pages/analytics/index.tsx'
import ErrorPage from '../pages/ErrorPage.tsx'

// Settings Pages
import SettingsLayout from '../pages/settings/Layout.tsx'
import ProfilePage from '../pages/settings/Profile.tsx'
import SecurityPage from '../pages/settings/Security.tsx'
import OrganizationPage from '../pages/settings/Organization.tsx'
import AppearancePage from '../pages/settings/Appearance.tsx'
import NotificationPage from '../pages/settings/Notifications.tsx'

// Placeholder components
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-8 text-center sm:text-left">
    <h1 className="text-2xl font-bold">{name} Page</h1>
    <p className="text-gray-500 mt-2">This module is under development.</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'activity', element: <Placeholder name="Activity" /> },
        ]
      }
    ],
  },
  {
    path: '/projects',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <ProjectsPage /> },
          { path: ':id', element: <ProjectDetailsPage /> },
        ]
      }
    ],
  },
  {
    path: '/tasks',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <TasksPage /> },
          { path: ':id', element: <TaskDetailsPage /> },
        ]
      }
    ],
  },
  {
    path: '/crm',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <CRMPage /> },
          { path: ':id', element: <LeadDetailsPage /> },
        ]
      }
    ],
  },
  {
    path: '/team',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <TeamPage /> },
          { path: ':id', element: <MemberProfilePage /> },
        ]
      }
    ],
  },
  {
    path: '/analytics',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AnalyticsPage /> },
          { path: 'projects', element: <AnalyticsPage /> },
          { path: 'tasks', element: <AnalyticsPage /> },
        ]
      }
    ],
  },
  {
    path: '/notifications',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <ActivityFeedPage /> }
        ]
      }
    ],
  },
  {
    path: '/settings',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <SettingsLayout />,
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'security', element: <SecurityPage /> },
              { path: 'organization', element: <OrganizationPage /> },
              { path: 'appearance', element: <AppearancePage /> },
              { path: 'notifications', element: <NotificationPage /> },
            ]
          }
        ]
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
])
