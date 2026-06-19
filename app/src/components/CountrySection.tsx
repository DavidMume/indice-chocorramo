import type { CountryIndex } from '../types'
import { BASE_YEAR, CURRENT_YEAR } from '../data'
import ComparisonCards from './ComparisonCards'
import PurchasingPowerChart from '../charts/PurchasingPowerChart'
import WageVsPriceChart from '../charts/WageVsPriceChart'
import { useLanguage } from '../i18n/LanguageContext'

interface CountrySectionProps {
  countryData: CountryIndex
}

export default function CountrySection({ countryData }: CountrySectionProps) {
  const { profile } = countryData
  const { t } = useLanguage()
  const period = profile.wagePeriod === 'monthly' ? t.profile.month : t.profile.week

  const bgStyle =
    profile.id === 'colombia'
      ? 'bg-gradient-to-br from-yellow-50 to-blue-50'
      : 'bg-gradient-to-br from-blue-50 to-red-50'

  return (
    <section id={profile.id} className={`py-16 px-4 ${bgStyle}`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{profile.flag}</span>
            <h2 className="text-3xl font-extrabold text-gray-900">{profile.name}</h2>
          </div>
          <p className="text-gray-600 text-lg">
            {t.country.reference}{' '}
            <span className="font-semibold">
              {profile.productEmoji} {profile.productName}
            </span>
            {' '}— {t.country.wage} {period} {t.country.inCurrency} {profile.currency}
          </p>
        </div>

        <ComparisonCards
          countryData={countryData}
          baseYear={BASE_YEAR}
          currentYear={CURRENT_YEAR}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-1">
              {profile.productEmoji} {t.country.purchasableTitle} {period}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {t.country.purchasableQuestion.replace('{product}', profile.productName)}
            </p>
            <PurchasingPowerChart countryData={countryData} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-1">
              {t.country.indexTitle}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {t.country.indexQuestion}
            </p>
            <WageVsPriceChart countryData={countryData} />
          </div>
        </div>
      </div>
    </section>
  )
}
