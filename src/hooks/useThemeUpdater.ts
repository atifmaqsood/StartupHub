import { useEffect } from 'react'
import { useAppSelector } from './redux'

export const useThemeUpdater = () => {
  const { theme } = useAppSelector((state) => state.settings)

  useEffect(() => {
    const root = document.documentElement
    const { colors, mode } = theme

    // Set Theme Mode (Light/Dark)
    if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Set CSS Variables for Colors
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    
    root.style.setProperty('--text-primary', colors.textPrimary)
    root.style.setProperty('--text-secondary', colors.textSecondary)
    root.style.setProperty('--text-muted', colors.textMuted)
    
    root.style.setProperty('--bg-main', colors.bgMain)
    root.style.setProperty('--bg-card', colors.bgCard)
    root.style.setProperty('--bg-sidebar', colors.bgSidebar)

    // Optional: Dynamic transition for smoothness
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
  }, [theme])
}
