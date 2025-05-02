import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Si tienes estilos globales
import App from './App';  // Asegúrate de que la ruta sea correcta

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
