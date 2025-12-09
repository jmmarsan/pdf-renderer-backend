import express from 'express';

const app = express();
const PORT = 3000;

app.get('/data', (req, res) => {
  // URL: /data?q=1000
   const { q } = req.query;  // q = 'node', limit = '10'
  res.send(`Buscando: ${q}`);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});