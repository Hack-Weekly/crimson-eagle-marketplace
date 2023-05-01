import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
// product provider
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from './contexts/SidebarContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <SidebarProvider>
 <ProductProvider>
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ProductProvider>
  </SidebarProvider>
)
