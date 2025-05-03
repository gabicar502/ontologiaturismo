import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../config/firebase'; 
import { Button, TextField, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../LOGIN/Login.css';
import Logo from '../../img/Innovar Proyectos - Logo.png';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login exitoso", user);
      navigate('/panel');
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="login-box">
        <img
          src={Logo}
          alt="Innovar Proyectos Logo"
          className="logo"
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
            className="login-button"
          >
            Iniciar Sesión
          </Button>
          <Box className="register-link-box">
            <Link to="/registro" className="register-link">
              ¿No tienes cuenta? Crear cuenta
            </Link>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="snackbar"
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          className="alert"
        >
          Credenciales inválidas
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
