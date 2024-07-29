import express from 'express';

// Función para configurar el análisis del cuerpo de las solicitudes
const requestBodyParser = (app) => {
  // Middleware para analizar cuerpos de solicitudes en formato JSON
  app.use(express.json());

  // Middleware para analizar cuerpos de solicitudes con datos codificados en URL
  app.use(express.urlencoded({ extended: true }));
};

export default requestBodyParser;
