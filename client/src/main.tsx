import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
// product provider
import ProductProvider from "./contexts/ProductContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <ProductProvider>
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ProductProvider>
)
