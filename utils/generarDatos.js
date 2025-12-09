/*
[
  {
    "fileId": "alwaysacr-org-mrf011296752904303276...63002",
    "origen": "34625560419",
    "destino": "34625560302",
    "fecha": "2025-11-12T16:13:16",
    "duracion": "4s"
  }
]
*/

export default function generarDatos(cantidad = 5000) {
    const datos = [];
  
    for (let i = 0; i < cantidad; i++) {
      const id = `alwaysacr-org-mrf${Math.floor(
        1_000_000_000000000 + Math.random() * 9_000_000_000000000
      )}`;
  
      const origen = "34625560419";
      const destino = "34625560302";
  
      // fecha pseudo-aleatoria en noviembre 2025
      const dia = String(1 + Math.floor(Math.random() * 30)).padStart(2, "0");
      const hora = String(Math.floor(Math.random() * 24)).padStart(2, "0");
      const min = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      const seg = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      const fecha = `2025-11-${dia}T${hora}:${min}:${seg}`;
  
      const duracionSeg = 1 + Math.floor(Math.random() * 600); // hasta 10 min
      const duracion = `${duracionSeg}s`;
  
      datos.push({
        fileId: id,
        origen,
        destino,
        fecha,
        duracion,
      });
    }
  
    return datos;
  }
