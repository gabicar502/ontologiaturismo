import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../config/firebase'; 
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../LOGIN/Login.css';
import Logo from '../../img/Innovar Proyectos - Logo.png';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login exitoso", user);

      // Redirigir al panel de usuario después de un inicio de sesión exitoso
      navigate('/panel'); // Asegúrate de que '/panel' sea la ruta correcta a tu panel
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Credenciales inválidas");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="#f5f5f5">
        <img
          src={Logo}
          alt="Innovar Proyectos Logo"
          className="logo"
          style={{ width: '320px' }} 
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
