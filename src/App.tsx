import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { useThemeUpdater } from './hooks/useThemeUpdater'

function App() {
  useThemeUpdater()
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
