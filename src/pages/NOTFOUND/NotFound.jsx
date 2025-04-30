import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Para redirigir al usuario
import '../NOTFOUND/NotFound.css'; // Asegúrate de tener el archivo CSS en la carpeta correcta


function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor="#ffffff">
        <Typography variant="h3" gutterBottom align="center" color="primary">
          ¡Página no encontrada!
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          La página que estás buscando no existe. Asegúrate de haber escrito la URL correctamente o vuelve al inicio.
        </Typography>
        <Box mt={3} textAlign="center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large">
              Volver a la página principal
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFound;
