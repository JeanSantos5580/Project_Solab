import { Input } from '../../components/Input'
import { Section } from '../../components/Section'

const states = ['Amapá', 'Acre', 'Roraima']

export function SolabSizer() {
  return (
    <div>
      <Section title="Local">
        <Input placeholder='Selecione o estado.' data={states}/>
      </Section>
      <Section title="Consumo">
        <Input placeholder='Selecione o estado.' data={states}/>
      </Section>
      <Section title="Módulos fotovoltaicos">
        <Input placeholder='Selecione o estado.' data={states}/>
      </Section>
      <Section title="Posicionamento do Módulo">
        <Input placeholder='Selecione o estado.' data={states}/>
      </Section>
      <Section title="Inversor">
        <Input placeholder='Selecione o estado.' data={states}/>
      </Section>
    </div>
  )
}
