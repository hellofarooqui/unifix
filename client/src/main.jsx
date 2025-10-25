import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { HeaderContextProivder } from './context/HeaderContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HeaderContextProivder>
        <App />
        <Toaster />
      </HeaderContextProivder>
    </AuthProvider>
  </StrictMode>,
)
