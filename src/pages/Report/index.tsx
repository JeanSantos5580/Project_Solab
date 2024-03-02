import { Section } from '../../components/Section'

export function Report() {
  return (
    <main>
      <h1 className="mb-8 text-center font-bold text-3xl">
        Relatório de <b className="text-orange-600">dimensionamento.</b>
      </h1>
      <div className="px-4 mb-8">
        <small>Confira abaixo o relatório do seu sistema:</small>
      </div>
      <Section title="Relatório">
        <div className="flex-col border border-orange-500 rounded-lg p-4 space-y-4">
          <div className="flex-col">
            <h5 className="font-bold text-sm ">Energia gerada anualmente: </h5>
            <small>1</small>
          </div>
          <div className="flex-col">
            <h5 className="font-bold text-sm ">Rendimento anual específico:</h5>
            <small>2</small>
          </div>
          <div className="flex-col">
            <h5 className="font-bold text-sm ">Desempenho do sistema:</h5>
            <small>3</small>
          </div>
        </div>

        <div className="flex-col border border-orange-500 rounded-lg p-4 space-y-16">
          <div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">
                Energia gerada anualmente:{' '}
              </h5>
              <small>1</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">da qual autoconsumo:</h5>
              <small>2</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">da qual injetado:</h5>
              <small>3</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">Taxa de auto consumo:</h5>
              <small>3</small>
            </div>
          </div>

          <div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">Consumo:</h5>
              <small>3</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">coberto pelo autoconsumo:</h5>
              <small>3</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">
                coberto pela rede elétrica:
              </h5>
              <small>3</small>
            </div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">Nível de autonomia:</h5>
              <small>3</small>
            </div>
          </div>
          <div>
            <div className="flex-col">
              <h5 className="font-bold text-sm ">Emissões de CO2:</h5>
              <small>3</small>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
