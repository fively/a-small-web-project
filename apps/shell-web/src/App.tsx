import { ThemeProvider } from '@sportback/core'
import { AppRoutes } from './routes'
import { AppProvider } from './providers'

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
