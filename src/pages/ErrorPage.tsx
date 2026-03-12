import React from 'react'
import { useRouteError, Link } from 'react-router-dom'
import Button from '../components/ui/Button.tsx'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

const ErrorPage: React.FC = () => {
  const error = useRouteError() as any
  console.error(error)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
          <p className="text-gray-500">
            {error?.statusText || error?.message || "An unexpected error occurred while rendering this page."}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Link to="/" virtual-href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-50">
          <p className="text-xs text-gray-400 font-medium">
            Error ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
