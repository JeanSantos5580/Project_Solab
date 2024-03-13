export const usePhotovoltaicDimensioning = () => {
  const calculate_daily_energy_consumption = (annual_consumption: number) => {
    const dailyConsumption = annual_consumption / 365
    return Number(dailyConsumption.toFixed(2)) // W
  }

  const total_panels_power = (
    daily_energy: number | undefined,
    sunlight_hours: number
  ) => {
    if (daily_energy) {
      const totalPanelsPower =
        daily_energy / ((sunlight_hours / 1000) * 0.762) // kWp
      return Number(totalPanelsPower.toFixed(2))
    }
  }

  const total_panels_qtd = (
    total_panels_power: number | undefined,
    panel_power: number
  ) => {
    if (total_panels_power) {
      return Math.ceil(total_panels_power / (panel_power / 1000)) // number
    }
  }

  const inverter_dimensioning = (total_panels_power: number | undefined) => {
    if (total_panels_power) {
      const totalInverterPower = 0.8 * total_panels_power //kwp
      return Number(totalInverterPower.toFixed(2))
    }
  }

  return {
    calculate_daily_energy_consumption,
    total_panels_power,
    total_panels_qtd,
    inverter_dimensioning
  }
}
