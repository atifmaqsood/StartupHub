import teamData from '../data/team.json'
import { notificationService } from './notificationService.ts'

const TEAM_DB_KEY = 'startuphub_team_db'

const getInitialTeam = () => {
  const savedDb = localStorage.getItem(TEAM_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  localStorage.setItem(TEAM_DB_KEY, JSON.stringify(teamData))
  return [...teamData]
}

let members = getInitialTeam()

const saveToDb = () => {
  localStorage.setItem(TEAM_DB_KEY, JSON.stringify(members))
}

export const teamService = {
  getMembers: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve([...members]), 500)
    })
  },

  getMemberById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(members.find((m: any) => m.id === id)), 500)
    })
  },

  inviteMember: (memberData: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newMember = {
          id: `mem${Date.now()}`,
          ...memberData,
          status: 'Pending',
          joinedDate: new Date().toISOString().split('T')[0],
          avatar: `https://i.pravatar.cc/150?u=${memberData.name}`
        }
        members.unshift(newMember)
        saveToDb()

        notificationService.createNotification({
          type: 'team',
          message: `Alex invited ${newMember.name} to the team`,
          entityId: newMember.id,
          entityType: 'Member',
          userId: '1',
          userName: 'Alex Riviera',
          userAvatar: 'https://i.pravatar.cc/150?u=alex'
        })

        resolve(newMember)
      }, 500)
    })
  },

  updateMember: (id: string, memberData: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = members.findIndex((m: any) => m.id === id)
        if (index !== -1) {
          members[index] = { ...members[index], ...memberData }
          saveToDb()
          resolve(members[index])
        } else {
          reject(new Error('Member not found'))
        }
      }, 500)
    })
  },

  deleteMember: (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = members.findIndex((m: any) => m.id === id)
        if (index !== -1) {
          const memberName = members[index].name
          const memberId = members[index].id
          members.splice(index, 1)
          saveToDb()

          notificationService.createNotification({
            type: 'team',
            message: `Alex removed ${memberName} from the organization`,
            entityId: memberId,
            entityType: 'Member',
            userId: '1',
            userName: 'Alex Riviera',
            userAvatar: 'https://i.pravatar.cc/150?u=alex'
          })

          resolve(true)
        } else {
          reject(new Error('Member not found'))
        }
      }, 500)
    })
  }
}
