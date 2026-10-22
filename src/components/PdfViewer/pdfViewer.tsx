import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import logo from '../../assets/logoSolab.png'
import system from '../../assets/system.jpg'

// Built-in Helvetica keeps PDF generation offline and avoids remote font failures.

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 24
  },
  headerLogo: {
    width: '150px'
  },

  observation: {
    fontSize: 10,
    color: '#c1121f',
    fontWeight: 'bold'
  },
  observationBox: {
    paddingHorizontal: 48,
    paddingBottom: 24
  },

  title: {
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center'
  },

  textTitle: {
    paddingBottom: 24,
    fontSize: 18,
    color: '#212529',
    fontWeight: 'bold'
  },
  cityName: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#212529'
  },

  generationResultsBox: {
    border: '1px solid #f97316',
    borderRadius: 8,
    margin: 24,
    padding: 24,
    display: 'flex',
    gap: 12,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  textTitleResults: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  textResults: {
    fontSize: 12,
    marginBottom: 24,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  generationData: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  generationDataTitle: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  generationDataValues: {
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#212529'
  },

  equipmentListBox: {
    borderRadius: 8,
    margin: 24,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 12,
    fontFamily: 'Helvetica',
    color: '#212529'
  },
  equipmentList: {
    border: '1px solid #f97316',
    display: 'flex',
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  systemImgBox: {
    paddingLeft: 45,
    display: 'flex',
    justifyContent: 'center'
  },
  systemImg: {
    width: 500,
    height: 400
  }
})

interface PdfViewerProps {
  state: string
  city: string
  monthConsumption: number | null
  annualConsumption: number
  monthGeneration: number | null
  annualGeneration: number | null
  panelPower: number
  totalPanels: number | null
  inverterPower: number | null
}

function display(value: number | null): string {
  return value === null ? '—' : String(value)
}

export function PdfViewer({
  state,
  city,
  annualConsumption,
  monthConsumption,
  monthGeneration,
  annualGeneration,
  panelPower,
  totalPanels,
  inverterPower
}: PdfViewerProps) {
  return (
    <PDFViewer width={'100%'} height={'800px'}>
      <Document pageMode="fullScreen">
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={logo} style={styles.headerLogo} />
          </View>
          <View style={styles.observationBox}>
            <Text style={styles.observation}>
              OBSERVAÇÃO: Os valores obtidos por meio desta ferramenta são
              estimativas e podem não ter o mesmo nível de precisão dos valores
              obtidos por projetos desenvolvidos com ferramentas de engenharia
              específicas. Para resultados mais detalhados e exatos,
              recomenda-se a contratação de uma empresa de engenharia
              especializada.
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.textTitle}>
              PROPOSTA COMERCIAL DE SISTEMA DE ENERGIA SOLAR
            </Text>
            <Text style={styles.cityName}>
              {state} - {city}
            </Text>
          </View>
          <View style={styles.generationResultsBox}>
            <Text style={styles.textTitleResults}>PROJETO E INSTALAÇÃO</Text>
            <Text style={styles.textResults}>
              As características locais da propriedade onde será feita a
              instalação do sistema fotovoltaico são de extrema importância para
              a condução do projeto. É necessário realizar um estudo a fim de se
              verificar a presença de características indesejáveis para a
              instalação do sistema no local. A ocorrência de sombreamentos nos
              painéis fotovoltaicos acarreta na redução da energia gerada, e,
              portanto, compromete a eficiência do sistema fotovoltaico. Também
              é importante verificar a orientação geográfica da construção para
              assegurar a melhor disposição dos painéis, de modo que o sistema
              opere de maneira otimizada.
            </Text>
            <Text style={styles.generationData}>
              Consumo médio mensal: {display(monthConsumption)} kWh/mês
            </Text>
            <Text style={styles.generationData}>
              Consumo médio anual: {annualConsumption} kWh/ano
            </Text>
            <Text style={styles.generationData}>
              Geração média mensal estimada: {display(monthGeneration)} kWh/mês
            </Text>
            <Text style={styles.generationData}>
              Geração média anual estimada: {display(annualGeneration)} kWh/ano
            </Text>
          </View>
          <View style={styles.equipmentListBox}>
            <View style={styles.equipmentList}>
              <Text style={styles.generationDataTitle}>
                MÓDULOS FOTOVOLTAICOS
              </Text>
              <Text style={styles.generationDataValues}>
                Potência: {panelPower} Wp
              </Text>
              <Text style={styles.generationDataValues}>
                Quantidade: {display(totalPanels)}
              </Text>
            </View>
            <View style={styles.equipmentList}>
              <Text style={styles.generationDataTitle}>INVERSOR</Text>
              <Text style={styles.generationDataValues}>
                Potência: {display(inverterPower)} kWp
              </Text>
              <Text style={styles.generationDataValues}>Quantidade: 1</Text>
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={logo} style={styles.headerLogo} />
          </View>
          <View style={styles.observationBox}>
            <Text style={styles.observation}>
              OBSERVAÇÃO: Os valores obtidos por meio desta ferramenta são
              estimativas e podem não ter o mesmo nível de precisão dos valores
              obtidos por projetos desenvolvidos com ferramentas de engenharia
              específicas. Para resultados mais detalhados e exatos,
              recomenda-se a contratação de uma empresa de engenharia
              especializada.
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.textTitle}>COMO FUNCIONA O SISTEMA</Text>
          </View>

          <View style={styles.systemImgBox}>
            <Image src={system} style={styles.systemImg} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
