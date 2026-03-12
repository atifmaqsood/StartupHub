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
import ErrorPage from '../pages/ErrorPage.tsx'

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
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Placeholder name="Team Overview" /> },
          { path: 'invite', element: <Placeholder name="Invite Member" /> },
        ]
      }
    ],
  },
  {
    path: '/analytics',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Placeholder name="General Analytics" /> },
          { path: 'projects', element: <Placeholder name="Project Analytics" /> },
          { path: 'tasks', element: <Placeholder name="Task Analytics" /> },
        ]
      }
    ],
  },
  {
    path: '/notifications',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Placeholder name="Notifications" /> }
        ]
      }
    ],
  },
  {
    path: '/settings',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Placeholder name="Settings" /> },
          { path: 'profile', element: <Placeholder name="Profile Settings" /> },
          { path: 'appearance', element: <Placeholder name="Appearance" /> },
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
