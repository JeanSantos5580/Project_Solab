import { Section } from '../../components/Section'
import { SolarimetricDataSchema } from '../../schemas/SolarimetricData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useSolarimetricData } from '../../hooks/useSolarimeticData'
import { SubmitHandler, get, useForm } from 'react-hook-form'
import { BarChartCustom } from '../../charts/BarChart'
import { FormSchema, formSchema } from '../../schemas/FormSchema'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { usePhotovoltaicDimensioning } from '../../hooks/usePhotovoltaicDimensioning'

export function SolabSizer() {
  const [states, setStates] = useState<string[]>()
  const [cities, setCities] = useState<string[]>()
  const [hsp, setHsp] = useState<number>(0)

  const { statesData, citiesData, cityData, getCitiesByState, getCityData } =
    useSolarimetricData()

  const {
    calc_emm,
    calc_ed,
    calc_e,
    total_panels_power,
    total_panels_qtd,
    inverter_dimensioning
  } = usePhotovoltaicDimensioning()

  const { register, handleSubmit, watch, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const conection_types = ['singlePhase', 'twoPhase', 'threePhase']

  const selectedState = watch('solarimetricData.state')
  const selectedCity = watch('solarimetricData.city')
  const annual_consumption = watch('annual_consumption')
  const selected_connection = watch('connection_type')
  const pannel_power = watch('pannel_power')

  function filterStates(statesArray: SolarimetricDataSchema[]) {
    const statesNames = statesArray.map(
      (state: SolarimetricDataSchema) => state.state
    )

    const filteredStatesNames = statesNames?.filter(
      (stateName: string, index, statesNamesArray) => {
        return statesNamesArray.indexOf(stateName) === index
      }
    )

    const filteredNormalizedStateNames = filteredStatesNames.map(
      (stateName: string) => stateName.toUpperCase()
    )

    setStates(filteredNormalizedStateNames)
  }

  function filterCities() {
    const citiesNames = citiesData.map(city => city.city)
    setCities(citiesNames)
  }

  function getHsp() {
    if (cityData.length > 0) {
      const annual: number = cityData[0].annual
      setHsp(annual)
    }
  }

  function calcVariants(annual: number) {
    const emm = calc_emm(annual)
    const ed = calc_ed(emm)
    const e = calc_e(ed, selected_connection)
    const tpp = total_panels_power(e, hsp)
    const tpq = total_panels_qtd(tpp, pannel_power)
    const inverter = inverter_dimensioning(tpp)
    console.log('tpp', tpp)
    console.log('tpq', tpq)
    console.log('inverter', inverter)
    return tpq
  }

  useEffect(() => {
    filterStates(statesData)
    filterCities()
  }, [statesData, citiesData])

  useEffect(() => {
    if (!selectedState) {
      return
    }
    getCitiesByState(selectedState)
  }, [selectedState])

  useEffect(() => {
    if (!selectedState || !selectedCity) {
      return
    } else {
      getCityData(selectedState, selectedCity)
    }
  }, [selectedState, selectedCity])

  useEffect(() => {
    if (!selectedState || !selectedCity) {
      return
    } else {
      getHsp()
    }
  }, [selectedState, selectedCity, getHsp])

  useEffect(() => {
    if (
      !selectedState ||
      !selectedCity ||
      !annual_consumption ||
      !selected_connection ||
      !pannel_power ||
      !selected_connection
    ) {
      return
    } else {
      calcVariants(annual_consumption)
    }
  }, [
    selectedState,
    selectedCity,
    annual_consumption,
    selected_connection,
    pannel_power,
    selected_connection,
    calcVariants
  ])

  return (
    <main>
      <h1 className="mb-8 text-center font-bold text-3xl text-orange-600">
        Solab Sizer
      </h1>
      <div className="px-4 mb-8">
        <small>
          Com a ferramenta <b>Solab Sizer</b> você consegue ter um vislumbre do
          sistema ideal para a sua residência. Vamos começar?
        </small>
      </div>

      <form onSubmit={() => {}}>
        <Section title="Local">
          <select {...register('solarimetricData.state')}>
            <option
              value=""
              disabled
              selected
              defaultValue=""
              className="disabled:text-gray-300"
            >
              Selecione um estado
            </option>
            {states?.map((state, key) => (
              <option key={key} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            disabled={!selectedState}
            {...register('solarimetricData.city')}
          >
            <option
              value=""
              disabled
              selected
              defaultValue=""
              className="disabled:text-gray-300"
            >
              Selecione um município
            </option>
            {cities?.map((state, key) => (
              <option key={key} value={state}>
                {state}
              </option>
            ))}
          </select>
          {cityData ? (
            <div className="w-[500] h-80 flex justify-center">
              <BarChartCustom data={cityData} />
            </div>
          ) : (
            ''
          )}
        </Section>
        <Section title="Consumo">
          <select {...register('connection_type')}>
            <option
              value=""
              disabled
              selected
              defaultValue=""
              className="disabled:text-gray-300"
            >
              Selecione seu tipo de ligação
            </option>
            {conection_types?.map((connection_type, key) => (
              <option key={key} value={connection_type}>
                {connection_type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Consumo anual de energia?"
            {...register('annual_consumption')}
          />
        </Section>
        <Section title="Módulos fotovoltaicos">
          <input
            type="text"
            placeholder="Selecione a potência do módulo."
            {...register('pannel_power')}
          />
        </Section>
        <button type="button">Gerar</button>
      </form>
    </main>
  )
}
