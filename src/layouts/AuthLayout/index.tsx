import React from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, CheckSquare } from 'lucide-react'

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      {/* Left side: Informational / Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--bg-sidebar)] flex-col justify-between p-12 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[var(--color-primary)]/30 rotate-3">
               S
             </div>
             <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Startup<span className="opacity-50">Hub</span></h1>
          </div>
        </div>

        <div className="relative z-10 space-y-8 max-w-lg">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Architect the future of your enterprise with precision.
          </h2>
          <p className="text-white/60 text-lg font-medium tracking-tight">
            Join thousands of teams utilizing StartupHub to streamline workflows, manage CRM, and accelerate project delivery entirely in one unified platform.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 cursor-default">
              <LayoutDashboard className="h-6 w-6 text-[var(--color-primary)]" />
              <span className="text-white font-bold text-sm">Unified Dashboard</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 cursor-default">
              <CheckSquare className="h-6 w-6 text-green-400" />
              <span className="text-white font-bold text-sm">Task Management</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 cursor-default">
              <Users className="h-6 w-6 text-purple-400" />
              <span className="text-white font-bold text-sm">Team Collaboration</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 cursor-default">
              <BarChart3 className="h-6 w-6 text-orange-400" />
              <span className="text-white font-bold text-sm">Advanced Analytics</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12">
           <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
               <img src="https://i.pravatar.cc/150?u=1" alt="User 1" className="w-10 h-10 rounded-full border-2 border-[var(--bg-sidebar)] object-cover" />
               <img src="https://i.pravatar.cc/150?u=2" alt="User 2" className="w-10 h-10 rounded-full border-2 border-[var(--bg-sidebar)] object-cover" />
               <img src="https://i.pravatar.cc/150?u=3" alt="User 3" className="w-10 h-10 rounded-full border-2 border-[var(--bg-sidebar)] object-cover" />
               <div className="w-10 h-10 rounded-full border-2 border-[var(--bg-sidebar)] bg-[var(--color-primary)] flex items-center justify-center text-[10px] text-white font-black">+2k</div>
             </div>
             <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Trusted by fast-growing startups.</p>
           </div>
        </div>
      </div>

      {/* Right side: Form / Outlet */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg-main)] p-6 sm:p-12 relative">
         <div className="absolute inset-0 bg-[var(--color-primary)]/5 pointer-events-none lg:hidden" />
         <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            {/* Mobile Hero View */}
            <div className="lg:hidden text-center mb-10 space-y-4">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black mx-auto shadow-xl shadow-[var(--color-primary)]/30 rotate-3">
                S
              </div>
              <h1 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-[0.2em] pt-2">Startup<span className="opacity-50">Hub</span></h1>
            </div>

            <div className="bg-[var(--bg-card)] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-[var(--color-border)]/10">
              <Outlet />
            </div>
         </div>
      </div>
    </div>
  )
}

export default AuthLayout
