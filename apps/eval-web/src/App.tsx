import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@sportback/core'

import routes from './routes/index'

function App() {
  const router = createBrowserRouter([
    {
      path: '/eval',
      children: routes
    }
  ])

  return (
    <ThemeProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
