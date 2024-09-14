import { Document, Image, Page, PDFViewer, StyleSheet, Text, View, Font } from "@react-pdf/renderer";
import logo from "../../assets/logoSolab.png"
import system from "../../assets/system.png"

Font.register({ 
    family: 'Inter', 
    src: 'http://fonts.gstatic.com/s/questrial/v6/MYWJ4lYm5dbZ1UBuYox79KCWcynf_cDxXwCLxiixG1c.ttf',
    fontWeight: 'heavy'
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },

    header: {
        display: "flex",
        alignItems: "center",
        padding: 24
    },
    headerLogo: {
        width: '150px'
    },

    observation: {    
        fontSize: 10,
        color: "#c1121f",
        fontWeight: "black"
    },
    observationBox: {
        paddingHorizontal: 48,
        paddingBottom: 24,
    },

    title: {
        marginBottom: 24,
        display: "flex",
        alignItems: 'center',
    },

    textTitle: {    
        paddingBottom: 24,
        fontSize: 18,
        color: "#212529",
        fontWeight: "extrabold"
    },
    cityName: {    
        fontSize: 16,
        fontFamily: 'Inter',
        color: "#212529",
    },

    generationResultsBox: {    
        border: "1px solid #f97316",
        borderRadius: 8,
        margin: 24,
        padding: 24,
        display: 'flex',
        gap: 12,
        fontFamily: 'Inter',
        color: "#212529",
    },
    textTitleResults: {     
        fontSize: 16,
        fontFamily: 'Inter',
        color: "#212529",
    },
    textResults: {     
        fontSize: 12,
        marginBottom: 24,
        fontFamily: 'Inter',
        color: "#212529",
    },
    generationData: {   
        fontSize: 14,
        fontFamily: 'Inter',
        color: "#212529",
    },
    generationDataTitle: {   
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'Inter',
        color: "#212529",
    },
    generationDataValues: {   
        marginBottom: 12,
        fontSize: 12,
        fontFamily: 'Inter',
        color: "#212529",
    },

    equipmentListBox: {
        borderRadius: 8,
        margin: 24,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 12,
        fontFamily: 'Inter',
        color: "#212529",
    },
    equipmentList: { 
        border: "1px solid #f97316",
        display: 'flex',
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    systemImgBox: { 
        paddingLeft: 45,
        display: 'flex',
        justifyContent: 'center'
    },
    systemImg: { 
        width: 500,
        height: 400
    },
});

interface PdfViewer {
    state: string
    city: string
    monthConsumption: number | undefined
    annualConsumption: number | undefined
    monthGeneration: number | undefined
    annualGeneration: number | undefined
    panelPower: number
    totalPanels: number | undefined
    inverterPower: number | undefined
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
    inverterPower }: 
    PdfViewer) {
    return (
        <PDFViewer width={"100%"} height={"800px"}>
            <Document pageMode="fullScreen">
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image src={logo} style={styles.headerLogo}/>
                    </View>
                    <View style={styles.observationBox}>
                        <Text style={styles.observation}>OBSERVAÇÃO: Os valores obtidos por meio desta ferramenta são estimativas e podem não ter o mesmo nível de precisão dos valores obtidos por projetos desenvolvidos com ferramentas de engenharia específicas. Para resultados mais detalhados e exatos, recomenda-se a contratação de uma empresa de engenharia especializada.</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>PROPOSTA COMERCIAL DE SISTEMA DE ENERGIA SOLAR</Text>
                        <Text style={styles.cityName}>{state} - {city}</Text>
                    </View>
                    <View style={styles.generationResultsBox}>
                        <Text style={styles.textTitleResults}>PROJETO E INSTALAÇÃO</Text>
                        <Text style={styles.textResults}>As características locais da propriedade onde será feita a instalação do sistema fotovoltaico são de extrema importância para a condução do projeto. É necessário realizar um estudo a fim de se verificar a presença de características indesejáveis para a instalação do sistema no local. A ocorrência de sombreamentos nos painéis fotovoltaicos acarreta na redução da energia gerada, e, portanto, compromete a eficiência do sistema fotovoltaico. Também é importante verificar a orientação geográfica da construção para assegurar a melhor disposição dos painéis, de modo que o sistema opere de maneira otimizada.</Text>
                        <Text style={styles.generationData}>Consumo médio mensal: {monthConsumption} kWh/mês</Text>
                        <Text style={styles.generationData}>Consumo médio anual: {annualConsumption} kWh/ano</Text>
                        <Text style={styles.generationData}>Geração média mensal estimada: {monthGeneration} kWh/mês</Text>
                        <Text style={styles.generationData}>Geração média anual estimada: {annualGeneration} kWh/ano</Text>
                        
                    </View>
                    <View style={styles.equipmentListBox}>
                        <View style={styles.equipmentList}>
                            <Text style={styles.generationDataTitle}>MÓDULOS FOTOVOLTAICOS</Text>
                            <Text style={styles.generationDataValues}>Potência: {panelPower} kWp</Text>
                            <Text style={styles.generationDataValues}>Quantidade: {totalPanels}</Text>
                        </View>
                        <View style={styles.equipmentList}>
                            <Text style={styles.generationDataTitle}>INVERSOR</Text>
                            <Text style={styles.generationDataValues}>Potência: {inverterPower} kWp</Text>
                            <Text style={styles.generationDataValues}>Quantidade: 1</Text>
                        </View>
                    </View>
                </Page>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image src={logo} style={styles.headerLogo}/>
                    </View>
                    <View style={styles.observationBox}>
                        <Text style={styles.observation}>OBSERVAÇÃO: Os valores obtidos por meio desta ferramenta são estimativas e podem não ter o mesmo nível de precisão dos valores obtidos por projetos desenvolvidos com ferramentas de engenharia específicas. Para resultados mais detalhados e exatos, recomenda-se a contratação de uma empresa de engenharia especializada.</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>COMO FUNCIONA O SISTEMA</Text>
                    </View>

                    <View style={styles.systemImgBox}>
                        <Image src={system} style={styles.systemImg}/>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}