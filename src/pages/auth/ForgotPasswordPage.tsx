import React from 'react'
import ForgotPasswordForm from '../../features/auth/components/ForgotPasswordForm'

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Password Recovery</h2>
        <p className="text-sm font-bold text-[var(--text-muted)]">We'll send you secure reset instructions</p>
      </div>

      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPasswordPage
