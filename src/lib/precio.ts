/**
 * Extrae el valor numérico de un precio ya formateado para mostrar
 * ("$8,950,000 MXN" → 8950000, "$4,000 MXN POR M²" → 4000) para poder
 * ordenar tarjetas de menor a mayor. Sin precio captado, va al final.
 */
export function precioANumero(texto?: string): number {
  if (!texto) return Infinity;
  const limpio = texto.replace(/[^0-9.]/g, "");
  const n = parseFloat(limpio);
  return Number.isFinite(n) ? n : Infinity;
}
