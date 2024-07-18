import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import Joi from 'joi';

// Controlador para crear un juego
export const createGame = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    score: Joi.number().integer().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { userId, score } = req.body;

  try {
    const game = await prisma.game.create({
      data: {
        userId,
        score
      }
    });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controlador para obtener todos los juegos
export const getGames = async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
};
