import type { CountryIndex, YearSnapshot } from '../types'
import { formatNumber, formatPct } from '../utils/calculations'
import DataBadge from './DataBadge'
import { useLanguage } from '../i18n/LanguageContext'

interface YearCardProps {
  snapshot: YearSnapshot
  profile: CountryIndex['profile']
  isBaseYear: boolean
}

function YearCard({ snapshot, profile, isBaseYear }: YearCardProps) {
  const { t } = useLanguage()
  const period = profile.wagePeriod === 'monthly' ? t.profile.month : t.profile.week
  const priceNeedsVerification = snapshot.needsVerification.includes('productPrice')
  const wageNeedsVerification = snapshot.needsVerification.includes('minWage')

  return (
    <div
      className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-2 ${
        isBaseYear ? 'border-gray-200' : 'border-blue-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl font-extrabold text-gray-900">{snapshot.year}</span>
        {isBaseYear && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
            {t.cards.baseYear}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {t.cards.minimumWage} / {period}
          </p>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
              {profile.currencySymbol}{formatNumber(snapshot.minWage)}
            </span>
            <span className="text-sm text-gray-500">{profile.currency}</span>
          </div>
          {wageNeedsVerification && (
            <DataBadge confidence="medium" sourceType="official" needsVerification className="mt-1" />
          )}
          {!wageNeedsVerification && (
            <DataBadge confidence="high" sourceType="official" className="mt-1" />
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {t.cards.productPrice} {profile.productName}
          </p>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
              {profile.currencySymbol}{formatNumber(snapshot.productPrice)}
            </span>
            <span className="text-sm text-gray-500">{profile.currency}</span>
          </div>
          <DataBadge
            confidence={priceNeedsVerification ? 'low' : 'medium'}
            sourceType="estimate"
            needsVerification={priceNeedsVerification}
            className="mt-1"
          />
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {profile.productEmoji} {profile.productName}s {t.cards.purchasable}
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">
            {formatNumber(snapshot.productsPurchasable, 0)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {t.cards.per} {period}
          </p>
        </div>
      </div>
    </div>
  )
}

interface ComparisonCardsProps {
  countryData: CountryIndex
  baseYear: number
  currentYear: number
}

export default function ComparisonCards({
  countryData,
  baseYear,
  currentYear,
}: ComparisonCardsProps) {
  const { profile, snapshots, calculations } = countryData
  const { t } = useLanguage()
  const period = profile.wagePeriod === 'monthly' ? t.profile.month : t.profile.week
  const base = snapshots[baseYear]
  const current = snapshots[currentYear]

  const isNegative = calculations.purchasingPowerChangePct < 0

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <YearCard snapshot={base} profile={profile} isBaseYear />
        <YearCard snapshot={current} profile={profile} isBaseYear={false} />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500 mb-1 leading-tight">{t.cards.nominalWage}</p>
          <p className="text-base sm:text-xl font-bold text-green-600">
            {formatPct(calculations.nominalWageGrowthPct)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 leading-tight">{t.cards.productPrice} {profile.productName}</p>
          <p className="text-base sm:text-xl font-bold text-orange-500">
            {formatPct(calculations.productPriceGrowthPct)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 leading-tight">{t.cards.purchasingPower}</p>
          <p className={`text-base sm:text-xl font-bold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
            {formatPct(calculations.purchasingPowerChangePct)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 leading-tight">{t.cards.inflation}</p>
          <p className="text-base sm:text-xl font-bold text-gray-700">
            {formatPct(calculations.accumulatedInflationPct)}
            <span className="text-xs font-normal text-gray-400 ml-1">~</span>
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {t.cards.note.replace('{product}', profile.productName).replace('{period}', period)}
      </p>
    </div>
  )
}
