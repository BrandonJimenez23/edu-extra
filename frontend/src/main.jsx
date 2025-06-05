import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';        // Global base styles
import './styles/components.css';  // Custom utilities and classes
import './styles/table.css';
import './styles/form.css';    // Form styles

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
