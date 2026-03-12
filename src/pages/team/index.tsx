import React, { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { fetchMembers, inviteMember, deleteMemberAsync } from '../../store/teamSlice.ts'
import { DataTable } from '../../components/tables/DataTable.tsx'
import InviteMemberModal from '../../features/team/components/InviteMemberModal.tsx'
import MemberRoleBadge from '../../features/team/components/MemberRoleBadge.tsx'
import Badge from '../../components/ui/Badge.tsx'
import Button from '../../components/ui/Button.tsx'
import { UserPlus, Trash2, Mail, ExternalLink, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const TeamPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { members, loading } = useAppSelector((state) => state.team)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchMembers())
  }, [dispatch])

  const handleInvite = async (data: any) => {
    await dispatch(inviteMember(data))
    setIsModalOpen(false)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      dispatch(deleteMemberAsync(id))
    }
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Member',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[var(--bg-main)] overflow-hidden border border-[var(--color-border)]/10 flex-shrink-0">
            {row.original.avatar ? (
              <img src={row.original.avatar} alt={row.original.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                {row.original.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Link 
              to={`/team/${row.original.id}`} 
              virtual-href={`/team/${row.original.id}`}
              className="font-bold text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
            >
              {row.original.name}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <span className="text-xs text-[var(--text-muted)]">{row.original.email}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }: any) => <MemberRoleBadge role={row.original.role} />,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'Active' ? 'success' : 'neutral'} className="h-5 px-2">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'joinedDate',
      header: 'Joined Date',
      cell: ({ row }: any) => (
        <span className="text-sm text-[var(--text-secondary)] font-medium">{row.original.joinedDate}</span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }: any) => (
        <div className="flex items-center justify-end gap-2 text-right">
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <Mail className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original.id, row.original.name)}
            className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ], [])

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Team Management</h1>
          <p className="text-[var(--text-secondary)]">Manage your organization's members, roles and invitations.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-11 px-6 shadow-lg shadow-primary/20">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--color-border)]/10 shadow-sm overflow-hidden min-h-[400px]">
        {loading && members.length === 0 ? (
          <div className="h-96 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
              <p className="text-sm font-medium text-[var(--text-muted)]">Loading team members...</p>
            </div>
          </div>
        ) : (
          <DataTable columns={columns} data={members} />
        )}
      </div>

      <InviteMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleInvite} 
      />
    </div>
  )
}

export default TeamPage
