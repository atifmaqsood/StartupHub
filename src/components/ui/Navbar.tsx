import { Search, Menu } from 'lucide-react'
import NotificationBell from '../../features/notifications/components/NotificationBell.tsx'

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
        <NotificationBell />
        <div className="h-8 w-px bg-gray-100" />
        <button className="hidden sm:block px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95">
          + New Project
        </button>
      </div>
    </header>
  )
}

export default Navbar
