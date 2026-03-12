import notificationsData from '../data/notifications.json'

const NOTIFICATIONS_DB_KEY = 'startuphub_notifications_db'

const getInitialNotifications = () => {
  const savedDb = localStorage.getItem(NOTIFICATIONS_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  localStorage.setItem(NOTIFICATIONS_DB_KEY, JSON.stringify(notificationsData))
  return [...notificationsData]
}

let notifications = getInitialNotifications()

const saveToDb = () => {
  localStorage.setItem(NOTIFICATIONS_DB_KEY, JSON.stringify(notifications))
}

export const notificationService = {
  getNotifications: () => {
    return new Promise(resolve => {
      // Return sorted by newest first
      const sorted = [...notifications].sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setTimeout(() => resolve(sorted), 500)
    })
  },

  createNotification: (data: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newNotification = {
          id: `notif${Date.now()}`,
          isRead: false,
          timestamp: new Date().toISOString(),
          ...data
        }
        notifications.unshift(newNotification)
        saveToDb()
        resolve(newNotification)
      }, 500)
    })
  },

  markAsRead: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const notif = notifications.find((n: any) => n.id === id)
        if (notif) {
          notif.isRead = true
          saveToDb()
        }
        resolve(true)
      }, 300)
    })
  },

  markAllAsRead: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        notifications.forEach((n: any) => n.isRead = true)
        saveToDb()
        resolve(true)
      }, 300)
    })
  },

  deleteNotification: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        notifications = notifications.filter((n: any) => n.id !== id)
        saveToDb()
        resolve(true)
      }, 500)
    })
  }
}
