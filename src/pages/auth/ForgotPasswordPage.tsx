import React from 'react'
import ForgotPasswordForm from '../../features/auth/components/ForgotPasswordForm'

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Forgot password?</h1>
        <p className="text-sm text-gray-500 mt-1">No worries, we'll send you reset instructions</p>
      </div>

      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPasswordPage
