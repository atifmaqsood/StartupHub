import users from '../data/users.json'

export const authService = {
  login: (email: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const user = users.find(u => u.email === email) || users[0]
        resolve(user)
      }, 500)
    })
  },
  getCurrentUser: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(users[0]), 500)
    })
  }
}
