import express from 'express';
import {
  createBlackCard,
  createWhiteCard,
  deleteBlackCard,
  deleteWhiteCard,
  updateBlackCard,
  updateWhiteCard,
  getAllBlackCards,
  getBlackCardById,
  getAllWhiteCards,
  getWhiteCardById,
  getRandomCards
} from '../controllers/cardController.js';

const router = express.Router();

// Rutas para cartas negras
router.post('/black', createBlackCard);
router.delete('/black/:id', deleteBlackCard);
router.put('/black/:id', updateBlackCard);
router.get('/black', getAllBlackCards);
router.get('/black/:id', getBlackCardById);

// Rutas para cartas blancas
router.post('/white', createWhiteCard);
router.delete('/white/:id', deleteWhiteCard);
router.put('/white/:id', updateWhiteCard);
router.get('/white', getAllWhiteCards);
router.get('/white/:id', getWhiteCardById);

// Ruta para obtener cartas aleatorias
router.get('/random', getRandomCards);

export default router;
