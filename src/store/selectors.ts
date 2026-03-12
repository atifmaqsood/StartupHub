import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Base Selectors
export const selectProjects = (state: RootState) => state.projects.items;
export const selectTasks = (state: RootState) => state.tasks.items;
export const selectLeads = (state: RootState) => state.crm.leads;
export const selectTeam = (state: RootState) => state.team.members;

// Derived Selectors
export const selectDashboardStats = createSelector(
  [selectProjects, selectTasks, selectLeads, selectTeam],
  (projects, tasks, leads, team) => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const totalLeads = leads.length;
    const activeMembers = team.filter(m => m.status === 'Active').length;
    
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const totalLeadValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      totalLeads,
      activeMembers,
      taskCompletionRate,
      totalLeadValue
    };
  }
);

export const selectProjectProgressData = createSelector(
  [selectProjects],
  (projects) => projects.slice(0, 5).map(p => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
    progress: p.progression || 0
  }))
);

export const selectTaskStatusData = createSelector(
  [selectTasks],
  (tasks) => [
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
    { name: 'Review', value: tasks.filter(t => t.status === 'Review').length },
  ]
);

export const selectLeadValueData = createSelector(
  [selectLeads],
  (leads) => leads.slice(0, 6).map(l => ({
    name: l.company,
    value: l.value
  }))
);
