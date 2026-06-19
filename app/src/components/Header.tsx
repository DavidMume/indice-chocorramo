import { useLanguage } from '../i18n/LanguageContext'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍫</span>
          <span className="font-bold text-gray-900 text-lg">
            {t.hero.title}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label={t.nav.label} className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#colombia" className="hover:text-gray-900 transition-colors">{t.nav.colombia}</a>
            <a href="#australia" className="hover:text-gray-900 transition-colors">{t.nav.australia}</a>
            <a href="#metodologia" className="hover:text-gray-900 transition-colors">{t.nav.methodology}</a>
            <a href="#fuentes" className="hover:text-gray-900 transition-colors">{t.nav.sources}</a>
          </nav>
          <div className="flex rounded-full border border-gray-300 bg-gray-50 p-1" role="group" aria-label={t.language.label}>
            {(['es', 'en'] as const).map((code) => (
              <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={language === code}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${language === code ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                {code === 'es' ? t.language.spanish : t.language.english}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
