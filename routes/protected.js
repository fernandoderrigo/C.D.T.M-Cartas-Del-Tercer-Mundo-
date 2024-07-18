import express from 'express';
import { getProfile, getData, handleError } from '../controllers/protectedController.js';

const router = express.Router();

// Ruta protegida que devuelve la información del usuario
router.get('/profile', getProfile);

// Otra ruta protegida de ejemplo
router.get('/data', getData);

// Ruta protegida con manejo de errores
router.get('/error', handleError);

export default router;
