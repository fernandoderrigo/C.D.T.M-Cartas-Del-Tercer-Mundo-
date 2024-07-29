//prueba
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtiene el nombre de archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir archivos estáticos
// Configura la ruta para servir archivos estáticos desde el directorio 'public'
const serveStaticFiles = express.static(path.join(__dirname, '../public'));

export default serveStaticFiles;
