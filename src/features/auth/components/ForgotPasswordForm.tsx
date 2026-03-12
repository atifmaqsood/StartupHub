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
      <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center border-4 border-green-500/20 shadow-lg shadow-green-500/20">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Check your email</h3>
          <p className="text-sm font-bold text-[var(--text-secondary)]">
            We've sent a password reset link to your email address.
          </p>
        </div>
        <Link to="/auth/login" virtual-href="/auth/login" className="inline-flex items-center justify-center w-full rounded-2xl h-12 text-[11px] font-black uppercase tracking-[0.2em] bg-[var(--bg-main)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] border border-[var(--color-border)]/20 transition-all mt-6 shadow-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          className="rounded-2xl border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 focus-visible:bg-[var(--bg-card)] text-sm font-bold"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message as string}
        />

        <Button
          type="submit"
          className="w-full rounded-2xl h-12 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send reset link
        </Button>
      </form>

      <div className="text-center">
        <Link to="/auth/login" virtual-href="/auth/login" className="inline-flex items-center text-sm font-black text-[var(--color-primary)] hover:opacity-80 transition-opacity">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
