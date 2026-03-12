import { mockDB } from './mockDatabaseService';
import { notificationService } from './notificationService.ts'

export const teamService = {
  getMembers: async () => {
    return mockDB.getAll('team');
  },

  getMemberById: async (id: string) => {
    return mockDB.getById('team', id);
  },

  inviteMember: async (memberData: any) => {
    const newMember = await mockDB.create('team', {
      ...memberData,
      status: 'Pending',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(memberData.name)}`
    });

    await notificationService.createNotification({
      type: 'team',
      message: `Alex invited ${newMember.name} to the team`,
      entityId: newMember.id,
      entityType: 'Member',
      userId: '1',
      userName: 'Alex Riviera',
      userAvatar: 'https://i.pravatar.cc/150?u=alex'
    });

    return newMember;
  },

  updateMember: async (id: string, memberData: any) => {
    return mockDB.update('team', id, memberData);
  },

  deleteMember: async (id: string) => {
    const member = await mockDB.getById('team', id);
    if (member) {
        await mockDB.delete('team', id);
        
        await notificationService.createNotification({
            type: 'team',
            message: `Alex removed ${member.name} from the organization`,
            entityId: id,
            entityType: 'Member',
            userId: '1',
            userName: 'Alex Riviera',
            userAvatar: 'https://i.pravatar.cc/150?u=alex'
        });
    }
    return true;
  }
}
