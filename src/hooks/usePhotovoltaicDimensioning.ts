export const usePhotovoltaicDimensioning = () => {
  const calc_emm = (ec: number) => {
    return ec / 12
  }

  const calc_ed = (emm: number) => {
    return emm / 30
  }

  const calc_e = (ed: number, connection_type: string) => {
    let cd
    switch (connection_type) {
      case 'singlePhase':
        cd = 30
        break
      case 'twoPhase':
        cd = 50
        break
      case 'threePhase':
        cd = 100
        break
      default:
        'Valor não aceito'
        break
    }

    if (cd) {
      const e = ed - cd
      return e
    } else {
      console.log('error')
    }
  }

  const total_panels_power = (e: number | undefined, hsp: number) => {
    if (e) {
      return e / ((hsp / 1000) * 0.762)
    }
  }

  const total_panels_qtd = (
    total_panels_power: number | undefined,
    panel_power: number
  ) => {
    if (total_panels_power) {
      return Math.ceil(total_panels_power / (panel_power / 1000))
    }
  }

  const inverter_dimensioning = (total_panels_power: number | undefined) => {
    if (total_panels_power) {
      return 1.26 * total_panels_power
    }
  }

  return {
    calc_emm,
    calc_ed,
    calc_e,
    total_panels_power,
    total_panels_qtd,
    inverter_dimensioning
  }
}
