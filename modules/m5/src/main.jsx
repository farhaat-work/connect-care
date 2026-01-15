import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./Charts/Setup.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
