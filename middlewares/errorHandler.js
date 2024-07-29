// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  // Imprime el stack trace del error en la consola
  console.error(err.stack);

  // Maneja errores de autenticación (token no válido)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Maneja errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Maneja cualquier otro error
  res.status(500).json({ error: 'Something went wrong!' });
};

export default errorHandler;
