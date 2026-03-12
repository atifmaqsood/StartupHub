import { mockDB } from './mockDatabaseService';
import { notificationService } from './notificationService.ts'

export const projectService = {
  getProjects: async () => {
    return mockDB.getAll('projects');
  },

  getProjectById: async (id: string) => {
    return mockDB.getById('projects', id);
  },

  createProject: async (projectData: any) => {
    const newProject = await mockDB.create('projects', {
      ...projectData,
      progression: 0,
    });
    
    await notificationService.createNotification({
      type: 'project',
      message: `Alex created project '${newProject.name}'`,
      entityId: newProject.id,
      entityType: 'Project',
      userId: '1',
      userName: 'Alex Riviera',
      userAvatar: 'https://i.pravatar.cc/150?u=alex'
    });

    return newProject;
  },

  updateProject: async (id: string, projectData: any) => {
    const updatedProject = await mockDB.update('projects', id, projectData);

    await notificationService.createNotification({
      type: 'project',
      message: `Alex updated project '${updatedProject.name}'`,
      entityId: id,
      entityType: 'Project',
      userId: '1',
      userName: 'Alex Riviera',
      userAvatar: 'https://i.pravatar.cc/150?u=alex'
    });

    return updatedProject;
  },

  deleteProject: async (id: string) => {
    const project = await mockDB.getById('projects', id);
    if (project) {
        await mockDB.delete('projects', id);
        
        // Cleanup associated tasks
        const allTasks = await mockDB.getAll('tasks');
        const remainingTasks = allTasks.filter(t => t.projectId !== id);
        if (allTasks.length !== remainingTasks.length) {
            await mockDB.bulkUpdate('tasks', remainingTasks);
        }

        await notificationService.createNotification({
            type: 'project',
            message: `Alex deleted project '${project.name}'`,
            entityId: id,
            entityType: 'Project',
            userId: '1',
            userName: 'Alex Riviera',
            userAvatar: 'https://i.pravatar.cc/150?u=alex'
        });
    }
    return true;
  }
}
