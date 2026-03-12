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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-4 text-xs font-black text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl text-center uppercase tracking-widest shadow-sm">
            {error}
          </div>
        )}
        
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message as string}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold tracking-widest"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message as string}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded-md border text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-[var(--bg-card)] border-[var(--color-border)]/20 bg-[var(--bg-card)]"
            />
            <label htmlFor="remember-me" className="text-sm font-bold text-[var(--text-secondary)]">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/auth/forgot-password" virtual-href="/auth/forgot-password" className="font-black text-[var(--color-primary)] hover:opacity-80 transition-opacity">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-2xl h-12 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in to Workspace
        </Button>
      </form>

      <div className="text-center text-sm font-bold text-[var(--text-secondary)]">
        Don't have an account?{' '}
        <Link to="/auth/register" virtual-href="/auth/register" className="font-black text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors">
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
