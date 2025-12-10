export default function calculateTotalPages(itemCount) {
  if (itemCount <= 0) return 0;      // opcional: sin elementos, 0 páginas
  if (itemCount <= 29) return 1;

  const remaining = itemCount - 29;
  const extraPages = Math.ceil(remaining / 35);

  return 1 + extraPages;
}