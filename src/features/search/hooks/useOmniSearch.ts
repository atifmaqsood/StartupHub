import { useMemo } from 'react'
import { useAppSelector } from '../../../hooks/redux'

export interface SearchResult {
  id: string
  type: 'project' | 'task' | 'lead' | 'member' | 'notification'
  title: string
  subtitle?: string
  status?: string
  url: string
}

export const useOmniSearch = (query: string) => {
  const { items: projects } = useAppSelector((state: any) => state.projects)
  const { items: tasks } = useAppSelector((state: any) => state.tasks)
  const { leads } = useAppSelector((state: any) => state.crm)
  const { members } = useAppSelector((state: any) => state.team)
  const { items: notifications } = useAppSelector((state: any) => state.notifications)

  return useMemo(() => {
    if (!query || query.length < 2) return {}

    const q = query.toLowerCase()

    const results: Record<string, SearchResult[]> = {
      projects: projects
        .filter((p: any) => p.name.toLowerCase().includes(q))
        .map((p: any) => ({
          id: p.id,
          type: 'project',
          title: p.name,
          subtitle: `Priority: ${p.priority}`,
          status: p.status,
          url: `/projects/${p.id}`
        })),
      tasks: tasks
        .filter((t: any) => t.title.toLowerCase().includes(q))
        .map((t: any) => ({
          id: t.id,
          type: 'task',
          title: t.title,
          subtitle: `Project: ${t.projectName}`,
          status: t.status,
          url: `/tasks`
        })),
      leads: leads
        .filter((l: any) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q))
        .map((l: any) => ({
          id: l.id,
          type: 'lead',
          title: l.name,
          subtitle: l.company,
          status: l.status,
          url: `/crm`
        })),
      members: members
        .filter((m: any) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
        .map((m: any) => ({
          id: m.id,
          type: 'member',
          title: m.name,
          subtitle: m.role,
          status: m.status,
          url: `/team/${m.id}`
        })),
      notifications: notifications
        .filter((n: any) => n.message.toLowerCase().includes(q))
        .map((n: any) => ({
          id: n.id,
          type: 'notification',
          title: n.message,
          subtitle: n.userName,
          url: `/notifications`
        }))
    }

    // Filter out group keys with empty arrays
    return Object.fromEntries(
      Object.entries(results).filter(([_, list]) => list.length > 0)
    )
  }, [query, projects, tasks, leads, members, notifications])
}
