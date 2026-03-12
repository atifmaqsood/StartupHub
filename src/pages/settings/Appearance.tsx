import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { 
  updateThemeMode, 
  updateThemeColors, 
  applyPreset 
} from '../../store/settingsSlice'
import ThemeSwitcher from '../../features/settings/components/ThemeSwitcher'
import ThemePaletteSelector from '../../features/settings/components/ThemePaletteSelector'
import ColorPickerInput from '../../features/settings/components/ColorPickerInput'
import { Palette, RefreshCw } from 'lucide-react'

const AppearancePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((state) => state.settings)

  return (
    <div className="p-8 space-y-10 animate-in slide-in-from-bottom-2 duration-500 bg-[var(--bg-card)]">
      {/* Theme Mode */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Theme Mode</h2>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Choose how StartupHub looks in your browser.</p>
          </div>
        </div>
        <ThemeSwitcher 
          mode={theme.mode} 
          onChange={(mode) => dispatch(updateThemeMode(mode))} 
        />
      </section>

      <div className="h-px bg-[var(--color-border)]/10" />

      {/* Theme Presets */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Theme Presets</h2>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Quickly switch between professionally designed color palettes.</p>
          </div>
          <button 
            onClick={() => dispatch(applyPreset('Startup Blue'))}
            className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Reset to Default
          </button>
        </div>
        <ThemePaletteSelector 
          currentPreset={theme.currentPreset} 
          onSelect={(preset) => dispatch(applyPreset(preset))}
        />
      </section>

      <div className="h-px bg-[var(--color-border)]/10" />

      {/* Custom Colors */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Custom Brand Colors</h2>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] uppercase">Expert</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Finely tune your interface colors for a unique brand experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Primary Accents</h3>
            <ColorPickerInput 
              label="Primary Color" 
              value={theme.colors.primary} 
              onChange={(color) => dispatch(updateThemeColors({ primary: color }))} 
            />
            <ColorPickerInput 
              label="Secondary Color" 
              value={theme.colors.secondary} 
              onChange={(color) => dispatch(updateThemeColors({ secondary: color }))} 
            />
            <ColorPickerInput 
              label="Accent Color" 
              value={theme.colors.accent} 
              onChange={(color) => dispatch(updateThemeColors({ accent: color }))} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Interface Base</h3>
            <ColorPickerInput 
              label="Background Main" 
              value={theme.colors.bgMain} 
              onChange={(color) => dispatch(updateThemeColors({ bgMain: color }))} 
            />
            <ColorPickerInput 
              label="Sidebar Color" 
              value={theme.colors.bgSidebar} 
              onChange={(color) => dispatch(updateThemeColors({ bgSidebar: color }))} 
            />
             <ColorPickerInput 
              label="Primary Text" 
              value={theme.colors.textPrimary} 
              onChange={(color) => dispatch(updateThemeColors({ textPrimary: color }))} 
            />
          </div>
        </div>
      </section>
      
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]/10">
        <p className="text-xs text-[var(--text-muted)] font-medium italic">
          Tip: Changes are saved automatically and applied instantly.
        </p>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95">
          <Palette className="h-4 w-4" />
          Export Theme Config
        </button>
      </div>
    </div>
  )
}

export default AppearancePage
