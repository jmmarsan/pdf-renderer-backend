// backend/pdf-report.mjs
import PDFDocument from 'pdfkit';
import drawHeader from './helpers/draw-header.js';
import drawTableHeader from './helpers/draw-table-header.js';
import addFooter from './helpers/add-footer.js';
import calculateTotalPages from '../utils/calculateTotalPages.js';

const MARGINS = {
  top: 50,
  bottom: 50,
  left: 20,
  right: 20,
};

const HEADER_HEIGHT = 100;
const LINE_HEIGHT = 18;
const TABLE_FONT_SIZE = 10;

const TABLE_ROW_HEIGHT = 20;
const TABLE_COLUMNS = [
  { header: 'File ID',  key: 'fileId',   width: 190 },
  { header: 'Origen',   key: 'origen',   width: 90  },
  { header: 'Destino',  key: 'destino',  width: 90  },
  { header: 'Fecha',    key: 'fecha',    width: 120 },
  { header: 'Duración', key: 'duracion', width: 80  },
];

export function buildReportPdf({ data, reportName = 'Alfreo' }) {
  const doc = new PDFDocument({ size: 'A4', margin: 0 });

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  let pageNumber = 1;
  const totalPages = calculateTotalPages({
    itemCount: data.length,
    pageHeight: doc.page.height,
    margins: MARGINS,
    headerHeight: HEADER_HEIGHT,
    tableRowHeight: TABLE_ROW_HEIGHT,
  });

  const { top, bottom, left, right } = MARGINS;
  const leftHeader = left + 15;
  const FOOTER_SPACE = 15; // espacio reservado para la línea + texto footer

  drawHeader(doc, {
    lineHeight: LINE_HEIGHT,
    pageWidth,
    headerHeight: HEADER_HEIGHT,
    top,
    left,
    right,
    leftHeader,
    reportName,
  });

  let tableTop = top + HEADER_HEIGHT + 15;
  let y = tableTop + TABLE_ROW_HEIGHT;

  drawTableHeader(doc, {
    tableRowHeight: TABLE_ROW_HEIGHT,
    tableColumns: TABLE_COLUMNS,
    pageWidth,
    left,
    right,
    y: tableTop,
  });

  doc.font('Helvetica').fontSize(TABLE_FONT_SIZE).fillColor('#000000');

    let rowIndex = 0; // para zebra

  for (const item of data) {
    if (y + TABLE_ROW_HEIGHT > pageHeight - bottom - FOOTER_SPACE) {
      addFooter(doc, {
        pageNumber,
        totalPages,
        pageWidth,
        pageHeight,
        left,
        right,
        bottom,
        reportName,
      });

      doc.addPage();
      pageNumber++;
      y = top;

      drawTableHeader(doc, {
        tableRowHeight: TABLE_ROW_HEIGHT,
        tableColumns: TABLE_COLUMNS,
        pageWidth,
        left,
        right,
        y,
      });

      y += TABLE_ROW_HEIGHT;
      doc.font('Helvetica').fontSize(TABLE_FONT_SIZE).fillColor('#000000');
    }

    // FONDO ZEBRA (p. ej. filas pares)
    if (rowIndex % 2 === 1) {
      doc
        .rect(left, y, pageWidth - left - right, TABLE_ROW_HEIGHT)
        .fill('#F5F5F5');       // gris claro
      doc.fillColor('#000000'); // volvemos al color de texto
    }

    let xRow = left;
    const row = [
      String(item.fileId),
      item.origen,
      item.destino,
      item.fecha,
      item.duracion,
    ];

    row.forEach((cell, iCol) => {
      const col = TABLE_COLUMNS[iCol];
      doc.text(cell, xRow + 4, y + 4, { width: col.width - 8 });
      xRow += col.width;
    });

    y += TABLE_ROW_HEIGHT;
    rowIndex++;
  }


  addFooter(doc, {
    pageNumber,
    totalPages,
    pageWidth,
    pageHeight,
    left,
    right,
    bottom,
    reportName,
  });

  doc.end();
  return doc;
}





