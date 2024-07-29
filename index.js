import express from 'express';
import http from 'node:http';
import { Server as SocketIO } from 'socket.io';
import { expressjwt as jwt } from 'express-jwt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from './middlewares/rateLimit.js';
import { checkRole } from './middlewares/check_role.js';
import serveStaticFiles from './middlewares/serveStatic.js';
import errorHandler from './middlewares/errorHandler.js';
import requestBodyParser from './middlewares/requestBodyParser.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url); //prueba
const __dirname = path.dirname(__filename); //prueba

// Configura el servidor HTTP
const httpServer = http.createServer(app);

// Configura Socket.IO para comunicación en tiempo real
const io = new SocketIO(httpServer, {
  cors: {
    origin: '*', // Permitir todas las solicitudes de origen cruzado
  },
});

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  console.log(`User connected: ${username}`);

  // Enviar una sesión al cliente conectado
  socket.emit('session', { username });

  // Manejar mensajes recibidos y emitirlos a otros clientes
  socket.on('message', (data) => {
    socket.broadcast.emit('message-received', {
      message: data,
      from: {
        id: socket.id,
        username,
      },
    });
  });
});

// Middleware para servir archivos estáticos
app.use(serveStaticFiles);

// Middleware para limitar la tasa de solicitudes
app.use(rateLimit);

// Middleware para el análisis del cuerpo de la solicitud
requestBodyParser(app);

// Configuración de autenticación JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET, // Secreto para firmar el token JWT
    algorithms: ['HS256'],
    userProperty: 'auth', // Propiedad del objeto request donde se almacena la información del usuario autenticado
  }).unless({
    // Rutas excluidas de la autenticación JWT
    path: ['/api/login', '/api/users/register','/api/cards/random', '/index.html', '/register.html', '/search_cards.html'],
  })
);

// Importar rutas API
import userRoutes from './routes/user.js';
import cardRoutes from './routes/card.js';
import protectedRoutes from './routes/protected.js';
import loginRouter from './routes/login.js';

// Configuración de rutas API
app.use('/api/users',  userRoutes);
app.use('/api/cards', checkRole('ADMIN', ['GET']), cardRoutes);
app.use('/api/login', loginRouter);
app.use('/api/protected', checkRole('ADMIN', ['GET']), protectedRoutes);


// Ruta específica para administradores
app.use('/api/admin', checkRole('ADMIN', ['GET']), (_req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Middleware para manejo de errores
app.use(errorHandler);

// Configuración del puerto y escucha del servidor HTTP
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
