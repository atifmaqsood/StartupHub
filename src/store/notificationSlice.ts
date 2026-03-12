import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  type: 'project' | 'task' | 'crm' | 'team'
  message: string
  entityId: string
  entityType: string
  userId: string
  userName: string
  userAvatar?: string
  timestamp: string
  isRead: boolean
}

interface NotificationState {
  items: Notification[]
  loading: boolean
}

const initialState: NotificationState = {
  items: [],
  loading: false,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload)
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.items.find(n => n.id === action.payload)
      if (notif) {
        notif.isRead = true
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => n.isRead = true)
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(n => n.id !== action.payload)
    },
  },
})

export const { 
  setNotifications, 
  setLoading, 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification 
} = notificationSlice.actions

export default notificationSlice.reducer
