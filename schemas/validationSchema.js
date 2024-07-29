import Joi from 'joi';

// Esquema de validación para el inicio de sesión
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Esquema de validación para el registro de usuarios
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required()
});

// Esquema de validación para la actualización de usuarios
export const updateSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string(),
  password: Joi.string().min(6)
});
