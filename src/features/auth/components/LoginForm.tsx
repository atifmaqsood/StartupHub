import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser, setLoading } from '../../../store/authSlice'
import { authService } from '../../../services/authService'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { Loader2 } from 'lucide-react'

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    dispatch(setLoading(true))
    
    try {
      const user = await authService.login(data.email)
      dispatch(setUser(user as any))
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message as string}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message as string}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/auth/forgot-password" virtual-href="/auth/forgot-password" className="font-medium text-primary hover:text-primary-dark">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/auth/register" virtual-href="/auth/register" className="font-medium text-primary hover:text-primary-dark">
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
