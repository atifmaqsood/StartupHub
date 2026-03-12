import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import type { RootState } from '../../store/index.ts'
import { logout } from '../../store/authSlice.ts'
import { authService } from '../../services/authService.ts'
import { cn } from '../../utils'
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Bell, 
  Settings, 
  CircleDollarSign,
  LogOut,
  X
} from 'lucide-react'
import { closeSidebar } from '../../store/uiSlice'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: CircleDollarSign, label: 'CRM', path: '/crm' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { isSidebarOpen } = useAppSelector((state: RootState) => state.ui)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/auth/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      dispatch(closeSidebar())
    }
  }

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-[60] w-72 bg-[var(--bg-sidebar)] border-r border-white/5 h-full flex flex-col transition-all duration-500 shadow-2xl lg:relative lg:translate-x-0",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Decorative gradient overlay for sidebar depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="p-8 border-b border-white/5 relative flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-[var(--color-primary)]/20 rotate-3 group-hover:rotate-0 transition-transform">
            S
          </div>
          <span className="text-white brightness-125 drop-shadow-md uppercase tracking-[0.1em]">Startup<span className="opacity-50">Hub</span></span>
        </h1>
        <button 
          onClick={() => dispatch(closeSidebar())}
          className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar relative">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? 'bg-white/10 text-white font-black shadow-xl ring-1 ring-white/10 translate-x-1 active-nav' 
                  : 'text-white/40 hover:bg-white/[0.03] hover:text-white hover:translate-x-1'
              )
            }
          >
            {/* Active indicator bar */}
            <div className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[var(--color-primary)] rounded-r-full transition-all duration-500",
              "opacity-0 scale-y-0",
              "group-[.active]:opacity-100 group-[.active]:scale-y-100"
            )} />
            
            <item.icon className={cn("w-5 h-5 transition-all duration-300", "group-hover:scale-110")} />
            <span className="text-[13px] font-bold uppercase tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4 relative bg-black/10">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-[var(--color-primary)]/10 ring-2 ring-white/10">
            {user?.avatar ? (
               <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              user?.name?.charAt(0) || 'U'
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black text-white truncate tracking-tight">{user?.name || 'User'}</p>
            <p className="text-[10px] text-white/30 truncate font-black uppercase tracking-widest">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all border border-red-500/10 active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Sync Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
