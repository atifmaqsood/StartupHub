import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '../../../utils'

interface ThemeSwitcherProps {
  mode: 'light' | 'dark' | 'system'
  onChange: (mode: 'light' | 'dark' | 'system') => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ mode, onChange }) => {
  const options = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'System' },
  ] as const

  return (
    <div className="flex bg-[var(--bg-main)]/50 p-2 rounded-2xl border border-[var(--color-border)]/10 gap-2 shadow-inner max-w-md">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 py-3 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            mode === option.id 
              ? "bg-[var(--bg-card)] text-[var(--color-primary)] shadow-md border border-[var(--color-border)]/10 scale-[1.02]" 
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/30"
          )}
        >
          <option.icon className="h-4 w-4" />
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
