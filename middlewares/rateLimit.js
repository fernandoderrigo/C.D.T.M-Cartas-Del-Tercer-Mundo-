import rateLimit from 'express-rate-limit';

// Configuración del middleware de limitación de tasa de solicitudes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // Ventana de tiempo de 1 minuto (en milisegundos)
  max: 100, // Límite de 100 solicitudes por ventana de tiempo por IP
  message: 'Too many requests from this IP, please try again after 15 minutes' // Mensaje de respuesta cuando se excede el límite
});

export default limiter;
