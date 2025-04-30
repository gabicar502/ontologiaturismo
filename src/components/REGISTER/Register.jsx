import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import '../REGISTER/Register.css'; // Asegúrate de tener este archivo CSS en la misma carpeta

export default function Register() {
  // Estado para capturar los datos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const roles = ["Estudiante", "Docente", "Coordinador"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para registrar al usuario
    console.log("Usuario registrado:", { name, lastName, email, password, role });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          Crea tu cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Apellido"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Rol"
            select
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((rol) => (
              <MenuItem key={rol} value={rol}>
                {rol}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}

