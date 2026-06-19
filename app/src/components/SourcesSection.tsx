interface SourceRowProps {
  flag: string
  name: string
  url: string
  type: string
  confidence: 'high' | 'medium' | 'low'
  notes: string
  qualityLabel: string
}

const confidenceBadge: Record<string, string> = {
  high: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-orange-100 text-orange-700',
}

function SourceRow({ flag, name, url, type, confidence, notes, qualityLabel }: SourceRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-2 text-sm">{flag}</td>
      <td className="py-3 px-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          {name}
        </a>
      </td>
      <td className="py-3 px-2">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {type}
        </span>
      </td>
      <td className="py-3 px-2">
        <span className={`text-xs px-2 py-0.5 rounded-full ${confidenceBadge[confidence]}`}>
          {qualityLabel}
        </span>
      </td>
      <td className="py-3 px-2 text-xs text-gray-500">{notes}</td>
    </tr>
  )
}

export default function SourcesSection() {
  const { t } = useLanguage()
  const meta = [
    { flag: '🇨🇴', url: 'https://www.funcionpublica.gov.co/', confidence: 'high' as const },
    { flag: '🇨🇴', url: 'https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc', confidence: 'high' as const },
    { flag: '🇨🇴', url: 'https://www.dane.gov.co/', confidence: 'low' as const },
    { flag: '🇦🇺', url: 'https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages', confidence: 'high' as const },
    { flag: '🇦🇺', url: 'https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia', confidence: 'high' as const },
    { flag: '🇦🇺', url: 'https://www.woolworths.com.au/', confidence: 'low' as const },
  ]
  return (
    <section id="fuentes" className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t.sources.title}</h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          {t.sources.intro}
        </p>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"></th>
                {t.sources.headers.map((header) => <th key={header} className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">{header}</th>)}
              </tr>
            </thead>
            <tbody>{meta.map((source, index) => {
              const row = t.sources.rows[index]
              return <SourceRow key={source.url} {...source} {...row} qualityLabel={t.sources.quality[source.confidence]} />
            })}</tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">{t.sources.limitationsTitle}</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              {t.sources.limitations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">{t.sources.contributeTitle}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {t.sources.contribute}
            </p>
            <a
              href="https://github.com/DavidMume/indice-chocorramo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
            >
              {t.sources.repository}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
import { useLanguage } from '../i18n/LanguageContext'
