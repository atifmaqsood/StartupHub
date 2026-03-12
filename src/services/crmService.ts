import leadsData from '../data/leads.json'

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
        resolve(newLead)
      }, 500)
    })
  },

  updateLead: (id: string, leadData: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = leads.findIndex((l: any) => l.id === id)
        if (index !== -1) {
          leads[index] = { ...leads[index], ...leadData }
          saveToDb()
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
