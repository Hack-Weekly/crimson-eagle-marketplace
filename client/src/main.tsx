import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppContextProvider from './contexts/AppContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </AppContextProvider>
)
