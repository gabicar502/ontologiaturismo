/**
 * @fileoverview Servidor Express para la API de Turismo.
 * Incluye rutas para manejo de usuarios y consultas SPARQL a la ontología.
 * Incluye documentación Swagger en /api-docs
 */

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import OntologiaService from './api/ontologiaservice.js';
import UsuarioService from './api/usuarioservice.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Servicios
const usuarioService = new UsuarioService();
const _ontologiaService = new OntologiaService();

// Swagger configuración
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Turismo API',
      version: '1.0.0',
      description: 'API para gestionar usuarios y consultar la ontología de Turismo',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: ['./api/index.js'], // Ajustar si deseas usar comentarios Swagger
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------------- RUTAS USUARIOS ---------------------------

/** Información de ruta */
app.get('/usuarios', (req, res) => {
  res.send('Usa POST en /usuarios/crear, /listar, /actualizar o /eliminar.');
});

/** Crear usuario */
app.post('/usuarios/crear', async (req, res) => {
  const { nombre_usuario, correo, contraseña } = req.body;
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(nombre_usuario, correo, contraseña);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Listar usuarios */
app.post('/usuarios/listar', async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Actualizar usuario */
app.post('/usuarios/actualizar', async (req, res) => {
  const { id_usuario, nombre_usuario, correo, contraseña } = req.body;
  try {
    const actualizado = await usuarioService.actualizarUsuario(id_usuario, nombre_usuario, correo, contraseña);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Eliminar usuario */
app.post('/usuarios/eliminar', async (req, res) => {
  const { id_usuario } = req.body;
  try {
    const eliminado = await usuarioService.eliminarUsuario(id_usuario);
    res.json(eliminado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- RUTAS ONTOLOGÍA ---------------------------

/** Obtener categorías principales */
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await _ontologiaService.consultarCategoriasPrincipales();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Ofertas destacadas */
app.get('/ofertas-destacadas', async (req, res) => {
  try {
    const ofertas = await _ontologiaService.consultarOfertasDestacadas();
    res.json(ofertas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Subcategorías por categoría */
app.get('/subcategorias/:categoria', async (req, res) => {
  try {
    const subcats = await _ontologiaService.consultarSubcategoriasDeCategoria(req.params.categoria);
    res.json(subcats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Instancias por categoría */
app.get('/instancias/:categoria', async (req, res) => {
  try {
    const datos = await _ontologiaService.consultarInstanciasDeCategoria(req.params.categoria);
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Buscar instancias */
app.get('/buscar', async (req, res) => {
  const { q, offset = 0 } = req.query;
  try {
    if (!q) return res.status(400).json({ error: 'Parámetro q requerido' });
    const resultados = await _ontologiaService.buscarInstanciasPorTexto(q, offset);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- INICIO SERVIDOR ---------------------------

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
  console.log('📚 Documentación Swagger disponible en http://localhost:3001/api-docs');
});

