/**
 * Dimensioning rules preserved from the original TCC implementation.
 * Changing these constants changes the project results and must be
 * validated against the documented methodology.
 */
export const PERFORMANCE_RATIO = 0.762
export const DAYS_PER_YEAR = 365
export const MONTHS_PER_YEAR = 12
export const DAYS_PER_MONTH = 30
export const INVERTER_FACTOR = 0.8

export type DimensioningInput = {
  annualConsumption: number
  hsp: number
  panelPower: number
}

export type DimensioningResult = {
  dailyConsumption: number | null
  monthlyConsumption: number | null
  totalPanelsPower: number | null
  panelsQuantity: number | null
  inverterPower: number | null
  monthlyGeneration: number | null
  annualGeneration: number | null
}

function round2(value: number): number {
  return Number(value.toFixed(2))
}

function isValidPositive(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

export function calculateDimensioning({
  annualConsumption,
  hsp,
  panelPower
}: DimensioningInput): DimensioningResult {
  if (!isValidPositive(annualConsumption)) {
    return {
      dailyConsumption: null,
      monthlyConsumption: null,
      totalPanelsPower: null,
      panelsQuantity: null,
      inverterPower: null,
      monthlyGeneration: null,
      annualGeneration: null
    }
  }

  const dailyConsumption = round2(annualConsumption / DAYS_PER_YEAR)
  const monthlyConsumption = round2(annualConsumption / MONTHS_PER_YEAR)

  if (!isValidPositive(hsp) || !isValidPositive(panelPower)) {
    return {
      dailyConsumption,
      monthlyConsumption,
      totalPanelsPower: null,
      panelsQuantity: null,
      inverterPower: null,
      monthlyGeneration: null,
      annualGeneration: null
    }
  }

  const totalPanelsPower = dailyConsumption / ((hsp / 1000) * PERFORMANCE_RATIO)
  const roundedTotalPanelsPower = round2(totalPanelsPower)

  const panelsQuantity = Math.ceil(
    roundedTotalPanelsPower / (panelPower / 1000)
  )
  const inverterPower = round2(roundedTotalPanelsPower * INVERTER_FACTOR)

  const dailyGeneration =
    roundedTotalPanelsPower * (hsp / 1000) * PERFORMANCE_RATIO
  const monthlyGeneration = round2(dailyGeneration * DAYS_PER_MONTH)
  const annualGeneration = round2(monthlyGeneration * MONTHS_PER_YEAR)

  return {
    dailyConsumption,
    monthlyConsumption,
    totalPanelsPower: roundedTotalPanelsPower,
    panelsQuantity,
    inverterPower,
    monthlyGeneration,
    annualGeneration
  }
}
