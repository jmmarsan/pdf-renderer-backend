export default function drawTableHeader(doc, { tableRowHeight, tableColumns, pageWidth, left, right, y }) {
  doc
    .rect(left, y, pageWidth - left - right, tableRowHeight)
    .fill('#34495E');

  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10);

  let x = left;
  tableColumns.forEach(col => {
    doc.text(col.header, x + 4, y + 4, { width: col.width - 8 });
    x += col.width;
  });
}