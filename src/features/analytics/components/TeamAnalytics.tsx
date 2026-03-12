import React, { useMemo } from 'react'
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

interface TeamAnalyticsProps {
  members: any[]
  tasks: any[]
}

const TeamAnalytics: React.FC<TeamAnalyticsProps> = ({ members: rawMembers, tasks }) => {
  const members = rawMembers.length > 0 ? rawMembers : [
    { name: 'Alex Riviera' },
    { name: 'Sarah Chen' },
  ]

  const productivityData = useMemo(() => {
    return members.map(member => ({
      name: member.name,
      completed: tasks.filter(t => t.assignee === member.name && t.status === 'Completed').length,
      active: tasks.filter(t => t.assignee === member.name && t.status !== 'Completed').length,
    }))
  }, [members, tasks])

  const contributionData = useMemo(() => {
    // Ideally we'd have a projects-members mapping. 
    // Mocking for now based on name matching in task list for those projects
    return members.map(member => {
      const memberProjects = new Set(
        tasks.filter(t => t.assignee === member.name).map(t => t.projectName)
      )
      return {
        subject: member.name,
        Projects: memberProjects.size,
        Tasks: tasks.filter(t => t.assignee === member.name).length,
        Efficiency: Math.random() * 100, // Mock efficiency metric
        fullMark: 100,
      }
    })
  }, [members, tasks])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AnalyticsCard 
        title="Tasks Completed by Member" 
        subtitle="Historical productivity ranking"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productivityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" align="right" />
            <Bar dataKey="completed" fill="#10b981" radius={[0, 4, 4, 0]} stackId="a" />
            <Bar dataKey="active" fill="#e2e8f0" radius={[0, 4, 4, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Skills & Contribution" 
        subtitle="Performance profile across dimensions"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={contributionData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
            <Radar
              name="Member Data"
              dataKey="Efficiency"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </AnalyticsCard>
    </div>
  )
}

export default TeamAnalytics
