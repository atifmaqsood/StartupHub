import tasksData from '../data/tasks.json'

const TASKS_DB_KEY = 'startuphub_tasks_db'

const getInitialTasks = () => {
  const savedDb = localStorage.getItem(TASKS_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  localStorage.setItem(TASKS_DB_KEY, JSON.stringify(tasksData))
  return [...tasksData]
}

let tasks = getInitialTasks()

const saveToDb = () => {
  localStorage.setItem(TASKS_DB_KEY, JSON.stringify(tasks))
}

export const taskService = {
  getTasks: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve([...tasks]), 500)
    })
  },

  getTasksByProject: (projectId: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(tasks.filter((t: any) => t.projectId === projectId)), 500)
    })
  },

  updateTaskStatus: (id: string, status: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex((t: any) => t.id === id)
        if (index !== -1) {
          tasks[index].status = status
          saveToDb()
          resolve(tasks[index])
        } else {
          reject(new Error('Task not found'))
        }
      }, 500)
    })
  }
}
