export function formatCurrency(value, decimal = 0, locale = "id-ID") {
  if (typeof value !== "number" && typeof value !== "bigint") {
    throw new Error("Value must be a number or bigint.");
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
    useGrouping: true, // Memastikan pemisah ribuan digunakan
  }).format(value);
}
