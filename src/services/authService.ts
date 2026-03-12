import usersData from '../data/users.json'

// Simulate a persistent "Database" in LocalStorage
const USERS_DB_KEY = 'startuphub_users_db'

const getInitialUsers = () => {
  const savedDb = localStorage.getItem(USERS_DB_KEY)
  if (savedDb) return JSON.parse(savedDb)
  // If no DB exists, initialize with the JSON data
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersData))
  return [...usersData]
}

let users = getInitialUsers()

const saveToDb = () => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
}

export const authService = {
  login: (email: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u: any) => u.email === email)
        if (user) {
          localStorage.setItem('user_session', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
  },

  register: (userData: { name: string; email: string }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find((u: any) => u.email === userData.email)
        if (existingUser) {
          reject(new Error('User already exists'))
          return
        }
        const newUser = {
          id: String(users.length + 1),
          ...userData,
          role: 'Member',
          avatar: `https://i.pravatar.cc/150?u=${userData.email}`
        }
        users.push(newUser)
        saveToDb() // Persist to our mock database
        resolve(newUser)
      }, 1000)
    })
  },

  logout: () => {
    localStorage.removeItem('user_session')
    return Promise.resolve()
  },

  getCurrentUser: () => {
    const savedUser = localStorage.getItem('user_session')
    if (savedUser) {
      return Promise.resolve(JSON.parse(savedUser))
    }
    return Promise.resolve(null)
  },

  forgotPassword: (email: string) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: `Reset link sent to ${email}` }), 1000)
    })
  },

  resetPassword: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: 'Password reset successful' }), 1000)
    })
  }
}
