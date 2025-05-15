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

import OntologiaService from '../api/ontologiaservice.js';
import UsuarioService from '../api/usuarioservice.js';

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

app.get('/usuarios', (req, res) => {
  res.send('Usa POST en /usuarios/crear, /listar, /actualizar o /eliminar.');
});

app.post('/usuarios/crear', async (req, res) => {
  const { nombre_usuario, correo, contraseña } = req.body;
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(nombre_usuario, correo, contraseña);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios/listar', async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios/actualizar', async (req, res) => {
  const { id_usuario, nombre_usuario, correo, contraseña } = req.body;
  try {
    const actualizado = await usuarioService.actualizarUsuario(id_usuario, nombre_usuario, correo, contraseña);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios/eliminar', async (req, res) => {
  const { id_usuario } = req.body;
  try {
    const eliminado = await usuarioService.eliminarUsuario(id_usuario);
    res.json(eliminado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.get('/categorias', async (req, res) => {
  try {
    const categorias = await _ontologiaService.consultarCategoriasPrincipales();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/ofertas-destacadas', async (req, res) => {
  try {
    const ofertas = await _ontologiaService.consultarOfertasDestacadas();
    res.json(ofertas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/subcategorias/:categoria', async (req, res) => {
  try {
    const subcats = await _ontologiaService.consultarSubcategoriasDeCategoria(req.params.categoria);
    res.json(subcats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/instancias/:categoria', async (req, res) => {
  try {
    const datos = await _ontologiaService.consultarInstanciasDeCategoria(req.params.categoria);
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/buscar', async (req, res) => {
  const { q = '', offset = 0, category = '' } = req.query;

  try {
    const resultados = await _ontologiaService.buscarInstanciasPorTexto(q, offset, category);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- EXPORT VERCEL ---------------------------

// Adaptación para que Vercel ejecute Express como función Serverless
export default function handler(req, res) {
  return app(req, res);
}
