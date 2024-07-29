import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { loginSchema } from '../schemas/validationSchema.js';

const prisma = new PrismaClient();


// Función para manejar el inicio de sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validar los datos de inicio de sesión utilizando Joi
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Buscar el usuario por correo electrónico en la base de datos
    const user = await prisma.user.findUnique({ where: { email: email }, include: { role: true } });
    
    // Si el usuario no existe, devolver un error
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Comparar la contraseña proporcionada con la contraseña hash almacenada
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generar un token JWT con el ID del usuario y su rol
    const token = jwt.sign(
      { userId: user.id, role: user.role.roleName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolver el usuario y el token JWT
    res.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role.roleName }, token });
  } catch (err) {
    // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
    res.status(500).json({ error: 'Something went wrong' });
  }
};
