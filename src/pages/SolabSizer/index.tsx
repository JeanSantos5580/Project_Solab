import { Rocket } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Footer } from '../../components/Footer'

const states = ['Amapá', 'Acre', 'Roraima']

export function SolabSizer() {
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
        <Input placeholder="Selecione o estado." data={states} />
        <Input placeholder="Selecione o município." data={states} />
      </Section>
      <Section title="Consumo">
        <Input placeholder="Tipo de ligação." data={states} />
        <Input placeholder="Consumo anual de energia?" data={states} />
      </Section>
      <Section title="Módulos fotovoltaicos">
        <Input placeholder="Selecione um fabricante." data={states} />
        <Input placeholder="Selecione o modelo do módulo." data={states} />
      </Section>
      <Section title="Posicionamento do Módulo">
        <Input placeholder="Inclinação dos módulos (º)." data={states} />
        <Input placeholder="Orientação dos módulos (º)." data={states} />
      </Section>
      <Section title="Inversor">
        <Input placeholder="Fabricante." data={states} />
        <Button
          title="Determinar melhor configuração."
          icon={<Rocket size={24} />}
        />
      </Section>
      <Footer />
    </main>
  )
}
