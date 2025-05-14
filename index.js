/**
 * @fileoverview Servidor Express para la API de Turismo.
 * Incluye rutas para manejo de usuarios y consultas SPARQL a la ontología.
 * Documentación Swagger disponible en /api-docs
 */

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

import OntologiaService from './api/ontologiaservice.js';
import UsuarioService from './api/usuarioservice.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servicios
const usuarioService = new UsuarioService();
const _ontologiaService = new OntologiaService();

// Obtener ruta absoluta del archivo para Swagger
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger configuración
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Turismo API',
      version: '1.0.0',
      description: 'API para gestionar usuarios y consultar la ontología de Turismo',
    },
    servers: [
      { url: 'https://ontologiaturismo.vercel.app' },
      { url: 'http://localhost:3001' }
    ],
  },
  apis: [path.join(__dirname, 'index.js')],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

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

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión con correo y contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
app.post('/usuarios/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await usuarioService.iniciarSesion(correo, contraseña);
    if (usuario) {
      const { id_usuario, nombre_usuario, correo } = usuario;
      res.status(200).json({ id_usuario, nombre_usuario, correo });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- RUTAS ONTOLOGÍA ---------------------------

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener las categorías principales de la ontología
 *     tags: [Ontología]
 *     responses:
 *       200:
 *         description: Lista de categorías principales
 *       500:
 *         description: Error del servidor
 */
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await _ontologiaService.consultarCategoriasPrincipales();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /ofertas-destacadas:
 *   get:
 *     summary: Consultar ofertas destacadas con valoración alta
 *     tags: [Ontología]
 *     responses:
 *       200:
 *         description: Lista de ofertas destacadas
 *       500:
 *         description: Error del servidor
 */
app.get('/ofertas-destacadas', async (req, res) => {
  try {
    const ofertas = await _ontologiaService.consultarOfertasDestacadas();
    res.json(ofertas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /subcategorias/{categoria}:
 *   get:
 *     summary: Consultar subcategorías de una categoría
 *     tags: [Ontología]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Lista de subcategorías
 *       500:
 *         description: Error del servidor
 */
app.get('/subcategorias/:categoria', async (req, res) => {
  try {
    const subcats = await _ontologiaService.consultarSubcategoriasDeCategoria(req.params.categoria);
    res.json(subcats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /instancias/{categoria}:
 *   get:
 *     summary: Consultar instancias relacionadas a una categoría
 *     tags: [Ontología]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Lista de instancias
 *       500:
 *         description: Error del servidor
 */
app.get('/instancias/:categoria', async (req, res) => {
  try {
    const datos = await _ontologiaService.consultarInstanciasDeCategoria(req.params.categoria);
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /buscar:
 *   get:
 *     summary: Buscar instancias en la ontología (parámetros opcionales)
 *     tags: [Ontología]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de resultados
 *       500:
 *         description: Error del servidor
 */
app.get('/buscar', async (req, res) => {
  const { q = '', offset = 0, category = '' } = req.query;

  try {
    const resultados = await _ontologiaService.buscarInstanciasPorTexto(q, offset, category);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exportar para Vercel
export default app;
