import React from 'react'
import { createRoot } from 'react-dom/client'
import OrderPage from './components/OrderPage.jsx'
import './styles.css'
import './order.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrderPage />
  </React.StrictMode>
)
