import { mockDB } from './mockDatabaseService';
import { notificationService } from './notificationService.ts'

export const crmService = {
  getLeads: async () => {
    return mockDB.getAll('leads');
  },

  getLeadById: async (id: string) => {
    return mockDB.getById('leads', id);
  },

  createLead: async (leadData: any) => {
    const newLead = await mockDB.create('leads', {
      ...leadData,
      createdAt: new Date().toISOString(),
    });

    await notificationService.createNotification({
      type: 'crm',
      message: `Alex added new lead '${newLead.name}' from ${newLead.source}`,
      entityId: newLead.id,
      entityType: 'Lead',
      userId: '1',
      userName: 'Alex Riviera',
      userAvatar: 'https://i.pravatar.cc/150?u=alex'
    });

    return newLead;
  },

  updateLead: async (id: string, leadData: any) => {
    const oldLead = await mockDB.getById('leads', id);
    if (!oldLead) throw new Error('Lead not found');

    const updatedLead = await mockDB.update('leads', id, leadData);
    
    if (oldLead.status !== updatedLead.status) {
      await notificationService.createNotification({
        type: 'crm',
        message: `Alex moved lead '${updatedLead.name}' to ${updatedLead.status}`,
        entityId: id,
        entityType: 'Lead',
        userId: '1',
        userName: 'Alex Riviera',
        userAvatar: 'https://i.pravatar.cc/150?u=alex'
      });
    }

    return updatedLead;
  },

  deleteLead: async (id: string) => {
    return mockDB.delete('leads', id);
  },

  reorderLeads: async (newLeads: any[]) => {
    return mockDB.bulkUpdate('leads', newLeads);
  }
}
