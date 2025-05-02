import React from 'react';
import ReactDOM from 'react-dom/client'; // o `react-dom`
import './index.css';  // Si tienes un archivo CSS global
import App from './App'; // Asegúrate de importar tu componente App

const root = ReactDOM.createRoot(document.getElementById('root')); // Obtén el div con id 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
