import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authService } from '../../../services/authService'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'

const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await authService.forgotPassword(data.email)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Check your email</h3>
        <p className="text-sm text-gray-600">
          We've sent a password reset link to your email address.
        </p>
        <Link to="/auth/login" virtual-href="/auth/login" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message as string}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send reset link
        </Button>
      </form>

      <div className="text-center">
        <Link to="/auth/login" virtual-href="/auth/login" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
