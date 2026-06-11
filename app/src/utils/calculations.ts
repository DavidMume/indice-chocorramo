/**
 * Cuántas unidades del producto se pueden comprar con el salario.
 * Usa el salario bruto mensual/semanal sin descontar impuestos.
 */
export function calcProductsPurchasable(wage: number, price: number): number {
  if (price <= 0) throw new RangeError('price must be > 0')
  return wage / price
}

/**
 * Crecimiento porcentual entre dos valores.
 * Retorna 100 si base es 0 (evita división por cero).
 */
export function calcGrowthPct(base: number, current: number): number {
  if (base === 0) return 0
  return ((current / base) - 1) * 100
}

/**
 * Cambio en poder adquisitivo medido en unidades del producto.
 * Negativo = pérdida de poder; positivo = ganancia.
 */
export function calcPurchasingPowerChange(
  productsBase: number,
  productsCurrent: number,
): number {
  return calcGrowthPct(productsBase, productsCurrent)
}

/**
 * Salario real deflactado por IPC.
 * ipcRelative: índice IPC con base del año inicial = 100
 */
export function calcRealWage(nominalWage: number, ipcRelative: number): number {
  if (ipcRelative <= 0) throw new RangeError('ipcRelative must be > 0')
  return (nominalWage / ipcRelative) * 100
}

/**
 * Formatea un número grande con separadores de miles.
 */
export function formatNumber(
  value: number,
  decimals = 0,
  locale = 'es-CO',
): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Formatea un porcentaje con signo explícito: +12.5% / -3.2%
 */
export function formatPct(value: number, decimals = 1): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}
