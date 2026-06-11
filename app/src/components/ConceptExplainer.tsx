interface ConceptCardProps {
  title: string
  emoji: string
  description: string
  example: string
}

function ConceptCard({ title, emoji, description, example }: ConceptCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border-l-4 border-blue-400">
        <span className="font-semibold">Ejemplo: </span>{example}
      </div>
    </div>
  )
}

export default function ConceptExplainer() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Conceptos clave
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Antes de ver los datos, entendamos qué mide cada cosa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ConceptCard
            emoji="💵"
            title="Salario nominal"
            description="Es el número en pesos o dólares que ves en tu nómina. Si ganabas $689.455 en 2016, ese es tu salario nominal."
            example="El salario mínimo en Colombia pasó de $689.455 en 2016 a $1.750.905 en 2026. Nominalmente creció 154%."
          />
          <ConceptCard
            emoji="🛒"
            title="Salario real"
            description="Es lo que puedes comprar con tu salario. Si los precios subieron más que tu salario, tu salario real bajó aunque el número en pesos haya subido."
            example="Si tu salario subió 50% pero los precios subieron 70%, puedes comprar menos que antes. Tu salario real bajó."
          />
          <ConceptCard
            emoji="📊"
            title="Poder adquisitivo"
            description="Cuántas cosas concretas puedes comprar. Usamos el Chocorramo como termómetro: si antes comprabas 626 y ahora 547, tu poder adquisitivo en Chocoramos bajó."
            example="626 Chocoramos → 547 Chocoramos con el salario mínimo. Eso es −12.7% en poder adquisitivo."
          />
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-amber-900 mb-1">¿Por qué un solo producto?</p>
              <p className="text-amber-800 text-sm">
                Usar un producto cotidiano hace la inflación tangible. Pero un solo producto no representa el costo de vida completo. El IPC (Índice de Precios al Consumidor) mide la inflación sobre una canasta de cientos de productos. En este proyecto mostramos ambas perspectivas: la del Chocorramo y la del IPC oficial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
