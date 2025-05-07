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
  apis: ['./index.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------------- RUTAS USUARIOS ---------------------------

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Información general de la ruta de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Mensaje informativo
 */
app.get('/usuarios', (req, res) => {
  res.send('Usa POST en /usuarios/crear, /listar, /actualizar o /eliminar.');
});

/**
 * @swagger
 * /usuarios/crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error del servidor
 */
app.post('/usuarios/crear', async (req, res) => {
  const { nombre_usuario, correo, contraseña } = req.body;
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(nombre_usuario, correo, contraseña);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usuarios/listar:
 *   post:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error del servidor
 */
app.post('/usuarios/listar', async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usuarios/actualizar:
 *   post:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               nombre_usuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       500:
 *         description: Error del servidor
 */
app.post('/usuarios/actualizar', async (req, res) => {
  const { id_usuario, nombre_usuario, correo, contraseña } = req.body;
  try {
    const actualizado = await usuarioService.actualizarUsuario(id_usuario, nombre_usuario, correo, contraseña);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usuarios/eliminar:
 *   post:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       500:
 *         description: Error del servidor
 */
app.post('/usuarios/eliminar', async (req, res) => {
  const { id_usuario } = req.body;
  try {
    const eliminado = await usuarioService.eliminarUsuario(id_usuario);
    res.json(eliminado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- INICIO SERVIDOR ---------------------------

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
  console.log('📚 Documentación Swagger disponible en http://localhost:3001/api-docs');
});