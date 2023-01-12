import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/index/Index.tsx'
import './global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
)
