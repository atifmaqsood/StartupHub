import React from 'react'
import { Search, Bell, Menu } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-gray-500">
          <Menu className="w-6 h-6" />
        </button>
        <div className="max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Search projects, tasks, leads..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-8 w-px bg-gray-200" />
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
          + New Project
        </button>
      </div>
    </header>
  )
}

export default Navbar
