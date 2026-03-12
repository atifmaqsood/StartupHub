import React from 'react'
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Set new password</h1>
        <p className="text-sm text-gray-500 mt-1">Please enter your new password below</p>
      </div>

      <ResetPasswordForm />
    </div>
  )
}

export default ResetPasswordPage
