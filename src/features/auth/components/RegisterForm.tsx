import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../../services/authService'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { Loader2 } from 'lucide-react'

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const password = watch('password')

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      await authService.register({ name: data.name, email: data.email })
      navigate('/auth/login', { state: { message: 'Registration successful! Please login.' } })
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-4 text-xs font-black text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl text-center uppercase tracking-widest shadow-sm">
            {error}
          </div>
        )}
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message as string}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message as string}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold tracking-widest"
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          })}
          error={errors.password?.message as string}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold tracking-widest"
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message as string}
        />

        <Button
          type="submit"
          className="w-full rounded-2xl h-12 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Genesis Account
        </Button>
      </form>

      <div className="text-center text-sm font-bold text-[var(--text-secondary)]">
        Already have an account?{' '}
        <Link to="/auth/login" virtual-href="/auth/login" className="font-black text-[var(--color-primary)] hover:opacity-80 transition-opacity">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm
