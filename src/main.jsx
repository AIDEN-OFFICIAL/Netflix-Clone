import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import './index.css'
import { SignProvider } from '../context/signContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SignProvider> 
        <App />
      </SignProvider>      
    </BrowserRouter>
  </StrictMode>,
)
