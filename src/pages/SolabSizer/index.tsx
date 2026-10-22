import { zodResolver } from '@hookform/resolvers/zod'
import { Files } from '@phosphor-icons/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import {
  calculateDimensioning,
  DimensioningResult
} from '../../features/sizer/calculations'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useSolarimetricData } from '../../hooks/useSolarimetricData'
import { FormSchema, formSchema } from '../../schemas/FormSchema'

const PdfViewer = lazy(() =>
  import('../../components/PdfViewer/pdfViewer').then(module => ({
    default: module.PdfViewer
  }))
)

const BarChartCustom = lazy(() =>
  import('../../components/BarChart').then(module => ({
    default: module.BarChartCustom
  }))
)

type ReportData = {
  result: DimensioningResult
  form: FormSchema
}

function formatValue(value: number | null, unit: string): string {
  return value === null ? '—' : `${value} ${unit}`
}

export function SolabSizer() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const {
    states,
    cities,
    cityData,
    statesLoading,
    citiesLoading,
    cityLoading,
    error,
    getCitiesByState,
    getCityData,
    clearCityData,
    clearLocation
  } = useSolarimetricData()

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit'
  })

  const selectedState = watch('state')
  const selectedCity = watch('city')

  const clearReport = () => {
    setReport(null)
    setSubmitError(null)
  }

  useEffect(() => {
    resetField('city')
    setReport(null)

    if (selectedState) {
      void getCitiesByState(selectedState)
    } else {
      clearLocation()
    }
  }, [selectedState, getCitiesByState, clearLocation, resetField])

  useEffect(() => {
    if (selectedState && selectedCity) {
      void getCityData(selectedState, selectedCity)
    } else {
      clearCityData()
    }
  }, [selectedState, selectedCity, getCityData, clearCityData])

  const handleSubmitForm: SubmitHandler<FormSchema> = data => {
    if (!cityData) {
      setSubmitError(
        'Selecione um município e aguarde o carregamento dos dados solarimétricos.'
      )
      return
    }

    const result = calculateDimensioning({
      annualConsumption: data.annual_consumption,
      hsp: cityData.annual,
      panelPower: data.pannel_power
    })

    setSubmitError(null)
    setReport({ result, form: data })
  }

  const isSubmitDisabled = statesLoading || citiesLoading || cityLoading

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

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleSubmitForm)} className="mb-16">
        <Section
          title="Local"
          info={{
            first: 'Estado. Ex.: Amapá.',
            second: 'Município. Ex.: Macapá.'
          }}
        >
          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-semibold">
              Estado
            </label>
            <select
              id="state"
              {...register('state', { onChange: clearReport })}
              disabled={statesLoading}
              aria-invalid={errors.state ? true : undefined}
            >
              <option value="">
                {statesLoading
                  ? 'Carregando estados...'
                  : 'Selecione um estado'}
              </option>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-semibold">
              Município
            </label>
            <select
              id="city"
              {...register('city', { onChange: clearReport })}
              disabled={!selectedState || citiesLoading || cities.length === 0}
              aria-invalid={errors.city ? true : undefined}
            >
              <option value="">
                {citiesLoading
                  ? 'Carregando municípios...'
                  : 'Selecione um município'}
              </option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {cityLoading && (
            <p className="text-sm text-gray-600">
              Carregando dados do município...
            </p>
          )}

          {cityData && (
            <div className="animate-fadeIn w-full max-w-[500px] h-80 flex justify-center">
              <Suspense
                fallback={
                  <p className="text-sm text-gray-600">Carregando gráfico...</p>
                }
              >
                <BarChartCustom data={cityData} />
              </Suspense>
            </div>
          )}
        </Section>

        <Section
          title="Consumo"
          info={{
            first: 'Calculado pela soma dos consumos dos últimos 12 meses.',
            second: 'Geralmente o talão de energia traz essa informação.'
          }}
        >
          <div className="space-y-2">
            <label
              htmlFor="annual_consumption"
              className="block text-sm font-semibold"
            >
              Consumo anual de energia
            </label>
            <input
              id="annual_consumption"
              type="text"
              inputMode="numeric"
              placeholder="Consumo anual de energia (kWh)"
              {...register('annual_consumption', { onChange: clearReport })}
              aria-invalid={errors.annual_consumption ? true : undefined}
            />
            {errors.annual_consumption && (
              <p className="text-sm text-red-600">
                {errors.annual_consumption.message}
              </p>
            )}
          </div>
        </Section>

        <Section
          title="Módulos fotovoltaicos"
          info={{
            first: 'Selecione um valor desejado de potência para o painel.',
            second: 'Em caso de dúvida na escolha, recomenda-se o de 550 Wp.'
          }}
        >
          <div className="space-y-2">
            <label
              htmlFor="pannel_power"
              className="block text-sm font-semibold"
            >
              Potência do módulo
            </label>
            <select
              id="pannel_power"
              {...register('pannel_power', { onChange: clearReport })}
              aria-invalid={errors.pannel_power ? true : undefined}
            >
              <option value="">Selecione a potência do módulo</option>
              <option value="335">335 Wp</option>
              <option value="340">340 Wp</option>
              <option value="405">405 Wp</option>
              <option value="450">450 Wp</option>
              <option value="460">460 Wp</option>
              <option value="470">470 Wp</option>
              <option value="530">530 Wp</option>
              <option value="550">550 Wp (Sugestão de escolha)</option>
              <option value="555">555 Wp</option>
              <option value="560">560 Wp</option>
              <option value="580">580 Wp</option>
              <option value="585">585 Wp</option>
            </select>
            {errors.pannel_power && (
              <p className="text-sm text-red-600">
                {errors.pannel_power.message}
              </p>
            )}
          </div>
        </Section>

        <div className="my-8 flex flex-col items-center gap-3">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            icon={<Files size={24} />}
            title="Gerar relatório"
          />
          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}
        </div>

        {report && (
          <>
            <div className="animate-fadeIn flex flex-col items-center mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
              <h2 className="w-full text-left text-lg sm:text-2xl mb-4">
                PROJETO
              </h2>
              <h2 className="w-full text-left text-sm sm:text-base">
                Consumo médio diário:{' '}
                <b>{formatValue(report.result.dailyConsumption, 'kWh/dia')}</b>
              </h2>
              <h2 className="w-full text-left text-sm sm:text-base">
                Consumo médio mensal:{' '}
                <b>
                  {formatValue(report.result.monthlyConsumption, 'kWh/mês')}
                </b>
              </h2>
              <h2 className="w-full text-left text-sm sm:text-base">
                Consumo médio anual:{' '}
                <b>{report.form.annual_consumption} kWh/ano</b>
              </h2>
              <h2 className="w-full text-left text-sm sm:text-base">
                Geração média mensal estimada:{' '}
                <b>{formatValue(report.result.monthlyGeneration, 'kWh/mês')}</b>
              </h2>
              <h2 className="w-full text-left text-sm sm:text-base">
                Geração média anual estimada:{' '}
                <b>{formatValue(report.result.annualGeneration, 'kWh/ano')}</b>
              </h2>
            </div>

            <div className="flex flex-col justify-between sm:flex-row sm:gap-10">
              <div className="animate-fadeIn flex flex-col items-center w-full mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
                <h2 className="w-full text-left text-lg sm:text-2xl mb-4">
                  MÓDULOS FOTOVOLTAICOS
                </h2>
                <h2 className="w-full text-left text-sm sm:text-base">
                  Potência do módulo: <b>{report.form.pannel_power} Wp</b>
                </h2>
                <h2 className="w-full text-left text-sm sm:text-base">
                  Potência total de painéis:{' '}
                  <b>{formatValue(report.result.totalPanelsPower, 'kWp')}</b>
                </h2>
                <h2 className="w-full text-left text-sm sm:text-base">
                  Quantidade de módulos:{' '}
                  <b>{report.result.panelsQuantity ?? '—'}</b>
                </h2>
              </div>
              <div className="animate-fadeIn flex flex-col items-center w-full mt-4 mb-8 border-4 border-double border-orange-500 rounded-md p-4 font-semibold hover:bg-orange-200">
                <h2 className="w-full text-left text-lg sm:text-2xl mb-4">
                  INVERSOR
                </h2>
                <h2 className="w-full text-left text-sm sm:text-base">
                  Potência do inversor:{' '}
                  <b>{formatValue(report.result.inverterPower, 'kWp')}</b>
                </h2>
                <h2 className="w-full text-left text-sm sm:text-base">
                  Quantidade: <b>1</b>
                </h2>
              </div>
            </div>

            {isDesktop ? (
              <div className="w-full">
                <Suspense
                  fallback={
                    <p className="text-sm text-gray-600">
                      Carregando visualização do PDF...
                    </p>
                  }
                >
                  <PdfViewer
                    state={report.form.state}
                    city={report.form.city}
                    monthConsumption={report.result.monthlyConsumption}
                    annualConsumption={report.form.annual_consumption}
                    monthGeneration={report.result.monthlyGeneration}
                    annualGeneration={report.result.annualGeneration}
                    panelPower={report.form.pannel_power}
                    totalPanels={report.result.panelsQuantity}
                    inverterPower={report.result.inverterPower}
                  />
                </Suspense>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                A visualização do PDF está disponível em telas maiores.
              </p>
            )}
          </>
        )}
      </form>
    </main>
  )
}
