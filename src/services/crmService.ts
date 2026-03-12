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
  }
}
