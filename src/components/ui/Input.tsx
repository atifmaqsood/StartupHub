import React, { forwardRef } from 'react'
import { cn } from '../../utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-bold text-[var(--text-primary)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0.5">
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-11 w-full rounded-xl border border-[var(--color-border)]/20 bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-primary)] ring-offset-[var(--bg-card)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm',
            error && 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs font-bold text-red-500 mt-1 ml-1">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
