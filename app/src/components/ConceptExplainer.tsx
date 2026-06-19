interface ConceptCardProps {
  title: string
  emoji: string
  description: string
  example: string
  exampleLabel: string
}

function ConceptCard({ title, emoji, description, example, exampleLabel }: ConceptCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border-l-4 border-blue-400">
        <span className="font-semibold">{exampleLabel} </span>{example}
      </div>
    </div>
  )
}

export default function ConceptExplainer() {
  const { t } = useLanguage()
  const emojis = ['💵', '🛒', '📊']
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            {t.concepts.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t.concepts.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.concepts.cards.map((card, index) => <ConceptCard key={card.title} emoji={emojis[index]} {...card} exampleLabel={t.concepts.example} />)}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-amber-900 mb-1">{t.concepts.warningTitle}</p>
              <p className="text-amber-800 text-sm">
                {t.concepts.warning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import { useLanguage } from '../i18n/LanguageContext'
