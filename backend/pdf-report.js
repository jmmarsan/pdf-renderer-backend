// backend/pdf-report.mjs
import PDFDocument from 'pdfkit';

export function buildReportPdf({ data, reportName = 'Alfreo' }) {
  const doc = new PDFDocument({ size: 'A4', margin: 0 });

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const topMargin = 50;
  const bottomMargin = 50;
  const leftMargin = 20;
  const rightMargin = 20;
  const headerHeight = 100;
  const leftMarginCabecera = leftMargin + 15;

  // CABECERA
  doc.save();
  doc
    .rect(
      leftMargin,
      topMargin,
      pageWidth - leftMargin - rightMargin,
      headerHeight
    )
    .fill('#F0F0F0');

  doc
    .moveTo(leftMargin, topMargin + headerHeight)
    .lineTo(pageWidth - rightMargin, topMargin + headerHeight)
    .lineWidth(2)
    .stroke('#34495E');

  doc.fontSize(11).fillColor('#000000');

  const headerTopMargin = topMargin + 30;
  const lineHeight = 15;

  doc.font('Helvetica-Bold');
  doc.text('Nombre del informe:', leftMarginCabecera, headerTopMargin);
  doc.font('Helvetica');
  doc.text(reportName, leftMarginCabecera, headerTopMargin + lineHeight);

  doc.font('Helvetica-Bold');
  doc.text('Fecha de inicio:', leftMarginCabecera, headerTopMargin + lineHeight * 2);
  doc.font('Helvetica');
  doc.text('2025-12-05', leftMarginCabecera, headerTopMargin + lineHeight * 3);

  const rightColumn = pageWidth / 2;
  doc.font('Helvetica-Bold');
  doc.text('Intervalo de tiempo:', rightColumn, headerTopMargin);
  doc.font('Helvetica');
  doc.text('- -', rightColumn, headerTopMargin + lineHeight);

  doc.font('Helvetica-Bold');
  doc.text('Fecha final:', rightColumn, headerTopMargin + lineHeight * 2);
  doc.font('Helvetica');
  doc.text('- -', rightColumn, headerTopMargin + lineHeight * 3);

  doc.fontSize(9).fillColor('#646464');
  doc.text(
    'Alcanzado el límite de grabaciones. Por favor, ajuste los filtros para reducir los resultados de búsqueda.',
    leftMarginCabecera,
    headerTopMargin + lineHeight * 4 + 5,
    { width: pageWidth - 2 * leftMargin }
  );
  doc.restore();

  // TABLA
  let tableTop = topMargin + headerHeight + 15;
  const rowHeight = 18;

  const columns = [
    { header: 'File ID',  key: 'fileId',   width: 190 },
    { header: 'Origen',   key: 'origen',   width: 90  },
    { header: 'Destino',  key: 'destino',  width: 90 },
    { header: 'Fecha',    key: 'fecha',    width: 120 },
    { header: 'Duración', key: 'duracion', width: 80  },
  ];

  doc.save();
  doc
    .rect(leftMargin, tableTop, pageWidth - leftMargin - rightMargin, rowHeight)
    .fill('#34495E');
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10);

  let x = leftMargin;
  columns.forEach(col => {
    doc.text(col.header, x + 4, tableTop + 4, { width: col.width - 8 });
    x += col.width;
  });
  doc.restore();

  let y = tableTop + rowHeight;
  doc.font('Helvetica').fontSize(9).fillColor('#000000');

  data.forEach(item => {
    if (y + rowHeight > pageHeight - bottomMargin - 60) {
      addFooter(doc, {
        pageWidth,
        pageHeight,
        leftMargin,
        rightMargin,
        bottomMargin,
        reportName,
      });

      doc.addPage();
      y = topMargin;

      doc.save();
      doc
        .rect(leftMargin, y, pageWidth - leftMargin - rightMargin, rowHeight)
        .fill('#34495E');
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10);

      let x2 = leftMargin;
      columns.forEach(col => {
        doc.text(col.header, x2 + 4, y + 4, { width: col.width - 8 });
        x2 += col.width;
      });
      doc.restore();

      y += rowHeight;
      doc.font('Helvetica').fontSize(9).fillColor('#000000');
    }

    let xRow = leftMargin;
    const row = [
      String(item.fileId),
      item.origen,
      item.destino,
      item.fecha,
      item.duracion,
    ];

    row.forEach((cell, iCol) => {
      doc.text(cell, xRow + 4, y + 4, { width: columns[iCol].width - 8 });
      xRow += columns[iCol].width;
    });

    y += rowHeight;
  });

  addFooter(doc, {
    pageWidth,
    pageHeight,
    leftMargin,
    rightMargin,
    bottomMargin,
    reportName,
  });

  doc.end();
  return doc;
}

function addFooter(
  doc,
  {
    pageWidth,
    pageHeight,
    leftMargin,
    rightMargin,
    bottomMargin,
    reportName,
  }
) {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  const reportNameWithDate = `${reportName} (${formattedDateTime})`;

  doc
    .moveTo(leftMargin, pageHeight - bottomMargin)
    .lineTo(pageWidth - rightMargin, pageHeight - bottomMargin)
    .lineWidth(1)
    .stroke('#34495E');

  doc.fontSize(9).fillColor('#646464');
  doc.text(reportNameWithDate, leftMargin, pageHeight - bottomMargin + 10);

  const pageText = `${doc.page.number}`;
  const pageTextWidth = doc.widthOfString(pageText);
  doc.text(
    pageText,
    pageWidth - rightMargin - pageTextWidth,
    pageHeight - bottomMargin + 10
  );
}
