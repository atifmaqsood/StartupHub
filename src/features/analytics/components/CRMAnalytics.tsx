import React, { useMemo } from 'react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Legend,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

interface CRMAnalyticsProps {
  leads: any[]
}

const STAGE_COLORS = {
  'New Lead': '#94a3b8',
  'Contacted': '#3b82f6',
  'Negotiation': '#f59e0b',
  'Won': '#10b981',
  'Lost': '#ef4444'
}

const SOURCE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

const CRMAnalytics: React.FC<CRMAnalyticsProps> = ({ leads: rawLeads }) => {
  const leads = rawLeads.length > 0 ? rawLeads : [
    { status: 'New Lead', value: '1000', source: 'Website' },
    { status: 'Negotiation', value: '5000', source: 'LinkedIn' },
    { status: 'Won', value: '10000', source: 'Referral' },
  ]

  const stageData = useMemo(() => {
    const stages = ['New Lead', 'Contacted', 'Negotiation', 'Won', 'Lost']
    return stages.map(stage => ({
      name: stage,
      value: leads.filter(l => l.status === stage).length,
      fill: STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
    }))
  }, [leads])

  const pipelineValue = useMemo(() => {
    const stages = ['New Lead', 'Contacted', 'Negotiation', 'Won', 'Lost']
    return stages.map(stage => ({
      name: stage,
      value: leads
        .filter(l => l.status === stage)
        .reduce((sum, l) => sum + parseInt(l.value?.replace(/[^0-9]/g, '') || '0'), 0)
    }))
  }, [leads])

  const sourceData = useMemo(() => {
    const sources = [...new Set(leads.map(l => l.source))]
    return sources.map(source => ({
      name: source,
      value: leads.filter(l => l.source === source).length
    }))
  }, [leads])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AnalyticsCard 
        title="Sales Pipeline Funnel" 
        subtitle="Conversations through the sales stages"
      >
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Funnel
              data={stageData}
              dataKey="value"
              nameKey="name"
              stroke="transparent"
            >
              <LabelList position="right" fill="var(--text-muted)" stroke="none" dataKey="name" style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Pipeline Value" 
        subtitle="Estimated deal value by stage ($)"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pipelineValue}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <Tooltip 
              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Value']}
              cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }}
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Lead Source Distribution" 
        subtitle="Where your leads are coming from"
        className="lg:col-span-2"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="transparent"
            >
              {sourceData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }} />
          </PieChart>
        </ResponsiveContainer>
      </AnalyticsCard>
    </div>
  )
}

export default CRMAnalytics
