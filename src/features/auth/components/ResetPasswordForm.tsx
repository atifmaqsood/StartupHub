import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../../services/authService'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { Loader2 } from 'lucide-react'

const ResetPasswordForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const password = watch('password')

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await authService.resetPassword()
      navigate('/auth/login', { state: { message: 'Password reset successful! Please login with your new password.' } })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="New Password"
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
          label="Confirm New Password"
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
          className="w-full rounded-2xl h-12 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
