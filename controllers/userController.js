import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { registerSchema, updateSchema } from '../schemas/validationSchema.js';

const prisma = new PrismaClient();

// Controlador para el registro de usuarios
export const registerUser = async (req, res) => {
  // Validación de los datos de la solicitud
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Obtener el rol predeterminado de 'player'
    const role = await prisma.role.findUnique({ where: { roleName: 'player' } });

    // Crear un nuevo usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role: {
          connect: { id: role.id }
        }
      }
    });
    res.status(201).json({ user });
  } catch (err) {
    console.error('Error en el registro de usuario:', err);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
};

// Controlador para ver un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar usuario por ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
  // Validación de los datos de la solicitud
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { id } = req.params;
  const { email, username, password } = req.body;

  try {
    const data = {};

    // Actualizar solo los campos proporcionados
    if (email) data.email = email;
    if (username) data.username = username;
    if (password) data.password = await bcrypt.hash(password, 10);

    // Actualizar el usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data
    });
    res.json({ updatedUser });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar relaciones en tablas dependientes
    await prisma.gamePlayer.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.play.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.score.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.gameHistory.deleteMany({ where: { userId: parseInt(id) } });

    // Eliminar el usuario
    await prisma.user.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (err) {
    console.error('Error al obtener todos los usuarios:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
