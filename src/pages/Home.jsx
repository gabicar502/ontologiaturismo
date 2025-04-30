import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Slider from 'react-slick'; // Asegúrate de que esta importación sea correcta
import { Link } from 'react-router-dom'; // Para redirigir al usuario
import Logo from '../img/Innovar Proyectos - Logo.png'; // Asegúrate de que la ruta sea correcta
import './Home.css'; // Asegúrate de tener tu archivo CSS

// Importa las imágenes del carrusel
import orquideas_banner from '../img/banner_ia-carrusel1.png';
import banner_robotica from '../img/banner_robotica-carrusel2.png';
import banner_preguntale_ciencia from '../img/banner_preguntale_ciencia-carrusel3.png';

// Configuración del slider
const sliderSettings = {
  dots: true, // Muestra puntos de navegación
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <Box textAlign="center" mt={4}>
        <img 
          src={Logo} 
          alt="Innovar Proyectos Logo" 
          style={{ 
            width: '300px',   // Ajusta el tamaño del logo
            height: 'auto',   // Mantiene la proporción del logo
            marginBottom: '20px' // Espaciado debajo del logo
          }} 
        />
      </Box>

      {/* Slider */}
      <Container maxWidth="md">
        <Box mt={4}>
          <Slider {...sliderSettings}>
            <div>
              <img src={orquideas_banner} alt="Slide 1" />
            </div>
            <div>
              <img src={banner_robotica} alt="Slide 2" />
            </div>
            <div>
              <img src={banner_preguntale_ciencia} alt="Slide 3" />
            </div>
          </Slider>
        </Box>
      </Container>

      {/* Noticias o Información */}
      <Container maxWidth="lg">
        <Box mt={4}>
          <Typography variant="h5" gutterBottom align="center">
            Noticias y Actualizaciones
          </Typography>
          <Grid container spacing={3}>
            {/* Tarjetas de Noticias */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Noticia 1
                  </Typography>
                  <Typography variant="body2">
                    Esta es una breve descripción de la noticia. Puedes agregar más información aquí.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Noticia 2
                  </Typography>
                  <Typography variant="body2">
                    Esta es una breve descripción de otra noticia. Agrega los detalles que necesites.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Noticia 3
                  </Typography>
                  <Typography variant="body2">
                    Aquí puedes agregar más noticias o actualizaciones importantes para los usuarios.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Botón para redirigir al login */}
      <Box mt={5} textAlign="center">
        <Link to="/login">
          <Button variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default Home;



