import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux.ts'
import type { RootState } from '../store/index.ts'
import { setUser } from '../store/authSlice.ts'
import { authService } from '../services/authService.ts'
import { Loader2 } from 'lucide-react'

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        try {
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            dispatch(setUser(currentUser as any))
          }
        } catch (err) {
          console.error('Auth initialization failed', err)
        }
      }
      setIsInitializing(false)
    }

    initAuth()
  }, [dispatch, isAuthenticated])

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
