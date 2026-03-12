import leads from '../data/leads.json'

export const crmService = {
  getLeads: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(leads), 500)
    })
  },
  getLeadById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(leads.find(l => l.id === id)), 500)
    })
  }
}
