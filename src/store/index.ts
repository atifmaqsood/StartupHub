import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.ts'
import projectReducer from './projectSlice.ts'
import taskReducer from './taskSlice.ts'
import crmReducer from './crmSlice.ts'
import teamReducer from './teamSlice.ts'

const reducers = {
  auth: authReducer,
  projects: projectReducer,
  tasks: taskReducer,
  crm: crmReducer,
  team: teamReducer,
}

export const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
