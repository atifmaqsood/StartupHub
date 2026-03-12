import { Menu } from 'lucide-react'
import NotificationBell from '../../features/notifications/components/NotificationBell.tsx'
import GlobalSearch from '../../features/search/components/GlobalSearch'

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-gray-500">
          <Menu className="w-6 h-6" />
        </button>
        <GlobalSearch />
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
