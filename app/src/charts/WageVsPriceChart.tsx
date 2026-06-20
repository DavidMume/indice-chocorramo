import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { CountryIndex } from '../types'
import { BASE_YEAR, CURRENT_YEAR } from '../data'
import { useLanguage } from '../i18n/LanguageContext'

interface Props {
  countryData: CountryIndex
}

const CustomTooltip = ({
  active,
  payload,
  label,
  baseLabel,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  baseLabel: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="tabular-nums">
          {p.name}: {p.value.toFixed(1)}
        </p>
      ))}
      {label === CURRENT_YEAR.toString() && (
        <p className="text-gray-400 text-xs mt-1">{baseLabel}</p>
      )}
    </div>
  )
}

export default function WageVsPriceChart({ countryData }: Props) {
  const { t } = useLanguage()
  const { profile, calculations } = countryData

  const data = [
    {
      year: BASE_YEAR.toString(),
      [t.chart.wage]: 100, [t.chart.price]: 100, [t.chart.cpi]: 100,
    },
    {
      year: CURRENT_YEAR.toString(),
      [t.chart.wage]: 100 + calculations.nominalWageGrowthPct,
      [t.chart.price]: 100 + calculations.productPriceGrowthPct,
      [t.chart.cpi]: 100 + calculations.accumulatedInflationPct,
    },
  ]

  const wageColor = profile.id === 'colombia' ? '#003893' : '#1e3a8a'
  const priceColor = '#dc2626'
  const ipcColor = '#6b7280'

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 13, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={44}
          domain={[80, 'auto']}
        />
        <ReferenceLine y={100} stroke="#e5e7eb" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip baseLabel={t.chart.base} />} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 6 }}
          formatter={(value) =>
            value === t.chart.price ? `${t.chart.price} ${profile.productName}` : value
          }
        />
        <Line
          type="monotone"
          dataKey={t.chart.wage}
          stroke={wageColor}
          strokeWidth={2.5}
          dot={{ r: 5, fill: wageColor }}
          activeDot={{ r: 7 }}
        />
        <Line
          type="monotone"
          dataKey={t.chart.price}
          stroke={priceColor}
          strokeWidth={2.5}
          dot={{ r: 5, fill: priceColor }}
          activeDot={{ r: 7 }}
        />
        <Line
          type="monotone"
          dataKey={t.chart.cpi}
          stroke={ipcColor}
          strokeWidth={1.5}
          strokeDasharray="5 5"
          dot={{ r: 4, fill: ipcColor }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
