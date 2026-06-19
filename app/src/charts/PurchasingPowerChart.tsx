import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
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
  productName,
  wagePeriod,
  locale,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  productName: string
  wagePeriod: string
  locale: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      <p className="text-gray-600">
        {Math.floor(payload[0].value).toLocaleString(locale)}{' '}
        {productName}s / {wagePeriod}
      </p>
    </div>
  )
}

export default function PurchasingPowerChart({ countryData }: Props) {
  const { language, t } = useLanguage()
  const { profile, snapshots } = countryData

  const data = [
    {
      year: BASE_YEAR.toString(),
      value: snapshots[BASE_YEAR].productsPurchasable,
    },
    {
      year: CURRENT_YEAR.toString(),
      value: snapshots[CURRENT_YEAR].productsPurchasable,
    },
  ]

  const baseColor = profile.id === 'colombia' ? '#003893' : '#00008B'
  const currentColor =
    data[1].value < data[0].value ? '#dc2626' : '#16a34a'

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 13, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          content={
            <CustomTooltip
              productName={profile.productName}
              wagePeriod={profile.wagePeriod === 'monthly' ? t.profile.month : t.profile.week}
              locale={language === 'es' ? 'es-CO' : 'en-AU'}
            />
          }
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={80}>
          <LabelList
            dataKey="value"
            position="top"
            formatter={(v: number) => Math.floor(v).toLocaleString(language === 'es' ? 'es-CO' : 'en-AU')}
            style={{ fontSize: 12, fontWeight: 700 }}
          />
          {data.map((_, index) => (
            <Cell key={index} fill={index === 0 ? baseColor : currentColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
