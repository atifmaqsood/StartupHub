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
      <p className="text-sm text-gray-600 text-center">
        Create a new password for your account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
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
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message as string}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset password
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
