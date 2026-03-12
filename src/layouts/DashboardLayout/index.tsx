import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/ui/Sidebar.tsx'
import Navbar from '../../components/ui/Navbar.tsx'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import type { RootState } from '../../store'
import { closeSidebar } from '../../store/uiSlice'

const DashboardLayout: React.FC = () => {
  const { isSidebarOpen } = useAppSelector((state: RootState) => state.ui)
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in duration-300" 
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
