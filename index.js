import express from 'express';
import generarDatos from './utils/generarDatos.js';

const app = express();
const PORT = 3000;

app.get('/data', (req, res) => {
  // URL: /data?q=1000
   const { q } = req.query;  // q = 'node', limit = '10'
   const data = generarDatos(q);
  res.send(data);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});