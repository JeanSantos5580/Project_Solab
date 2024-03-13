import { useEffect, useState } from 'react'

import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSolarimetricData } from '../../hooks/useSolarimeticData'
import { usePhotovoltaicDimensioning } from '../../hooks/usePhotovoltaicDimensioning'

import { FormSchema, formSchema } from '../../schemas/FormSchema'
import { SolarimetricDataSchema } from '../../schemas/SolarimetricData'

import { BarChartCustom } from '../../charts/BarChart'

import { Files } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export function SolabSizer() {
  const [states, setStates] = useState<string[]>()
  const [cities, setCities] = useState<string[]>()
  const [hsp, setHsp] = useState<number>(0)

  const [ed, setEd] = useState<number | undefined>(0)
  const [e, setE] = useState<number | undefined>(0)
  const [tpp, setTpp] = useState<number | undefined>(0)
  const [tpq, setTpq] = useState<number | undefined>(0)
  const [inverter, setInverter] = useState<number | undefined>(0)

  const { statesData, citiesData, cityData, getCitiesByState, getCityData } =
    useSolarimetricData()

  const {
    calculate_daily_energy_consumption,
    total_panels_power,
    total_panels_qtd,
    inverter_dimensioning
  } = usePhotovoltaicDimensioning()

  const { register, handleSubmit, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const selectedState = watch('state')
  const selectedCity = watch('city')
  const annual_consumption = watch('annual_consumption')
  const pannel_power = watch('pannel_power')

  const navigate = useNavigate()

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
    const ed = calculate_daily_energy_consumption(annual)
    const tpp = total_panels_power(ed, hsp)
    const tpq = total_panels_qtd(tpp, pannel_power)
    const inverter = inverter_dimensioning(tpp)
    setEd(ed)
    setE(e)
    setTpp(tpp)
    setTpq(tpq)
    setInverter(inverter)
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
      !pannel_power
    ) {
      return
    } else {
      calcVariants(annual_consumption)
    }
  }, [
    selectedState,
    selectedCity,
    annual_consumption,
    pannel_power,
    calcVariants
  ])

  const handleSubmitForm: SubmitHandler<FormSchema> = (data: FormSchema) => {
    console.log(data)
    navigate('/report')
  }

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

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Section title="Local">
          <select {...register('state')}>
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
          <select disabled={!selectedState} {...register('city')}>
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
          {cityData.length > 0 && (
            <div className="w-[500] h-80 flex justify-center">
              <BarChartCustom data={cityData} />
            </div>
          )}
        </Section>
        <Section title="Consumo">
          {/* <select {...register('connection_type')}>
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
          </select> */}
          <input
            type="text"
            placeholder="Consumo anual de energia?"
            {...register('annual_consumption', { max: 75000 })}
          />
        </Section>
        <Section title="Módulos fotovoltaicos">
          <input
            type="text"
            placeholder="Selecione a potência do módulo."
            {...register('pannel_power')}
          />
        </Section>

        {selectedState &&
          selectedCity &&
          annual_consumption &&
          pannel_power && (
            <div className="flex flex-col space-x- items-center justify-center mt-4 border border-orange-500 rounded-t-md p-4 font-semibold hover:bg-orange-200">
              <h2>Consumo diário de energia: {ed} W/dia</h2>
              <h2>Potência total de painéis: {tpp} kWp</h2>
              <h2>Quantidade total de módulos necessários: {tpq}</h2>
              <h2>Potência do inversor: {inverter} kWp</h2>
            </div>
          )}

        <div className="my-8 flex justify-center">
          <Button
            type="submit"
            icon={<Files size={24} />}
            title="Gerar relatório"
          />
        </div>
      </form>
    </main>
  )
}
