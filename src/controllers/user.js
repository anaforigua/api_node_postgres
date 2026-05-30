const pool = require("../config/database");
const bcrypt = require("bcrypt");
const apiResponse = require("../utils/response");

// ========================================
// REGISTRAR USUARIO
// ========================================

const register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // VALIDAR SI EXISTE
    const usuarioExiste = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(400).json(
        apiResponse(
          false,
          "Correo ya registrado",
          null,
          "DUPLICATE_EMAIL"
        )
      );
    }

    // HASH PASSWORD
    const passwordHash = await bcrypt.hash(password, 10);

    // INSERT
    const resultado = await pool.query(
      `
      INSERT INTO usuarios (nombre, correo, password)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, correo
      `,
      [nombre, correo, passwordHash]
    );

    return res.status(201).json(
      apiResponse(
        true,
        "Usuario registrado correctamente",
        resultado.rows[0]
      )
    );

  } catch (error) {
    return res.status(500).json(
      apiResponse(false, "Error servidor", null, error.message)
    );
  }
};

// ========================================
// LOGIN
// ========================================

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuarios = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (usuarios.rows.length === 0) {
      return res.status(404).json(
        apiResponse(false, "Usuario no encontrado")
      );
    }

    const usuario = usuarios.rows[0];

    const passwordCorrecto = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecto) {
      return res.status(401).json(
        apiResponse(false, "Contraseña incorrecta")
      );
    }

    return res.json(
      apiResponse(
        true,
        "Login exitoso",
        {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo
        }
      )
    );

  } catch (error) {
    return res.status(500).json(
      apiResponse(false, "Error servidor", null, error.message)
    );
  }
};

// ========================================
// LISTAR USUARIOS
// ========================================

const getUsers = async (req, res) => {
  try {
    const usuarios = await pool.query(
      "SELECT id, nombre, correo FROM usuarios"
    );

    return res.json(
      apiResponse(
        true,
        "Lista usuarios",
        usuarios.rows
      )
    );

  } catch (error) {
    return res.status(500).json(
      apiResponse(false, "Error servidor", null, error.message)
    );
  }
};

// ========================================
// ELIMINAR USUARIO
// ========================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    );

    return res.json(
      apiResponse(
        true,
        "Usuario eliminado"
      )
    );

  } catch (error) {
    return res.status(500).json(
      apiResponse(false, "Error servidor", null, error.message)
    );
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser
};