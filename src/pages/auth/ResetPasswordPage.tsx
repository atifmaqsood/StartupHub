import React from 'react'
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Set new password</h2>
        <p className="text-sm font-bold text-[var(--text-muted)]">Please enter your new password below</p>
      </div>

      <ResetPasswordForm />
    </div>
  )
}

export default ResetPasswordPage
