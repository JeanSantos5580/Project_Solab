import { describe, expect, it } from 'vitest'
import { calculateDimensioning } from './calculations'

describe('calculateDimensioning', () => {
  it('calculates the expected values for a known case', () => {
    const result = calculateDimensioning({
      annualConsumption: 3650,
      hsp: 4620,
      panelPower: 550
    })

    expect(result).toEqual({
      dailyConsumption: 10,
      monthlyConsumption: 304.17,
      totalPanelsPower: 2.84,
      panelsQuantity: 6,
      inverterPower: 2.27,
      monthlyGeneration: 299.94,
      annualGeneration: 3599.28
    })
  })

  it('returns only consumption values when hsp is invalid', () => {
    const result = calculateDimensioning({
      annualConsumption: 3650,
      hsp: 0,
      panelPower: 550
    })

    expect(result.dailyConsumption).toBe(10)
    expect(result.monthlyConsumption).toBe(304.17)
    expect(result.totalPanelsPower).toBeNull()
    expect(result.panelsQuantity).toBeNull()
    expect(result.inverterPower).toBeNull()
    expect(result.monthlyGeneration).toBeNull()
    expect(result.annualGeneration).toBeNull()
  })

  it('returns all nulls when annual consumption is not positive', () => {
    const result = calculateDimensioning({
      annualConsumption: 0,
      hsp: 4620,
      panelPower: 550
    })

    expect(Object.values(result).every(value => value === null)).toBe(true)
  })

  it('returns all nulls when panel power is not positive', () => {
    const result = calculateDimensioning({
      annualConsumption: 3650,
      hsp: 4620,
      panelPower: 0
    })

    expect(result.dailyConsumption).toBe(10)
    expect(result.totalPanelsPower).toBeNull()
    expect(result.panelsQuantity).toBeNull()
  })
})
