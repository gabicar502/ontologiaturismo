import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { app } from '../../../config/firebase';
import {
  Button, TextField, Container, Box, Typography,
  Snackbar, Alert, Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../LOGIN/Login.css';
import Logo from '../../img/Innovar Proyectos - Logo.png';

// Íconos
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Login con Google exitoso:", user);
      navigate('/panel');
    } catch (error) {
      console.error("Error con Google Sign-In:", error.message);
      setOpenSnackbar(true);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Login con Facebook exitoso:", user);
      navigate('/panel');
    } catch (error) {
      console.error("Error con Facebook Sign-In:", error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="login-box">
        <img src={Logo} alt="Innovar Proyectos Logo" className="logo" />
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

          <Divider sx={{ my: 2 }}>O inicia con</Divider>

          <Box display="flex" justifyContent="center" gap={2} my={2}>
            <Button
              onClick={handleGoogleLogin}
              variant="outlined"
              sx={{
                minWidth: 48,
                height: 48,
                borderRadius: '50%',
                padding: 0
              }}
            >
              <FaGoogle size={20} />
            </Button>

            <Button
              onClick={handleFacebookLogin}
              variant="outlined"
              sx={{
                minWidth: 48,
                height: 48,
                borderRadius: '50%',
                padding: 0,
                color: '#1877F2',
                borderColor: '#1877F2'
              }}
            >
              <FaFacebookF size={20} />
            </Button>
          </Box>

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
