const express = require('express');


const app = express();
app.use(express.json());

const PORT = 3000;

// Datos temporales (luego se conecta a PostgreSQL)
let usuarios = [];

// Ruta principal
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de usuarios funcionando ' });
});

// Registro
app.post('/api/users/register', (req, res) => {
  const { nombre, correo, password } = req.body;

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    correo,
    password
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    mensaje: 'Usuario registrado correctamente',
    usuario: nuevoUsuario
  });
});

// Login
app.post('/api/users/login', (req, res) => {
  const { correo, password } = req.body;

  const usuario = usuarios.find(
    u => u.correo === correo && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({
      mensaje: 'Correo o contraseña incorrectos'
    });
  }

  res.json({
    mensaje: 'Login exitoso',
    usuario
  });
});



app.get('/', (req, res) => {
  res.json({ mensaje: 'API de usuarios funcionando' });
});
// Listar usuarios
app.get('/api/users', (req, res) => {
  res.json(usuarios);
});

// Eliminar usuario
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  usuarios = usuarios.filter(u => u.id !== id);

  res.json({
    mensaje: 'Usuario eliminado correctamente'
  });
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'API conectada con PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'],
};


