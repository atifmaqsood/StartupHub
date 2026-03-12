import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="absolute inset-0 bg-[var(--color-primary)]/5 pointer-events-none" />
      <div className="max-w-md w-full space-y-10 bg-[var(--bg-card)] p-12 rounded-[2.5rem] shadow-2xl border border-[var(--color-border)]/10 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black mx-auto shadow-xl shadow-[var(--color-primary)]/30 rotate-3">
            S
          </div>
          <h2 className="mt-6 text-2xl font-black text-[var(--text-primary)] uppercase tracking-[0.2em] pt-4">StartupHub</h2>
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">Architect the future of your enterprise</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
