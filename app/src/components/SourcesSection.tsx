interface SourceRowProps {
  flag: string
  name: string
  url: string
  type: string
  confidence: 'high' | 'medium' | 'low'
  notes: string
}

const confidenceBadge: Record<string, string> = {
  high: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-orange-100 text-orange-700',
}

function SourceRow({ flag, name, url, type, confidence, notes }: SourceRowProps) {
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
          {confidence === 'high' ? 'Oficial' : confidence === 'medium' ? 'Aproximado' : 'Estimado'}
        </span>
      </td>
      <td className="py-3 px-2 text-xs text-gray-500">{notes}</td>
    </tr>
  )
}

export default function SourcesSection() {
  return (
    <section id="fuentes" className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Fuentes y limitaciones</h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Cada dato tiene una fuente. Diferenciamos claramente datos oficiales de estimaciones.
        </p>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"></th>
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Fuente</th>
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Tipo</th>
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Calidad</th>
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Nota</th>
              </tr>
            </thead>
            <tbody>
              <SourceRow
                flag="🇨🇴"
                name="Decreto salarial — Función Pública / MinTrabajo"
                url="https://www.funcionpublica.gov.co/"
                type="Salario mínimo"
                confidence="high"
                notes="Decreto 2552/2015 (2016) y decreto 2024 (2026). Datos oficiales."
              />
              <SourceRow
                flag="🇨🇴"
                name="DANE — IPC (Índice de Precios al Consumidor)"
                url="https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc"
                type="Inflación"
                confidence="high"
                notes="Serie IPC total nacional. Valor 2026 estimado — pendiente verificación con DANE."
              />
              <SourceRow
                flag="🇨🇴"
                name="Precio Chocorramo — diversas fuentes de medios y retail"
                url="https://www.dane.gov.co/"
                type="Precio producto"
                confidence="low"
                notes="⚠️ No es dato oficial. Estimación basada en fuentes de prensa y reporte del usuario. Verificación pendiente."
              />
              <SourceRow
                flag="🇦🇺"
                name="Fair Work Commission — National Minimum Wage"
                url="https://www.fwc.gov.au/agreements-awards/pay-and-conditions/minimum-wages"
                type="Salario mínimo"
                confidence="high"
                notes="FY2016–17: AUD $672.70/semana oficial. FY2025–26: pendiente de verificar con Fair Work Order más reciente."
              />
              <SourceRow
                flag="🇦🇺"
                name="ABS — Consumer Price Index Australia"
                url="https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia"
                type="Inflación"
                confidence="high"
                notes="Serie trimestral CPI all groups. Valor 2026 estimado — pendiente verificación con ABS."
              />
              <SourceRow
                flag="🇦🇺"
                name="Precio meat pie — precio representativo (no oficial)"
                url="https://www.woolworths.com.au/"
                type="Precio producto"
                confidence="low"
                notes="⚠️ No hay fuente oficial para precio de meat pie. Estimación basada en precios de retailers. Documentado como 'precio representativo'."
              />
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Limitaciones conocidas</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Precios de Chocorramo y meat pie son estimaciones, no datos oficiales.</li>
              <li>Los datos de IPC para 2025–2026 pueden ser aproximaciones.</li>
              <li>La comparación usa años puntuales, no promedios anuales.</li>
              <li>Colombia usa salario mensual; Australia usa salario semanal.</li>
              <li>No se consideran impuestos, beneficios ni deducciones.</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">¿Cómo contribuir?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Si tienes una fuente más confiable para alguno de estos datos, abre un issue o PR en el repositorio.
            </p>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
            >
              Ver repositorio en GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
