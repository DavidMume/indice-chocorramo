interface FormulaProps {
  label: string
  formula: string
}

function Formula({ label, formula }: FormulaProps) {
  return (
    <div className="mb-3">
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <code className="block bg-gray-900 text-green-400 text-sm p-3 rounded-lg font-mono overflow-x-auto">
        {formula}
      </code>
    </div>
  )
}

export default function MethodologySection() {
  const { t } = useLanguage()
  const formulas = [
    'products = minimum_wage / product_price',
    'Δ_wage% = (wage_2026 / wage_2016 − 1) × 100',
    'Δ_price% = (price_2026 / price_2016 − 1) × 100',
    'Δ_power% = (products_2026 / products_2016 − 1) × 100',
    'real_wage = nominal_wage / (relative_CPI / 100)',
  ]
  return (
    <section id="metodologia" className="py-10 sm:py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">{t.methodology.title}</h2>
        <p className="text-gray-500 mb-10 max-w-2xl">
          {t.methodology.intro}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">{t.methodology.measuresTitle}</h3>
            <div className="space-y-3 text-sm text-gray-700">
              {t.methodology.measures.map((item) => <p key={item}>{item}</p>)}
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <h4 className="font-bold text-red-900 mb-2">{t.methodology.notMeasuresTitle}</h4>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                {t.methodology.notMeasures.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">{t.methodology.formulasTitle}</h3>
            {t.methodology.formulaLabels.map((label, index) => <Formula key={label} label={label} formula={formulas[index]} />)}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">
            {t.methodology.whyTitle}
          </h3>
          <p className="text-sm text-blue-800">
            {t.methodology.why}
          </p>
        </div>
      </div>
    </section>
  )
}
import { useLanguage } from '../i18n/LanguageContext'
