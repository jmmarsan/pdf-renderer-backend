// helpers/add-footer.js
export default function addFooter(
  doc,
  {
    pageNumber,
    totalPages,
    pageWidth,
    pageHeight,
    left,
    right,
    bottom,
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

  const FOOTER_OFFSET = 20; // súbelo/bájalo según lo que quieras
  const baseY = pageHeight - bottom - FOOTER_OFFSET;

  // línea del pie
  doc
    .moveTo(left, baseY)
    .lineTo(pageWidth - right, baseY)
    .lineWidth(1)
    .stroke('#34495E');

  // texto izquierda
  doc.fontSize(9).fillColor('#646464');
  doc.text(reportNameWithDate, left, baseY + 10);

  // texto derecha: "página / total"
  const pageText = String(pageNumber ?? '');
  const totalPagestText = String(totalPages ?? '');
  const pagePositionText =
    pageText === '' || totalPagestText === '' ? '' : `${pageText} / ${totalPagestText}`;

  const pageTextWidth = doc.widthOfString(pagePositionText);

  doc.text(
    pagePositionText,
    pageWidth - right - pageTextWidth,
    baseY + 10
  );
}
