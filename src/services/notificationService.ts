import { mockDB } from './mockDatabaseService';

export const notificationService = {
  getNotifications: async () => {
    const notifications = await mockDB.getAll('notifications');
    return [...notifications].sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  createNotification: async (data: any) => {
    return mockDB.create('notifications', {
      isRead: false,
      timestamp: new Date().toISOString(),
      ...data
    });
  },

  markAsRead: async (id: string) => {
    return mockDB.update('notifications', id, { isRead: true });
  },

  markAllAsRead: async () => {
    const notifications = await mockDB.getAll('notifications');
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    return mockDB.bulkUpdate('notifications', updated);
  },

  deleteNotification: async (id: string) => {
    return mockDB.delete('notifications', id);
  }
}
