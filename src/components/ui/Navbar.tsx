import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NotificationBell from '../../features/notifications/components/NotificationBell.tsx'
import GlobalSearch from '../../features/search/components/GlobalSearch'
import { useAppDispatch } from '../../hooks/redux'
import { toggleSidebar } from '../../store/uiSlice'
import ProjectModal from '../../features/projects/components/ProjectModal'
import { createProject } from '../../store/projectSlice'

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const handleProjectSubmit = async (data: any) => {
    await dispatch(createProject(data))
    setIsProjectModalOpen(false)
    navigate('/projects')
  }

  return (
    <>
      <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--color-border)]/10 flex items-center justify-between px-6 z-10 transition-colors duration-300">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <GlobalSearch />
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <div className="h-8 w-px bg-[var(--color-border)]/20" />
          <button 
            onClick={() => setIsProjectModalOpen(true)}
            className="hidden sm:block px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            + New Project
          </button>
        </div>
      </header>

      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onSubmit={handleProjectSubmit}
      />
    </>
  )
}

export default Navbar
