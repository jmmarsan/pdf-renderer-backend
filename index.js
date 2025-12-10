import express from 'express';
import compression from 'compression';
import generarDatos from './utils/generarDatos.js';
import buildReportName from './utils/buildReportName.js';
import { buildReportPdf } from './backend/pdf-report.js';


const app = express();
// habilita gzip para todas las respuestas
app.use(compression());
const PORT = 3000;

app.get('/pdf', (req, res) => {

  //pdf?q=1000
  const { q } = req.query;
  const data = generarDatos(q);
  const reportName = buildReportName('Alfreo');

  const doc = buildReportPdf({ data, reportName });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${reportName}.pdf"`
  );

  // Importante: pipear el stream a la respuesta
  doc.pipe(res);
});


app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const html = `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>PDF Renderer Backend</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 2rem; line-height: 1.5; }
    code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    h1, h2 { color: #333; }
    .example-link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.6rem 1rem;
      background: #34495e;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
    }
    .example-link:hover {
      background: #2c3e50;
    }
  </style>
</head>
<body>
  <h1>PDF Renderer Backend</h1>

  <p>Este servicio expone un endpoint para generar un informe en PDF.</p>

  <h2>Endpoint principal</h2>
  <p>
    Usa el endpoint <code>/pdf</code> con el parámetro de consulta <code>q</code>:
  </p>

  <pre><code>GET /pdf?q=1000</code></pre>

  <p>
    Donde <code>q=&lt;cantidad&gt;</code> indica el número de elementos que se quieren incluir en el PDF.
  </p>

  <p>
    Ejemplo con 1000 elementos:
  </p>
  <a class="example-link" href="/pdf?q=1000">
    Generar PDF de ejemplo (q=1000)
  </a>
</body>
</html>
  `.trim();

  res.send(html);
});




app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});