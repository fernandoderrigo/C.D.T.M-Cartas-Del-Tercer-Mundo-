// Esto es para un futuro
import Joi from 'joi';

export const createGameSchema = Joi.object({
  userId: Joi.number().integer().required(),
  score: Joi.number().integer().required()
});

export const updateGameSchema = Joi.object({
  score: Joi.number().integer().required()
});
