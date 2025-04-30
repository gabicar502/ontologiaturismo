import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Para navegación
import './Login.css'; // Asegúrate de que el archivo CSS esté correctamente importado
import Logo from '../img/Innovar Proyectos - Logo.png';

// Componente para el login
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de inicio de sesión
    console.log("Usuario:", { email, password }); // Solo como ejemplo
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="#f5f5f5">
        {/* Usamos la imagen importada */}
        <img 
        src={Logo} 
        alt="Innovar Proyectos Logo" 
        className="logo" 
        style={{ width: '200px' }} // Puedes aumentar el valor de width según sea necesario
        />
       
        <Typography variant="h6" align="center" color="textSecondary">
          Bienvenido a la Plataforma de Proyectos Escolares
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            margin="normal"
            required
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            type="submit" 
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Box mt={2} textAlign="center">
            <Link to="/registro" style={{ textDecoration: 'none', color: 'blue' }}>
              ¿No tienes cuenta? Crear cuenta
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;

