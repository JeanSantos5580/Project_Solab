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
import { PdfViewer } from '../../components/PdfViewer/pdfViewer'

export function SolabSizer() {
  const [states, setStates] = useState<string[]>()
  const [cities, setCities] = useState<string[]>()
  const [hsp, setHsp] = useState<number>(0)
  const [showReport, setShowReport] = useState(false)

  const [ed, setEd] = useState<number | undefined>(0)
  const [mae, setMae] = useState<number | undefined>(0)
  const [monthGeneration, setMonthGeneration] = useState<number | undefined>(0)
  const [annualGeneration, setAnnualGeneration] = useState<number | undefined>(0)
  const [e, setE] = useState<number | undefined>(0)
  const [tpp, setTpp] = useState<number | undefined>(0)
  const [tpq, setTpq] = useState<number | undefined>(0)
  const [inverter, setInverter] = useState<number | undefined>(0)

  const { statesData, citiesData, cityData, getCitiesByState, getCityData } =
    useSolarimetricData()

  const {
    calculate_daily_energy_consumption,
    calculate_month_average_energy_consumption,
    calculate_month_generation,
    calculate_anual_generation,
    total_panels_power,
    total_panels_qtd,
    inverter_dimensioning
  } = usePhotovoltaicDimensioning()

  const { register, handleSubmit, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const selectedState = watch('state')
  const selectedCity = watch('city')
  const pannel_power = watch('pannel_power')
  const annual_consumption = watch('annual_consumption')

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

  useEffect(() => {
    if (!pannel_power || !hsp || pannel_power) {
      return;
    }

  calcVariants(annual_consumption);

  }, [pannel_power, hsp, annual_consumption]);

  function calcVariants(annual: number) {
    const ed = calculate_daily_energy_consumption(annual)
    const mae = calculate_month_average_energy_consumption(annual)
    const tpp = total_panels_power(ed, hsp)
    const tpq = total_panels_qtd(tpp, pannel_power)
    const inverter = inverter_dimensioning(tpp)
    setEd(ed)
    setMae(mae)
    setE(e)
    setTpp(tpp)
    setTpq(tpq)
    setInverter(inverter)
  }

  function projectInfos(tpp: number | undefined, hsp: number) {
    const monthGeneration = calculate_month_generation(tpp, hsp)
    const annualGeneration = calculate_anual_generation(monthGeneration)
    setMonthGeneration(monthGeneration)
    setAnnualGeneration(annualGeneration)
  }

  function calcVariantsAndShowReport(annual: number) {
    calcVariants(annual)
    setShowReport(true)
  }

  useEffect(() => {
    if (tpp !== undefined && hsp) {
      projectInfos(tpp, hsp); // Chama somente quando tpp e hsp tiverem valores atualizados
    }
  }, [tpp, hsp]);

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
    setCities([])
  }, [selectedState])

useEffect(() => {
  setShowReport(false);
}, [pannel_power, watch('annual_consumption')]); //

  const handleSubmitForm: SubmitHandler<FormSchema> = (data: FormSchema) => {
    calcVariantsAndShowReport(data.annual_consumption)
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

      <form onSubmit={handleSubmit(handleSubmitForm)} className="mb-16">
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
            <div className="animate-fadeIn w-[500] h-80 flex justify-center">
              <BarChartCustom data={cityData} />
            </div>
          )}
        </Section>
        <Section title="Consumo">
          <input
            type="text"
            placeholder="Consumo anual de energia (kWh)"
            {...register('annual_consumption', { max: 75000 })}
          />
        </Section>
        <Section title="Módulos fotovoltaicos">
          <select {...register('pannel_power')}>
            <option value="" disabled selected defaultValue="">
              Selecione a potência do módulo
            </option>
            <option value="335">335 Wp</option>
            <option value="340">340 Wp</option>
            <option value="405">405 Wp</option>
            <option value="450">450 Wp</option>
            <option value="460">460 Wp</option>
            <option value="470">470 Wp</option>
            <option value="530">530 Wp</option>
            <option value="550">550 Wp</option>
            <option value="555">555 Wp</option>
            <option value="560">560 Wp</option>
            <option value="580">580 Wp</option>
            <option value="585">585 Wp</option>
          </select>
        </Section>

        <div className="my-8 flex justify-center">
          <Button
            type="submit"
            onClick={() => setShowReport(!showReport)}
            icon={<Files size={24} />}
            title="Gerar relatório"
          />
        </div>

        {showReport && (
          <>
          <div className="animate-fadeIn flex flex-col space-x- items-center mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
            <h2 className="w-full text-left text-2xl mb-4">
              PROJETO
            </h2>
            <h2 className="w-full text-left">
              Consumo médio diário: <b>{ed} kWh/dia</b>
            </h2>
            <h2 className="w-full text-left">
              Consumo médio mensal: <b>{mae} kWh/mês</b>
            </h2>
            <h2 className="w-full text-left">
              Consumo médio anual: <b>{annual_consumption} kWh/ano</b>
            </h2>
            <h2 className="w-full text-left">
              Geração média mensal estimada: <b>{monthGeneration} kWh/mês</b>
            </h2>
            <h2 className="w-full text-left">
              Geração média anual estimada: <b>{annualGeneration} kWh/mês</b>
            </h2>
          </div>
          <div className='flex justify-between gap-10'>
            <div className="animate-fadeIn flex flex-col items-center w-full mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
            <h2 className="w-full text-left text-2xl mb-4">
              MÓDULOS FOTOVOLTAICOS
            </h2>
            <h2 className="w-full text-left">
              Potência do módulo: <b>{pannel_power} Wp</b>
            </h2>
            <h2 className="w-full text-left">
              Potência total de painéis: <b>{tpp} kWp</b>
            </h2>
            <h2 className="w-full text-left">
              Quantidade mínima de módulos necessários: <b>{tpq}</b>
            </h2>
            </div>
            <div className="animate-fadeIn flex flex-col items-center w-full mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
              <h2 className="w-full text-left text-2xl mb-4">
                INVERSOR
              </h2>
              <h2 className="w-full text-left">
                Potência do inversor: <b>{inverter} kWp</b>
              </h2>
              <h2 className="w-full text-left">
                Quantidade: <b>1</b>
              </h2>
            </div>
          </div>
          <div>
          <PdfViewer 
          state={selectedState}
          city={selectedCity}
          monthConsumption={mae}
          annualConsumption={annual_consumption}
          monthGeneration={monthGeneration}
          annualGeneration={annualGeneration}
          panelPower={pannel_power}
          totalPanels={tpq}
          inverterPower={inverter}
          />
          </div>
          </>
        )}
      </form>
    </main>
  )
}
