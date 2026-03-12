import { mockDB } from './mockDatabaseService';
import { notificationService } from './notificationService.ts'

export const taskService = {
  getTasks: async () => {
    return mockDB.getAll('tasks');
  },

  getTasksByProject: async (projectId: string) => {
    const allTasks = await mockDB.getAll('tasks');
    return allTasks.filter((t: any) => t.projectId === projectId);
  },

  getTaskById: async (id: string) => {
    return mockDB.getById('tasks', id);
  },

  createTask: async (taskData: any) => {
    const newTask = await mockDB.create('tasks', {
      ...taskData,
      createdAt: new Date().toISOString(),
    });

    await notificationService.createNotification({
      type: 'task',
      message: `Alex created task '${newTask.title}'`,
      entityId: newTask.id,
      entityType: 'Task',
      userId: '1',
      userName: 'Alex Riviera',
      userAvatar: 'https://i.pravatar.cc/150?u=alex'
    });

    return newTask;
  },

  updateTask: async (id: string, taskData: any) => {
    const oldTask = await mockDB.getById('tasks', id);
    if (!oldTask) throw new Error('Task not found');

    const updatedTask = await mockDB.update('tasks', id, taskData);
    
    if (oldTask.status !== updatedTask.status) {
      await notificationService.createNotification({
        type: 'task',
        message: `Sarah moved task '${updatedTask.title}' to ${updatedTask.status}`,
        entityId: id,
        entityType: 'Task',
        userId: '2',
        userName: 'Sarah Chen',
        userAvatar: 'https://i.pravatar.cc/150?u=sarah'
      });
    }

    return updatedTask;
  },

  deleteTask: async (id: string) => {
    return mockDB.delete('tasks', id);
  },

  reorderTasks: async (newTasks: any[]) => {
    return mockDB.bulkUpdate('tasks', newTasks);
  }
}
