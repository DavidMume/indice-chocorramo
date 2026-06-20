import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { originalStoryCopy } from '../i18n/originalStoryTranslations'

type Row = { period: string; metric: string; value: string }
type Point = { year: number; salary: number; estimatedPrice: number; units: number; status: 'anchor' | 'estimated' }

function csvToObjects(text: string): Row[] {
  const rows: string[][] = []; let row: string[] = []; let field = ''; let quoted = false
  for (let i = 0; i < text.length; i += 1) { const char = text[i]; const next = text[i + 1]
    if (quoted && char === '"' && next === '"') { field += '"'; i += 1 }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { row.push(field); field = '' }
    else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && next === '\n') i += 1; row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = '' }
    else field += char
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const [headers, ...body] = rows
  return body.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])) as Row)
}

function yearly(rows: Row[], metric: string, year: number) {
  const matches = rows.filter((row) => row.metric === metric && row.period.startsWith(String(year))).sort((a,b) => a.period.localeCompare(b.period))
  return matches.length ? Number(matches[matches.length - 1].value) : null
}

function scenario(rows: Row[], anchor2016: number, anchor2026: number): Point[] {
  const cpi2016 = yearly(rows, 'cpi', 2016) ?? 1; const cpi2026 = yearly(rows, 'cpi', 2026) ?? cpi2016
  const adjustment = anchor2026 / (anchor2016 * (cpi2026 / cpi2016))
  return rows.filter((row) => row.metric === 'minimum_wage').map((row) => {
    const year = Number(row.period); const salary = Number(row.value); const cpi = yearly(rows, 'cpi', year) ?? cpi2016
    const progress = (year - 2016) / 10; const cpiPrice = anchor2016 * (cpi / cpi2016)
    const estimatedPrice = year < 2016 ? cpiPrice : cpiPrice * adjustment ** progress
    return { year, salary, estimatedPrice, units: salary / estimatedPrice, status: (year === 2016 || year === 2026 ? 'anchor' : 'estimated') as Point['status'] }
  }).sort((a,b) => a.year - b.year)
}

const bills = [{value:50000,src:'/assets/bill-50000.png'},{value:20000,src:'/assets/bill-20000.png'},{value:10000,src:'/assets/bill-10000.png'},{value:5000,src:'/assets/bill-5000.png'},{value:2000,src:'/assets/bill-2000.png'},{value:1000,src:'/assets/bill-1000.png'}]

function MoneyStack({ salary, locale }: { salary: number; locale: string }) {
  let remaining = salary; const visible: Array<{src:string;value:number}> = []; const breakdown: string[] = []
  bills.forEach((bill) => { const count = Math.floor(remaining / bill.value); remaining -= count * bill.value; if (count) breakdown.push(`${count} × $${bill.value.toLocaleString(locale)}`); for(let i=0;i<Math.min(count,bill.value===50000?18:4);i+=1) visible.push(bill) })
  return <><div className="original-money-stack" title={`$${salary.toLocaleString(locale)}`}>{visible.map((bill,index)=><img key={`${bill.value}-${index}`} src={bill.src} alt="" loading="lazy" style={{'--x':`${(index*31+index*index*5)%165}px`,'--y':`${95-((index*13+index*index)%82)}px`,'--turn':`${((index*11)%19)-9}deg`,'--layer':index} as CSSProperties}/>)}</div><p className="original-money-breakdown">{breakdown.join(', ')}</p></>
}

function ChocoStack({ units, locale }: { units: number; locale: string }) {
  const visible = Math.max(12,Math.min(54,Math.round(units/9)))
  return <div className="original-choco-stack" title={`≈ ${Math.round(units).toLocaleString(locale)}`}>{Array.from({length:visible},(_,index)=><img key={index} src="/assets/chocorramo-product-mini.png" alt="" loading="lazy" style={{'--x':`${(index*47+index*index*3)%255}px`,'--y':`${72-((index*19+index*index)%70)}px`,'--turn':`${((index*17)%25)-12}deg`,'--layer':index} as CSSProperties}/>)}</div>
}

const MIN_YEAR = 2011
const MAX_YEAR = 2026

function getPresidentImage(year: number): string {
  if (year <= 2017) return '/assets/president-santos.png'
  if (year <= 2022) return '/assets/president-duque.png'
  return '/assets/president-petro.png'
}

