import React from 'react'
import { THEME_PRESETS } from '../../../store/settingsSlice'
import { Check } from 'lucide-react'
import { cn } from '../../../utils'

interface ThemePaletteSelectorProps {
  currentPreset: string
  onSelect: (presetName: string) => void
}

const ThemePaletteSelector: React.FC<ThemePaletteSelectorProps> = ({ currentPreset, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Object.entries(THEME_PRESETS).map(([name, colors]) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={cn(
            "group relative flex flex-col items-start gap-4 p-5 rounded-3xl border-2 transition-all text-left overflow-hidden",
            currentPreset === name 
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md" 
              : "border-transparent bg-[var(--bg-main)]/50 hover:bg-[var(--bg-card)] hover:border-[var(--color-border)]/20"
          )}
        >
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-xl shadow-lg ring-2 ring-[var(--bg-card)]" style={{ backgroundColor: colors.primary }} />
            <div className="h-8 w-8 rounded-xl shadow-lg -ml-4 ring-2 ring-[var(--bg-card)]" style={{ backgroundColor: colors.accent }} />
            <div className="h-8 w-8 rounded-xl shadow-lg -ml-4 ring-2 ring-[var(--bg-card)]" style={{ backgroundColor: colors.bgSidebar }} />
          </div>
          
          <div className="space-y-1.5 w-full">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest leading-none block transition-colors",
              currentPreset === name ? "text-[var(--color-primary)]" : "text-[var(--text-primary)]"
            )}>
              {name}
            </span>
            <div className="flex gap-1.5 w-full">
               <div className="h-1.5 flex-1 rounded-full bg-[var(--color-border)]/10 overflow-hidden shadow-inner">
                 <div className="h-full rounded-full" style={{ backgroundColor: colors.primary, width: '70%' }} />
               </div>
            </div>
          </div>

          {currentPreset === name && (
            <div className="absolute top-4 right-4 h-6 w-6 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center animate-in zoom-in shadow-lg shadow-[var(--color-primary)]/30">
              <Check className="h-3.5 w-3.5" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

export default ThemePaletteSelector
