import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  const browserHandlers = await import('../src/mocks/browser')
  
  browserHandlers.worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
