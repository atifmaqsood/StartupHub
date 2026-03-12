import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setUser } from './authSlice'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  bgMain: string
  bgCard: string
  bgSidebar: string
}

export interface SettingsState {
  profile: {
    avatar: string
    name: string
    email: string
    title: string
    bio: string
  }
  organization: {
    name: string
    logo: string
    website: string
    description: string
  }
  theme: {
    mode: 'light' | 'dark' | 'system'
    colors: ThemeColors
    currentPreset: string
  }
  notifications: {
    projectUpdates: boolean
    taskUpdates: boolean
    leadUpdates: boolean
    teamInvitations: boolean
    mentions: boolean
  }
}

const SETTINGS_KEY = 'startuphub_settings'

export const THEME_PRESETS: Record<string, ThemeColors> = {
  'Startup Blue': {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    bgMain: '#f8fafc',
    bgCard: '#ffffff',
    bgSidebar: '#0f172a',
  },
  'Dark Modern': {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    accent: '#a78bfa',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    bgMain: '#0f172a',
    bgCard: '#1e293b',
    bgSidebar: '#020617',
  },
  'Modern Purple': {
    primary: '#8b5cf6',
    secondary: '#64748b',
    accent: '#ec4899',
    textPrimary: '#1e1b4b',
    textSecondary: '#4338ca',
    textMuted: '#818cf8',
    bgMain: '#f5f3ff',
    bgCard: '#ffffff',
    bgSidebar: '#1e1b4b',
  },
  'Emerald Green': {
    primary: '#10b981',
    secondary: '#4b5563',
    accent: '#3b82f6',
    textPrimary: '#064e3b',
    textSecondary: '#065f46',
    textMuted: '#6ee7b7',
    bgMain: '#ecfdf5',
    bgCard: '#ffffff',
    bgSidebar: '#064e3b',
  },
  'Sunset Orange': {
    primary: '#f97316',
    secondary: '#4b5563',
    accent: '#ef4444',
    textPrimary: '#431407',
    textSecondary: '#7c2d12',
    textMuted: '#fdba74',
    bgMain: '#fff7ed',
    bgCard: '#ffffff',
    bgSidebar: '#431407',
  }
}

const getInitialState = (): SettingsState => {
  const saved = localStorage.getItem(SETTINGS_KEY)
  if (saved) return JSON.parse(saved)

  return {
    profile: {
      avatar: 'https://i.pravatar.cc/150?u=alex',
      name: 'Alex Riviera',
      email: 'alex@startuphub.com',
      title: 'Founder & CEO',
      bio: 'Serial entrepreneur and product design enthusiast.',
    },
    organization: {
      name: 'StartupHub HQ',
      logo: '',
      website: 'https://startuphub.io',
      description: 'The all-in-one platform for rapid startup scaling.',
    },
    theme: {
      mode: 'light',
      colors: THEME_PRESETS['Startup Blue'],
      currentPreset: 'Startup Blue'
    },
    notifications: {
      projectUpdates: true,
      taskUpdates: true,
      leadUpdates: true,
      teamInvitations: true,
      mentions: true,
    }
  }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<SettingsState['profile']>>) => {
      state.profile = { ...state.profile, ...action.payload }
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
    updateOrganization: (state, action: PayloadAction<Partial<SettingsState['organization']>>) => {
      state.organization = { ...state.organization, ...action.payload }
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
    updateThemeMode: (state, action: PayloadAction<SettingsState['theme']['mode']>) => {
      state.theme.mode = action.payload
      
      // Auto-toggle palette if they are on basic presets and switch mode
      if (action.payload === 'dark' && state.theme.currentPreset === 'Startup Blue') {
        state.theme.colors = THEME_PRESETS['Dark Modern']
        state.theme.currentPreset = 'Dark Modern'
      } else if (action.payload === 'light' && state.theme.currentPreset === 'Dark Modern') {
        state.theme.colors = THEME_PRESETS['Startup Blue']
        state.theme.currentPreset = 'Startup Blue'
      }
      
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
    updateThemeColors: (state, action: PayloadAction<Partial<ThemeColors>>) => {
      state.theme.colors = { ...state.theme.colors, ...action.payload }
      state.theme.currentPreset = 'Custom'
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
    applyPreset: (state, action: PayloadAction<string>) => {
      if (THEME_PRESETS[action.payload]) {
        state.theme.colors = THEME_PRESETS[action.payload]
        state.theme.currentPreset = action.payload
        // Update mode based on preset style if needed
        if (action.payload === 'Dark Modern') state.theme.mode = 'dark'
        else if (action.payload === 'Startup Blue') state.theme.mode = 'light'
      }
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload }
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      if (action.payload) {
        state.profile = {
          ...state.profile,
          name: action.payload.name || state.profile.name,
          email: action.payload.email || state.profile.email,
          avatar: action.payload.avatar || state.profile.avatar,
        }
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
      }
    })
  }
})

export const { 
  updateProfile, 
  updateOrganization, 
  updateThemeMode, 
  updateThemeColors, 
  applyPreset, 
  updateNotifications 
} = settingsSlice.actions

export default settingsSlice.reducer
