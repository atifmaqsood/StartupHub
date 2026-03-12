import React from 'react'
import { Shield, Key, Eye, EyeOff } from 'lucide-react'

const SecurityPage: React.FC = () => {
  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)

  return (
    <div className="p-8 space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-6 pb-10 border-b border-[var(--color-border)]/5">
        <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/10 shadow-sm shadow-orange-500/5">
          <Shield className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Security Credentials</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-70">Keep your account secure by rotating your password regularly.</p>
        </div>
      </div>

      <div className="max-w-md space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Current Password</label>
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••••••"
              className="w-full pl-12 pr-12 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--text-muted)]"
            />
            <button 
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors"
            >
              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="h-px bg-[var(--color-border)]/5" />

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">New Password</label>
          <div className="relative">
            <input 
              type={showNew ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="w-full px-5 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Confirm New Password</label>
          <div className="relative">
            <input 
              type={showNew ? "text" : "password"}
              placeholder="Repeat new password"
              className="w-full px-5 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--text-muted)]"
            />
            <button 
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors"
            >
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/5 p-5 rounded-2xl border border-blue-500/10 flex gap-4 transition-colors">
        <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mt-0.5 font-black text-[10px] shadow-sm">
          i
        </div>
        <p className="text-xs text-[var(--text-secondary)] font-bold italic leading-relaxed">
          Strong passwords contain a mix of uppercase letters, numbers, and special characters. Aim for maximum entropy.
        </p>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-[var(--color-border)]/5">
        <button className="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] transition-all">Discard</button>
        <button className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:translate-y-[-1px] transition-all active:scale-95 h-12 leading-none">
          Rotate Security Key
        </button>
      </div>
    </div>
  )
}

export default SecurityPage
