import { indexData } from '../data'
import { formatPct } from '../utils/calculations'

export default function HeroSection() {
  const co = indexData.countries.colombia
  const au = indexData.countries.australia

  return (
    <section className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-200 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-900 mb-3">
          Economía cotidiana
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Índice Chocorramo
        </h1>
        <p className="text-xl sm:text-2xl text-gray-800 font-medium max-w-2xl mx-auto mb-10">
          Una forma sencilla de entender{' '}
          <span className="underline decoration-4 decoration-blue-600">inflación</span>{' '}
          y{' '}
          <span className="underline decoration-4 decoration-red-600">poder adquisitivo</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 text-left shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{co.profile.flag}</span>
              <span className="font-bold text-gray-800">{co.profile.name}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Con el salario mínimo comprabas:
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
              {Math.floor(co.snapshots[2016].productsPurchasable)}{' '}
              <span className="text-lg font-semibold text-gray-600">
                Chocoramos en 2016
              </span>
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums mt-1">
              {Math.floor(co.snapshots[2026].productsPurchasable)}{' '}
              <span className="text-lg font-semibold text-gray-600">
                Chocoramos en 2026
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold text-red-600">
              {formatPct(co.calculations.purchasingPowerChangePct)} en poder adquisitivo
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-5 text-left shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{au.profile.flag}</span>
              <span className="font-bold text-gray-800">{au.profile.name}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Con el salario mínimo comprabas:
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
              {Math.floor(au.snapshots[2016].productsPurchasable)}{' '}
              <span className="text-lg font-semibold text-gray-600">
                meat pies/semana en 2016
              </span>
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums mt-1">
              {Math.floor(au.snapshots[2026].productsPurchasable)}{' '}
              <span className="text-lg font-semibold text-gray-600">
                meat pies/semana en 2026
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold text-red-600">
              {formatPct(au.calculations.purchasingPowerChangePct)} en poder adquisitivo
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          Desplázate para ver el análisis completo y la metodología.
        </p>
      </div>
    </section>
  )
}
