import React from 'react'
import LoginForm from '../../features/auth/components/LoginForm'
import { useLocation } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const location = useLocation()
  const message = location.state?.message

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Welcome back</h2>
        <p className="text-sm font-bold text-[var(--text-muted)]">Enter your credentials to access your workspace</p>
      </div>
      
      {message && (
        <div className="p-4 text-xs font-black text-green-600 bg-green-500/10 border border-green-500/20 rounded-2xl text-center uppercase tracking-widest shadow-sm">
          {message}
        </div>
      )}

      <LoginForm />
    </div>
  )
}

export default LoginPage
