import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './styles.css'
import App from './App.jsx'
import "./Components/Charts/Setup.js"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)