import { useLanguage } from '../i18n/LanguageContext'
import { originalStoryCopy } from '../i18n/originalStoryTranslations'

export default function HeroSection() {
  const { language, setLanguage } = useLanguage()
  const t = originalStoryCopy(language)
  return (
    <header className="original-hero" id="inicio">
      <nav className="original-nav original-shell" aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}>
        <a className="original-brand" href="#inicio">Índice <strong>Chocorramo</strong></a>
        <div className="original-nav-links">
          <a href="#historia">{t.nav[0]}</a><a href="#colombia">{t.nav[1]}</a><a href="#metodologia">{t.nav[2]}</a><a href="#fuentes">{t.nav[3]}</a>
        </div>
        <div className="original-language" role="group" aria-label={language === 'es' ? 'Idioma' : 'Language'}>
          {(['es','en'] as const).map((code) => <button key={code} onClick={() => setLanguage(code)} aria-pressed={language === code}>{code.toUpperCase()}</button>)}
        </div>
      </nav>
      <div className="original-hero-content original-shell">
        <div className="original-hero-copy">
          <p className="original-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="original-lede">{t.lede}</p>
          <div className="original-hero-actions"><a className="original-button primary" href="#historia">{t.start}</a><a className="original-button secondary" href="#metodologia">{t.calculate}</a></div>
          <p className="original-disclaimer">{t.disclaimer}</p>
        </div>
        <picture className="original-hero-product"><img src="/assets/chocorramo-product-transparent.png" alt="Chocorramo" width="512" height="512" /></picture>
        <div className="original-hero-stats" aria-label="Summary"><div><strong>16</strong><span>{t.stats[0]}</span></div><div><strong>4</strong><span>{t.stats[1]}</span></div><div><strong>100%</strong><span>{t.stats[2]}</span></div></div>
      </div>
    </header>
  )
}
