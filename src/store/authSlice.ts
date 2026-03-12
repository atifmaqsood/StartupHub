import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: null | { id: string; name: string; email: string; role: string; avatar: string }
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setUser, logout, setLoading } = authSlice.actions
export default authSlice.reducer
