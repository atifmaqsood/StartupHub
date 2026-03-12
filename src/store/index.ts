import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import projectReducer from './projectSlice'
import taskReducer from './taskSlice'
import crmReducer from './crmSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    crm: crmReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
