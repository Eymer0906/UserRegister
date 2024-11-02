// Importar el módulo Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos simulados para usuarios (en lugar de base de datos)
const usuarios = [
  { id: 1, nombre: 'usuario1', contraseña: '123456' },
  { id: 2, nombre: 'usuario2', contraseña: 'abcdef' }
];

// Ruta de registro
app.post('/registro', (req, res) => {
  const { nombre, contraseña } = req.body;

  // Verificar si el usuario ya existe
  const usuarioExistente = usuarios.find(u => u.nombre === nombre);
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  // Crear nuevo usuario
  const nuevoUsuario = { id: usuarios.length + 1, nombre, contraseña };
  usuarios.push(nuevoUsuario);
  res.status(201).json({ mensaje: 'Registro exitoso', usuario: nuevoUsuario });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { nombre, contraseña } = req.body;

  // Buscar usuario
  const usuario = usuarios.find(u => u.nombre === nombre && u.contraseña === contraseña);
  if (!usuario) {
    return res.status(400).json({ mensaje: 'Error en la autenticación' });
  }

  res.status(200).json({ mensaje: 'Autenticación satisfactoria' });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
