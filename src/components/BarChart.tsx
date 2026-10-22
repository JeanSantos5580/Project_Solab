import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { SolarimetricData } from '../schemas/SolarimetricData'

type Props = {
  data: SolarimetricData | null
}

export function BarChartCustom({ data }: Props) {
  if (!data) {
    return (
      <div className="font-bold text-orange-600">
        👆Busque por sua cidade.👆
      </div>
    )
  }

  const irradiation = [
    { month: 'jan', Gd: data.jan / 1000 },
    { month: 'fev', Gd: data.feb / 1000 },
    { month: 'mar', Gd: data.mar / 1000 },
    { month: 'abr', Gd: data.apr / 1000 },
    { month: 'may', Gd: data.may / 1000 },
    { month: 'jun', Gd: data.jun / 1000 },
    { month: 'jul', Gd: data.jul / 1000 },
    { month: 'ago', Gd: data.aug / 1000 },
    { month: 'set', Gd: data.sep / 1000 },
    { month: 'out', Gd: data.oct / 1000 },
    { month: 'nov', Gd: data.nov / 1000 },
    { month: 'dez', Gd: data.dec / 1000 }
  ]

  return (
    <div className="flex flex-col w-full space-y-4">
      <small className="font-bold text-center">
        Localidade: {data.city}, {data.state}
      </small>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={irradiation}>
          <XAxis dataKey="month" />
          <YAxis
            label={{
              value: 'Irradiação média diária (kWh/m²/dia)',
              angle: -90,
              textAnchor: 'middle',
              style: { fontSize: '12px' }
            }}
          />
          <CartesianGrid />
          <Tooltip />
          <Bar dataKey="Gd" fill="#ff9c1c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
