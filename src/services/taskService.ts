import tasks from '../data/tasks.json'

export const taskService = {
  getTasks: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(tasks), 500)
    })
  },
  getTasksByProject: (projectId: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(tasks.filter(t => t.projectId === projectId)), 500)
    })
  }
}
