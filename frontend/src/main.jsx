import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Initialize theme from localStorage or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.remove('dark', 'light');
document.documentElement.classList.add(savedTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
