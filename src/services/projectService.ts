import projectsData from '../data/projects.json'

const PROJECTS_DB_KEY = 'startuphub_projects_db'

const getInitialProjects = () => {
  const savedDb = localStorage.getItem(PROJECTS_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  localStorage.setItem(PROJECTS_DB_KEY, JSON.stringify(projectsData))
  return [...projectsData]
}

let projects = getInitialProjects()

const saveToDb = () => {
  localStorage.setItem(PROJECTS_DB_KEY, JSON.stringify(projects))
}

export const projectService = {
  getProjects: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve([...projects]), 500)
    })
  },

  getProjectById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(projects.find((p: any) => p.id === id)), 500)
    })
  },

  createProject: (projectData: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProject = {
          id: `p${Date.now()}`,
          ...projectData,
          progression: 0,
        }
        projects.push(newProject)
        saveToDb()
        resolve(newProject)
      }, 800)
    })
  },

  updateProject: (id: string, projectData: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = projects.findIndex((p: any) => p.id === id)
        if (index !== -1) {
          projects[index] = { ...projects[index], ...projectData }
          saveToDb()
          resolve(projects[index])
        } else {
          reject(new Error('Project not found'))
        }
      }, 500)
    })
  },

  deleteProject: (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = projects.findIndex((p: any) => p.id === id)
        if (index !== -1) {
          projects.splice(index, 1)
          saveToDb()
          resolve(true)
        } else {
          reject(new Error('Project not found'))
        }
      }, 500)
    })
  }
}
