import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LOGIN/Login';
import Registro from './components/REGISTER/Register';
import Home from './pages/HOME/Home';
import NotFound from './pages/NOTFOUND/NotFound'; // Asegúrate de tener un componente NotFound
import PanelPrincipal from './components/INICIO/PanelPrincipal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} /> {/* Para manejar las rutas no existentes */}
        <Route path="/panel" element={<PanelPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;






