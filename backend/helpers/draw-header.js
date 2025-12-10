export default function drawHeader(doc, {
  pageWidth,
  lineHeight,
  headerHeight,
  top,
  left,
  right,
  leftHeader,
  reportName,
}) {
  doc
    .rect(
      left,
      top,
      pageWidth - left - right,
      headerHeight
    )
    .fill('#F0F0F0');

  doc
    .moveTo(left, top + headerHeight)
    .lineTo(pageWidth - right, top + headerHeight)
    .lineWidth(2)
    .stroke('#34495E');

  doc.fontSize(11).fillColor('#000000');

  const headerTop = top + 20;

  doc.font('Helvetica-Bold');
  doc.text('Nombre del informe:', leftHeader, headerTop);
  doc.font('Helvetica');
  doc.text(reportName, leftHeader, headerTop + lineHeight);

  doc.font('Helvetica-Bold');
  doc.text('Fecha de inicio:', leftHeader, headerTop + lineHeight * 2);
  doc.font('Helvetica');
  doc.text('2025-12-05', leftHeader, headerTop + lineHeight * 3);

  const rightColumn = pageWidth / 2;

  doc.font('Helvetica-Bold');
  doc.text('Intervalo de tiempo:', rightColumn, headerTop);
  doc.font('Helvetica');
  doc.text('- -', rightColumn, headerTop + lineHeight);

  doc.font('Helvetica-Bold');
  doc.text('Fecha final:', rightColumn, headerTop + lineHeight * 2);
  doc.font('Helvetica');
  doc.text('- -', rightColumn, headerTop + lineHeight * 3);

  /*doc.fontSize(9).fillColor('#646464');
  doc.text(
    'Alcanzado el límite de grabaciones. Por favor, ajuste los filtros para reducir los resultados de búsqueda.',
    leftHeader,
    headerTop + lineHeight * 4 + 5,
    { width: pageWidth - 2 * left }
  );*/
}