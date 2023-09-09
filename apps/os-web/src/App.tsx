import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@sportback/core'

import router from './routes/index'

function App() {
  return (
    <ThemeProvider>
      <Suspense>
        <RouterProvider router={createBrowserRouter(router)} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
