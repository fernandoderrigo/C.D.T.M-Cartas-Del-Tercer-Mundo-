import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const prisma = new PrismaClient();

// Función para agregar una carta negra
export const createBlackCard = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'El texto de la carta negra es requerido.' });
  }
  try {
    const newBlackCard = await prisma.blackCard.create({ data: { text } });
    res.status(201).json(newBlackCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la carta negra.' });
  }
};

// Función para agregar una carta blanca
export const createWhiteCard = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'El texto de la carta blanca es requerido.' });
  }
  try {
    const newWhiteCard = await prisma.whiteCard.create({ data: { text } });
    res.status(201).json(newWhiteCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la carta blanca.' });
  }
};

// Función para eliminar una carta negra
export const deleteBlackCard = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlackCard = await prisma.blackCard.delete({ where: { id: parseInt(id) } });
    res.status(200).json(deletedBlackCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la carta negra.' });
  }
};

// Función para eliminar una carta blanca
export const deleteWhiteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWhiteCard = await prisma.whiteCard.delete({ where: { id: parseInt(id) } });
    res.status(200).json(deletedWhiteCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la carta blanca.' });
  }
};

// Función para actualizar una carta negra
export const updateBlackCard = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'El texto de la carta negra es requerido.' });
  }
  try {
    const updatedBlackCard = await prisma.blackCard.update({
      where: { id: parseInt(id) },
      data: { text }
    });
    res.status(200).json(updatedBlackCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar la carta negra.' });
  }
};

// Función para actualizar una carta blanca
export const updateWhiteCard = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'El texto de la carta blanca es requerido.' });
  }
  try {
    const updatedWhiteCard = await prisma.whiteCard.update({
      where: { id: parseInt(id) },
      data: { text }
    });
    res.status(200).json(updatedWhiteCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar la carta blanca.' });
  }
};

// Función para obtener todas las cartas negras
export const getAllBlackCards = async (req, res) => {
  try {
    const blackCards = await prisma.blackCard.findMany();
    res.status(200).json(blackCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cartas negras.' });
  }
};

// Función para obtener una carta negra por id
export const getBlackCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const blackCard = await prisma.blackCard.findUnique({ where: { id: parseInt(id) } });
    if (!blackCard) {
      return res.status(404).json({ message: 'Carta negra no encontrada.' });
    }
    res.status(200).json(blackCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la carta negra.' });
  }
};

// Función para obtener todas las cartas blancas
export const getAllWhiteCards = async (req, res) => {
  try {
    const whiteCards = await prisma.whiteCard.findMany();
    res.status(200).json(whiteCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cartas blancas.' });
  }
};

// Función para obtener una carta blanca por id
export const getWhiteCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const whiteCard = await prisma.whiteCard.findUnique({ where: { id: parseInt(id) } });
    if (!whiteCard) {
      return res.status(404).json({ message: 'Carta blanca no encontrada.' });
    }
    res.status(200).json(whiteCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la carta blanca.' });
  }
};

// Función para obtener cartas aleatorias (12 en este caso)
export const getRandomCards = async (req, res) => {
  try {
    const blackCards = await prisma.blackCard.findMany();
    const whiteCards = await prisma.whiteCard.findMany();

    const allCards = [
      ...blackCards.map(card => ({ ...card, type: 'black' })),
      ...whiteCards.map(card => ({ ...card, type: 'white' }))
    ];

    const shuffledCards = allCards.sort(() => 0.5 - Math.random()).slice(0, 12);

    res.status(200).json({ cards: shuffledCards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cartas aleatorias.' });
  }
};