export default function ChocorramoStory() {
  const { language, t: globalT } = useLanguage()
  const t = originalStoryCopy(language)
  const locale = language === 'es' ? 'es-CO' : 'en-US'

  const [rows, setRows] = useState<Row[]>([])
  const [year, setYear] = useState(2016)
  const [anchor2016, setAnchor2016] = useState(1100)
  const [anchor2026, setAnchor2026] = useState(3500)

  const points = useMemo(() => scenario(rows, anchor2016, anchor2026), [rows, anchor2016, anchor2026])
  const point = points.find((item) => item.year === year)

  useEffect(() => {
    fetch('/data/observations-v2.csv').then((r) => r.text()).then((text) => setRows(csvToObjects(text)))
  }, [])

  const moneyUnits = point ? 100000 / point.estimatedPrice : 0
  const inflation = yearly(rows, 'inflation', year)
  const unemployment = yearly(rows, 'unemployment_rate', year)
  const informal = yearly(rows, 'informal_share', year)

  const formatMoney = (v: number) => `$${Math.round(v).toLocaleString(locale)}`
  const formatPct = (v: number | null) => v === null ? t.noData : `${v.toLocaleString(locale, { maximumFractionDigits: 2 })}%`

  const yearIndex = year - MIN_YEAR
  const step = t.steps[yearIndex]

  return (
    <section className="original-story" id="historia" aria-labelledby="original-story-title">

      {/* ── Encabezado ───────────────────────────────────────── */}
      <div className="original-shell original-story-heading">
        <p className="original-eyebrow">{t.storyEyebrow}</p>
        <h2 id="original-story-title">{t.storyTitle}</h2>
        <p>{t.storyIntro}</p>
        <aside className="original-warning"><strong>{t.warningTitle}</strong> {t.warning}</aside>
        <aside className="original-warning context"><strong>{t.contextTitle}</strong> {t.context}</aside>
        <p className="original-context-sources">{t.sources} <a href="https://ustr.gov/trade-agreements/free-trade-agreements/colombia-tpa">TLC Colombia–EE. UU.</a>, <a href="https://www.jep.gov.co/Marco%20Normativo/Normativa_v2/01%20ACUERDOS/N01.pdf">Acuerdo Final de Paz</a>, <a href="https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-nacionales-trimestrales/historicos-producto-interno-bruto-pib">PIB del DANE</a>.</p>
      </div>

      {/* ── Panel principal ──────────────────────────────────── */}
      <div className="original-shell story-main-shell">
        <div className="original-story-visual story-panel" aria-live="polite">

          {/* Año + controles de ancla */}
          <div className="original-story-top">
            <div>
              <p>{t.selected}</p>
              <strong>{year}</strong>
            </div>
            <div className="original-price-controls">
              <label>{t.anchor2016}<span><b>$</b><input aria-label={t.anchor2016} type="number" value={anchor2016} onChange={(e) => setAnchor2016(Number(e.target.value) || 1100)} /></span></label>
              <label>{t.anchor2026}<span><b>$</b><input aria-label={t.anchor2026} type="number" value={anchor2026} onChange={(e) => setAnchor2026(Number(e.target.value) || 3500)} /></span></label>
            </div>
          </div>

          {/* Selector de año */}
          <div className="story-year-nav">
            <button
              className="story-year-btn"
              onClick={() => setYear((y) => Math.max(MIN_YEAR, y - 1))}
              disabled={year === MIN_YEAR}
              aria-label={language === 'es' ? 'Año anterior' : 'Previous year'}
            >‹</button>
            <input
              className="story-year-range"
              type="range"
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={1}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label={t.selected}
            />
            <button
              className="story-year-btn"
              onClick={() => setYear((y) => Math.min(MAX_YEAR, y + 1))}
              disabled={year === MAX_YEAR}
              aria-label={language === 'es' ? 'Año siguiente' : 'Next year'}
            >›</button>
          </div>

          {/* Comparación: salario ↔ Chocorramos */}
          {point && <>
            <div className="original-comparison">
              <div className="original-money-side">
                <div><p>{t.salary}</p><strong>{formatMoney(point.salary)}</strong></div>
                <MoneyStack salary={point.salary} locale={locale} />
              </div>
              <div className="original-equals">=</div>
              <div className="original-choco-result">
                <strong>{Math.round(point.units).toLocaleString(locale)}</strong>
                <span>{t.units}</span>
                <ChocoStack units={point.units} locale={locale} />
                <p>{t.usedPrice} <strong>{formatMoney(point.estimatedPrice)}</strong> <small>{point.status === 'anchor' ? t.anchor : t.estimated}</small></p>
              </div>
            </div>
            <div className="original-facts">
              <div><span>{t.inflation}</span><strong>{formatPct(inflation)}</strong></div>
              <div><span>{t.unemployment}</span><strong>{formatPct(unemployment)}</strong></div>
              <div><span>{t.informal}</span><strong>{formatPct(informal)}</strong></div>
            </div>
            <div className="original-fixed">
              <span>{t.fixed}</span><strong>{Math.round(moneyUnits).toLocaleString(locale)} {t.hypothetical}</strong>
            </div>
          </>}
        </div>

        {/* ── Contexto histórico del año seleccionado ──────── */}
        {step && (
          <div className="story-context-card">
            <div className="story-context-inner">
              {/* President portrait — decorative, no-bg PNG */}
              <div className="story-president-img" aria-hidden="true">
                <img
                  src={getPresidentImage(year)}
                  alt={step[4]}
                  className="story-president-photo"
                  loading="lazy"
                />
              </div>
              {/* Context text */}
              <div className="story-context-body">
                <div className="story-context-header">
                  <span className="original-eyebrow">{t.economicContext} · {year}</span>
                  <p className="story-context-title">{step[0]}</p>
                </div>
                <p className="story-context-desc">{step[1]}</p>
                <div className="story-context-econ">
                  <strong>{step[2]}</strong>
                  <p>{step[3]}</p>
                </div>
                <span className="story-context-president">{step[4]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Puente hacia análisis ────────────────────────────── */}
      <div className="analysis-bridge">
        <p>{globalT.story.analysisEyebrow}</p>
        <h2>{globalT.story.analysisTitle}</h2>
        <span>{globalT.story.analysisBody}</span>
      </div>

    </section>
  )
}
