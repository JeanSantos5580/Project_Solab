'use client'

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'
import { SolarimetricDataSchema } from '../schemas/SolarimetricData'

type Props = {
  data: SolarimetricDataSchema[]
}
export function BarChartCustom({ data }: Props) {
  const cityData = data[0]
  if (!cityData) {
    return (
      <div className="font-bold text-orange-600">
        👆Busque por sua cidade.👆
      </div>
    )
  }

  const irradiation = [
    { month: 'jan', Gd: cityData.jan / 1000 },
    { month: 'fev', Gd: cityData.feb / 1000 },
    { month: 'mar', Gd: cityData.mar / 1000 },
    { month: 'abr', Gd: cityData.apr / 1000 },
    { month: 'may', Gd: cityData.may / 1000 },
    { month: 'jun', Gd: cityData.jun / 1000 },
    { month: 'jul', Gd: cityData.jul / 1000 },
    { month: 'ago', Gd: cityData.aug / 1000 },
    { month: 'set', Gd: cityData.sep / 1000 },
    { month: 'out', Gd: cityData.oct / 1000 },
    { month: 'nov', Gd: cityData.nov / 1000 },
    { month: 'dez', Gd: cityData.dec / 1000 }
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={300} height={40} data={irradiation}>
        <XAxis dataKey={'month'} />
        <YAxis
          label={{
            value: 'Irradiação média diária (kWh/m2xdia)',
            angle: -90,
            textAnchor: 'middle',
            style: {
              fontSize: '12px'
            }
          }}
        />
        <CartesianGrid />
        <Tooltip />
        <Legend />
        <Bar dataKey="Gd" fill="#ff9c1c" />
      </BarChart>
    </ResponsiveContainer>
  )
}
