import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import routes from './routes/index'
import { AppProvider } from './providers'
import { ThemeProvider } from '@sportback/core'

function App() {
  const router = createBrowserRouter([
    {
      path: '/eval',
      children: routes
    }
  ])

  return (
    <ThemeProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
