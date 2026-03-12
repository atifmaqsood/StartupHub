import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { fetchProjects, createProject, updateProjectAsync, deleteProjectAsync, optimisticUpdateProject } from '../../store/projectSlice.ts'
import { DataTable } from '../../components/tables/DataTable.tsx'
import Button from '../../components/ui/Button.tsx'
import Badge from '../../components/ui/Badge.tsx'
import ProjectModal from '../../features/projects/components/ProjectModal.tsx'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2
} from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: projects, loading } = useAppSelector((state) => state.projects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleOpenCreate = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project: any) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleProjectSubmit = async (data: any) => {
    if (editingProject) {
      dispatch(optimisticUpdateProject({ id: editingProject.id, updates: data }))
      await dispatch(updateProjectAsync({ id: editingProject.id, data }))
    } else {
      await dispatch(createProject(data))
    }
    setIsModalOpen(false)
  }

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project? All associated tasks will also be removed.')) {
      dispatch(deleteProjectAsync(id))
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success'
      case 'in progress': return 'warning'
      case 'todo': return 'neutral'
      default: return 'neutral'
    }
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Project Name',
      cell: ({ row }) => (
        <div className="font-semibold text-[var(--text-primary)]">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.original.status)}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'deadline',
      header: 'Deadline',
      cell: ({ row }) => (
        <div className="text-[var(--text-secondary)] text-xs">{row.original.dueDate || row.original.deadline}</div>
      ),
    },
    {
      accessorKey: 'progression',
      header: 'Progress',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${row.original.progression}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[var(--text-secondary)] w-8">{row.original.progression}%</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/projects/${row.original.id}`} virtual-href={`/projects/${row.original.id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleOpenEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
            onClick={() => handleDeleteProject(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage and track all your startup initiatives in one place.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {loading && projects.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable data={projects} columns={columns} searchKey="name" />
      )}

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleProjectSubmit}
        project={editingProject}
      />
    </div>
  )
}

export default ProjectsPage
