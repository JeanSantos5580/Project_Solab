import { Section } from '../../components/Section'
import {
  SolarimetricDataSchema,
  solarimetricDataSchema
} from '../../schemas/SolarimetricData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useSolarimetricData } from '../../hooks/useSolarimeticData'
import { useForm } from 'react-hook-form'
import { BarChartCustom } from '../../charts/BarChart'

export function SolabSizer() {
  const [states, setStates] = useState<string[]>()
  const [cities, setCities] = useState<string[]>()

  const { statesData, citiesData, cityData, getCitiesByState, getCityData } =
    useSolarimetricData()

  const { register, watch, reset } = useForm<SolarimetricDataSchema>({
    resolver: zodResolver(solarimetricDataSchema)
  })

  const selectedState = watch('state')
  const selectedCity = watch('city')

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
      reset({
        state: '',
        city: ''
      })
    }
  }, [selectedState, selectedCity])

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

      <form>
        <Section title="Local">
          <select
            className="w-full flex items-center rounded-lg h-12 px-2 border border-orange-600 cursor-pointer text-gray-400 focus: outline-none focus:ring focus:ring-orange-400"
            {...register('state')}
          >
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
            className="w-full flex items-center rounded-lg h-12 px-2 border border-orange-600 cursor-pointer text-gray-400 focus: outline-none focus:ring focus:ring-orange-400"
            disabled={!selectedState}
            {...register('city')}
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
      {/* <Section title="Consumo">
        <SelectInput placeholder="Tipo de ligação." data={states} />
        <Input type="number" placeholder="Consumo anual de energia?" />
      </Section> */}
     {/*  <Section title="Módulos fotovoltaicos">
        <SelectInput placeholder="Selecione um fabricante." data={states} />
        <SelectInput
          placeholder="Selecione o modelo do módulo."
          data={states}
        />
      </Section>
      <Section title="Posicionamento do Módulo">
        <Input type="number" placeholder="Inclinação dos módulos (º)." />
        <Input type="number" placeholder="Orientação dos módulos (º)." />
      </Section>
      <Section title="Inversor">
        <SelectInput placeholder="Fabricante." data={states} />
        <Button
          title="Determinar melhor configuração."
          icon={<Rocket size={24} />}
        />
      </Section> */}
      </form>
    </main>
  )
}
