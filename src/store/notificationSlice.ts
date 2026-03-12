import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { notificationService } from '../services/notificationService'

export interface Notification {
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
  error: string | null
}

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async () => {
  return await notificationService.getNotifications();
});

export const markAsReadAsync = createAsyncThunk('notifications/markAsRead', async (id: string) => {
  await notificationService.markAsRead(id);
  return id;
});

export const markAllAsReadAsync = createAsyncThunk('notifications/markAllAsRead', async () => {
  await notificationService.markAllAsRead();
  return true;
});

export const deleteNotificationAsync = createAsyncThunk('notifications/delete', async (id: string) => {
  await notificationService.deleteNotification(id);
  return id;
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    optimisticMarkAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.items.find(n => n.id === action.payload)
      if (notif) {
        notif.isRead = true
      }
    },
    optimisticMarkAllAsRead: (state) => {
      state.items.forEach(n => n.isRead = true)
    },
    optimisticDeleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(n => n.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload as Notification[];
        state.loading = false;
      })
      .addCase(markAsReadAsync.fulfilled, (state, action) => {
        const notif = state.items.find(n => n.id === action.payload)
        if (notif) {
          notif.isRead = true
        }
      })
      .addCase(markAllAsReadAsync.fulfilled, (state) => {
        state.items.forEach(n => n.isRead = true)
      })
      .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n.id !== action.payload)
      });
  },
})

export const { 
  optimisticMarkAsRead, 
  optimisticMarkAllAsRead, 
  optimisticDeleteNotification 
} = notificationSlice.actions

export default notificationSlice.reducer
