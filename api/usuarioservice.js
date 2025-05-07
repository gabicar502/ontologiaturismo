import pkg from 'pg';
const { Pool } = pkg;

class UsuarioService {
    constructor() {
      this.pool = new Pool({
        user: 'verceluser',               // o postgres, según creaste el usuario
        host: '3.144.116.190',            // ← IP pública de tu instancia EC2
        database: 'turismo',              // ← Tu base de datos real
        password: 'vercel123',            // ← La contraseña que diste
        port: 5432,
      });
}

  async crearUsuario(nombre_usuario, correo, contraseña) {
    try {
      const result = await this.pool.query(
        'INSERT INTO usuarios (nombre_usuario, correo, contraseña) VALUES ($1, $2, $3) RETURNING *',
        [nombre_usuario, correo, contraseña]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async listarUsuarios() {
    try {
      const result = await this.pool.query('SELECT * FROM usuarios');
      return result.rows;
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    }
  }

  async actualizarUsuario(id, nombre_usuario, correo, contraseña) {
    try {
      const result = await this.pool.query(
        'UPDATE usuarios SET nombre_usuario = $1, correo = $2, contraseña = $3 WHERE id_usuario = $4 RETURNING *',
        [nombre_usuario, correo, contraseña, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async eliminarUsuario(id) {
    try {
      const result = await this.pool.query(
        'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

export default UsuarioService;
