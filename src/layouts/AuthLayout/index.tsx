import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">StartupHub</h2>
          <p className="mt-2 text-sm text-gray-600">Secure access to your startup platform</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
