// Esto es para un futuro



import { PrismaClient } from '@prisma/client';
import { createGameSchema, updateGameSchema } from '../schemas/gameValidationSchema';

const prisma = new PrismaClient();

// Controlador para crear un juego
export const createGame = async (req, res) => {
  const { error } = createGameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { userId, score } = req.body;

  try {
    const game = await prisma.game.create({
      data: { userId, score }
    });
    res.status(201).json(game);
  } catch (err) {
    console.error('Error al crear el juego:', err);
    res.status(500).json({ error: 'Error al crear el juego.' });
  }
};

// Controlador para obtener todos los juegos
export const getAllGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: { user: true }
    });
    res.status(200).json(games);
  } catch (err) {
    console.error('Error al obtener los juegos:', err);
    res.status(500).json({ error: 'Error al obtener los juegos.' });
  }
};

// Controlador para obtener un juego por ID
export const getGameById = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado.' });
    }

    res.status(200).json(game);
  } catch (err) {
    console.error('Error al obtener el juego:', err);
    res.status(500).json({ error: 'Error al obtener el juego.' });
  }
};

// Controlador para actualizar un juego
export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { error } = updateGameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { score } = req.body;

  try {
    const updatedGame = await prisma.game.update({
      where: { id: parseInt(id) },
      data: { score }
    });
    res.status(200).json(updatedGame);
  } catch (err) {
    console.error('Error al actualizar el juego:', err);
    res.status(500).json({ error: 'Error al actualizar el juego.' });
  }
};

// Controlador para eliminar un juego
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGame = await prisma.game.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json(deletedGame);
  } catch (err) {
    console.error('Error al eliminar el juego:', err);
    res.status(500).json({ error: 'Error al eliminar el juego.' });
  }
};
