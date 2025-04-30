import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/LOGIN/Login';
import Registro from '../src/components/REGISTER/Register';
import Home from './pages/HOME/Home';
import NotFound from './pages/NOTFOUND/NotFound'; // Asegúrate de tener un componente NotFound

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} /> {/* Para manejar las rutas no existentes */}
      </Routes>
    </Router>
  );
}

export default App;






