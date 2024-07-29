import Joi from 'joi';

export const createBlackCardSchema = Joi.object({
  text: Joi.string().min(1).required()
});

export const createWhiteCardSchema = Joi.object({
  text: Joi.string().min(1).required()
});

export const updateBlackCardSchema = Joi.object({
  text: Joi.string().min(1).optional()
});

export const updateWhiteCardSchema = Joi.object({
  text: Joi.string().min(1).optional()
});
