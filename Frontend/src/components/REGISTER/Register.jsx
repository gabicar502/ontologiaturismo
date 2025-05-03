import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box, MenuItem, Snackbar, Alert
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase.js";
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  const roles = ["Estudiante", "Docente", "Coordinador"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        lastName,
        email,
        role,
        createdAt: new Date()
      });

      setSnackbar({ open: true, message: "Usuario creado con éxito", severity: "success" });

      // Redirigir al login luego de un pequeño delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Error al registrar:", err);
      setSnackbar({ open: true, message: "Error al registrar el usuario", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          Crea tu cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Apellido" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextField label="Correo electrónico" fullWidth margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField
            label="Rol"
            select
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((rol) => (
              <MenuItem key={rol} value={rol}>{rol}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Cancelar
          </Button>
        </form>
      </Box>

      {/* Snackbar de éxito o error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
