import React from 'react'
import RegisterForm from '../../features/auth/components/RegisterForm'

const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create an account</h1>
        <p className="text-sm text-gray-500 mt-1">Start managing your startup today</p>
      </div>

      <RegisterForm />
    </div>
  )
}

export default RegisterPage
