import projects from '../data/projects.json'

export const projectService = {
  getProjects: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(projects), 500)
    })
  },
  getProjectById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(projects.find(p => p.id === id)), 500)
    })
  }
}
