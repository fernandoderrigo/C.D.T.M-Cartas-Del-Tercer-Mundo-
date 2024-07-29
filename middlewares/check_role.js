import dotenv from 'dotenv';

dotenv.config();

// Middleware para verificar el rol
export const checkRole = (requiredRole, allowedMethods = []) => {
  return (req, res, next) => {
    if (!req.auth || !req.auth.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = req.auth.role;

    // Si el rol del usuario es 'admin', permite todo sin restricciones adicionales
    if (userRole === 'admin') {
      return next();
    }

    // Si el rol del usuario es 'player', solo permite el método GET
    if (userRole === 'player') {
      if (req.method !== 'GET') {
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed for player role`,
        });
      }
      return next();
    }

    // Verifica si el rol del usuario es el requerido
    if (userRole !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have the required role",
      });
    }

    // Verifica si el método de la solicitud está permitido
    if (allowedMethods.length && !allowedMethods.includes(req.method)) {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`,
      });
    }

    next();
  };
};
