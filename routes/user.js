import express from 'express';
import { registerUser, getUserById, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import { checkRole } from '../middlewares/check_role.js';
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para obtener todos los usuarios
router.get('/', getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar un usuario
router.put('/:id',checkRole('ADMIN', ['GET']), updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', checkRole('ADMIN', ['GET']), deleteUser);


export default router;
