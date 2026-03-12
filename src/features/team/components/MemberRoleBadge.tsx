import React from 'react'
import Badge from '../../../components/ui/Badge.tsx'

interface MemberRoleBadgeProps {
  role: string
}

const MemberRoleBadge: React.FC<MemberRoleBadgeProps> = ({ role }) => {
  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner': return 'error'
      case 'admin': return 'warning'
      case 'manager': return 'info'
      case 'member': return 'neutral'
      default: return 'neutral'
    }
  }

  return (
    <Badge variant={getRoleVariant(role)} className="px-2 py-0 text-[10px] font-bold uppercase tracking-wider">
      {role}
    </Badge>
  )
}

export default MemberRoleBadge
