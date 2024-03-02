import { Rocket } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { Section } from '../../components/Section'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import {
  SolarimetricDataSchema,
  solarimetricDataSchema
} from '../../schemas/SolarimetricData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'

export function SolabSizer() {
  const [states, setStates] = useState<SolarimetricDataSchema>()
  const { register } = useForm<SolarimetricDataSchema>({
    resolver: zodResolver(solarimetricDataSchema)
  })

  async function getStates() {
    await api.get('/').then(response => {
      const state = response.data.map(
        (state: SolarimetricDataSchema) => state.state
      )

      const filteredStates = state.filter((stateName: string) => {
        if (!state[stateName]) {
          state[stateName] = true
          return true
        }
        return false
      })

      const filteredNormalizedStateNames = filteredStates.map(
        (stateName: string) => stateName.toUpperCase()
      )

      console.log(filteredNormalizedStateNames)

      setStates(filteredNormalizedStateNames)
    })
  }
  
  useEffect(() => {
    getStates()
  }, [])

  return (
    <main className="overflow-y-auto">
      <h1 className="mb-8 text-center font-bold text-3xl text-orange-600">
        Solab Sizer
      </h1>
      <div className="px-4 mb-8">
        <small>
          Com a ferramenta <b>Solab Sizer</b> você consegue ter um vislumbre do
          sistema ideal para a sua residência. Vamos começar?
        </small>
      </div>

      <Section title="Local">
        <SelectInput
          placeholder="Selecione o estado."
          data={states}
          {...register('state')}
        />
        {/* <SelectInput placeholder="Selecione o município." data={states} /> */}
      </Section>
      {/* <Section title="Consumo">
        <SelectInput placeholder="Tipo de ligação." data={states} />
        <Input type="number" placeholder="Consumo anual de energia?" />
      </Section>
      <Section title="Módulos fotovoltaicos">
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
    </main>
  )
}
