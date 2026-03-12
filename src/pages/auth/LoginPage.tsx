import React from 'react'
import LoginForm from '../../features/auth/components/LoginForm'
import { useLocation } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const location = useLocation()
  const message = location.state?.message

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
        <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your dashboard</p>
      </div>
      
      {message && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg text-center">
          {message}
        </div>
      )}

      <LoginForm />
    </div>
  )
}

export default LoginPage
