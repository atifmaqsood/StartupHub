import React from 'react'
import RegisterForm from '../../features/auth/components/RegisterForm'

const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Create your account</h2>
        <p className="text-sm font-bold text-[var(--text-muted)]">Start managing your startup today entirely for free</p>
      </div>

      <RegisterForm />
    </div>
  )
}

export default RegisterPage
