import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { User, Shield, Building2, Palette, Bell } from 'lucide-react'
import { cn } from '../../utils'

const SettingsLayout: React.FC = () => {
  const menuItems = [
    { name: 'Profile', path: '/settings/profile', icon: User },
    { name: 'Security', path: '/settings/security', icon: Shield },
    { name: 'Organization', path: '/settings/organization', icon: Building2 },
    { name: 'Appearance', path: '/settings/appearance', icon: Palette },
    { name: 'Notifications', path: '/settings/notifications', icon: Bell },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Settings</h1>
        <p className="text-[var(--text-secondary)] font-medium">Manage your account preferences and system configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-1.5 p-2 bg-[var(--bg-main)] rounded-2xl border border-[var(--color-border)]/10">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                isActive 
                  ? "bg-[var(--bg-card)] text-[var(--color-primary)] shadow-sm border border-[var(--color-border)]/10" 
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full bg-[var(--bg-card)] rounded-2xl border border-[var(--color-border)]/10 shadow-sm overflow-hidden min-h-[500px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout
