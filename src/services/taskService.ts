import tasksData from '../data/tasks.json'
import { notificationService } from './notificationService.ts'

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

  getTaskById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(tasks.find((t: any) => t.id === id)), 500)
    })
  },

  createTask: (taskData: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTask = {
          id: `t${Date.now()}`,
          ...taskData,
          createdAt: new Date().toISOString(),
        }
        tasks.push(newTask)
        saveToDb()

        notificationService.createNotification({
          type: 'task',
          message: `Alex created task '${newTask.title}'`,
          entityId: newTask.id,
          entityType: 'Task',
          userId: '1',
          userName: 'Alex Riviera',
          userAvatar: 'https://i.pravatar.cc/150?u=alex'
        })

        resolve(newTask)
      }, 500)
    })
  },

  updateTask: (id: string, taskData: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex((t: any) => t.id === id)
        if (index !== -1) {
          const oldStatus = tasks[index].status
          tasks[index] = { ...tasks[index], ...taskData }
          const newStatus = tasks[index].status
          
          saveToDb()

          if (oldStatus !== newStatus) {
            notificationService.createNotification({
              type: 'task',
              message: `Sarah moved task '${tasks[index].title}' to ${newStatus}`,
              entityId: id,
              entityType: 'Task',
              userId: '2',
              userName: 'Sarah Chen',
              userAvatar: 'https://i.pravatar.cc/150?u=sarah'
            })
          }

          resolve(tasks[index])
        } else {
          reject(new Error('Task not found'))
        }
      }, 500)
    })
  },

  deleteTask: (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex((t: any) => t.id === id)
        if (index !== -1) {
          tasks.splice(index, 1)
          saveToDb()
          resolve(true)
        } else {
          reject(new Error('Task not found'))
        }
      }, 500)
    })
  },

  reorderTasks: (newTasks: any[]) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Find if status changed during reorder (dnd-kit reorder logic)
        // For simplicity, we just log "Task reordered" if needed, 
        // but typically cross-column is handled by updateTask (status change).
        // If reorderTasks is used for cross-column too, we handle it here.
        
        tasks = [...newTasks]
        saveToDb()
        resolve(tasks)
      }, 500)
    })
  }
}
