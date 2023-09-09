import '@/assets/styles/normalize.scss'
import '@/assets/styles/index.scss'

import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)

/* 
root.render(
  <Profiler id="App" onRender={onRender}>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </Profiler>
)

function onRender(id: any, phase: any, actualDuration: any, baseDuration: any, startTime: any, commitTime: any) {
  console.log('id:', id)
  console.log('phase:', phase)
  console.log('actualDuration:', actualDuration)
  console.log('baseDuration:', baseDuration)
  console.log('startTime:', startTime)
  console.log('commitTime:', commitTime)
} */
