// Todavia no esta implementado

import express from 'express';
import { createGame, getGames } from '../controllers/gameController.js';

const router = express.Router();

// Ruta para crear un nuevo juego
// Cuando se recibe una solicitud POST en la ruta raíz ("/"), se llama a la función createGame
router.post('/', createGame);

// Ruta para obtener todos los juegos
// Cuando se recibe una solicitud GET en la ruta raíz ("/"), se llama a la función getGames
router.get('/', getGames);

export default router;
