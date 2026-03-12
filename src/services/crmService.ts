import leadsData from '../data/leads.json'
import { notificationService } from './notificationService.ts'

const LEADS_DB_KEY = 'startuphub_leads_db'

const getInitialLeads = () => {
  const savedDb = localStorage.getItem(LEADS_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  localStorage.setItem(LEADS_DB_KEY, JSON.stringify(leadsData))
  return [...leadsData]
}

let leads = getInitialLeads()

const saveToDb = () => {
  localStorage.setItem(LEADS_DB_KEY, JSON.stringify(leads))
}

export const crmService = {
  getLeads: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve([...leads]), 500)
    })
  },

  getLeadById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(leads.find((l: any) => l.id === id)), 500)
    })
  },

  createLead: (leadData: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newLead = {
          id: `lead${Date.now()}`,
          ...leadData,
          createdAt: new Date().toISOString(),
        }
        leads.unshift(newLead)
        saveToDb()

        notificationService.createNotification({
          type: 'crm',
          message: `Alex added new lead '${newLead.name}' from ${newLead.source}`,
          entityId: newLead.id,
          entityType: 'Lead',
          userId: '1',
          userName: 'Alex Riviera',
          userAvatar: 'https://i.pravatar.cc/150?u=alex'
        })

        resolve(newLead)
      }, 500)
    })
  },

  updateLead: (id: string, leadData: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = leads.findIndex((l: any) => l.id === id)
        if (index !== -1) {
          const oldStatus = leads[index].status
          leads[index] = { ...leads[index], ...leadData }
          const newStatus = leads[index].status
          
          saveToDb()

          if (oldStatus !== newStatus) {
            notificationService.createNotification({
              type: 'crm',
              message: `Alex moved lead '${leads[index].name}' to ${newStatus}`,
              entityId: id,
              entityType: 'Lead',
              userId: '1',
              userName: 'Alex Riviera',
              userAvatar: 'https://i.pravatar.cc/150?u=alex'
            })
          }

          resolve(leads[index])
        } else {
          reject(new Error('Lead not found'))
        }
      }, 500)
    })
  },

  deleteLead: (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = leads.findIndex((l: any) => l.id === id)
        if (index !== -1) {
          leads.splice(index, 1)
          saveToDb()
          resolve(true)
        } else {
          reject(new Error('Lead not found'))
        }
      }, 500)
    })
  },

  reorderLeads: (newLeads: any[]) => {
    return new Promise(resolve => {
      setTimeout(() => {
        leads = [...newLeads]
        saveToDb()
        resolve(leads)
      }, 500)
    })
  }
}
