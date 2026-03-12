import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import AuthLayout from '../layouts/AuthLayout'
import DashboardOverview from '../pages/dashboard'

// Placeholder components
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{name} Page</h1>
    <p className="text-gray-500 mt-2">This module is under development.</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'activity', element: <Placeholder name="Activity" /> },
    ],
  },
  {
    path: '/projects',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="Projects List" /> },
      { path: 'create', element: <Placeholder name="Create Project" /> },
      { path: ':id', element: <Placeholder name="Project Details" /> },
      { path: ':id/edit', element: <Placeholder name="Edit Project" /> },
    ],
  },
  {
    path: '/tasks',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="Tasks List" /> },
      { path: 'create', element: <Placeholder name="Create Task" /> },
    ],
  },
  {
    path: '/crm',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="CRM Pipeline" /> },
      { path: 'create', element: <Placeholder name="Create Lead" /> },
    ],
  },
  {
    path: '/team',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="Team Overview" /> },
      { path: 'invite', element: <Placeholder name="Invite Member" /> },
    ],
  },
  {
    path: '/analytics',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="General Analytics" /> },
      { path: 'projects', element: <Placeholder name="Project Analytics" /> },
      { path: 'tasks', element: <Placeholder name="Task Analytics" /> },
    ],
  },
  {
    path: '/notifications',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="Notifications" /> }
    ],
  },
  {
    path: '/settings',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Placeholder name="Settings" /> },
      { path: 'profile', element: <Placeholder name="Profile Settings" /> },
      { path: 'appearance', element: <Placeholder name="Appearance" /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Placeholder name="Login" /> },
      { path: 'register', element: <Placeholder name="Register" /> },
      { path: 'forgot-password', element: <Placeholder name="Forgot Password" /> },
    ],
  },
])
