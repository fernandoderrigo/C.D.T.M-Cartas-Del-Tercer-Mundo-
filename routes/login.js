import express from 'express';
import { loginUser } from '../controllers/loginController.js';

const loginRouter = express.Router();

// Ruta para manejar el inicio de sesión de usuarios
// Cuando se recibe una solicitud POST en la ruta raíz ("/"), se llama a la función loginUser
loginRouter.post('/', loginUser);

export default loginRouter;
