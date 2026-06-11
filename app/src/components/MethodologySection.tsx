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
  return (
    <section id="metodologia" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Metodología</h2>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Transparencia total: qué mide el índice, qué no mide, y cómo se calculan los números.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">¿Qué mide el Índice Chocorramo?</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Poder adquisitivo en unidades de producto:</strong> cuántas unidades de un producto cotidiano puede comprar una persona con el salario mínimo, y cómo cambió eso entre dos años.
              </p>
              <p>
                <strong>Crecimiento nominal:</strong> cuánto creció el salario y el precio del producto en términos de dinero (sin ajustar por inflación).
              </p>
              <p>
                <strong>Salario real:</strong> el salario nominal ajustado por el IPC. Si el salario nominal creció 154% pero la inflación fue 72%, el salario real creció aproximadamente 48%.
              </p>
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <h4 className="font-bold text-red-900 mb-2">¿Qué NO mide?</h4>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>El costo de vida completo (vivienda, salud, educación)</li>
                <li>La distribución del ingreso</li>
                <li>Calidad de vida o bienestar</li>
                <li>Variaciones regionales de precios</li>
                <li>El costo de la canasta básica alimentaria</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Fórmulas</h3>
            <Formula
              label="Productos comprables"
              formula="productos = salario_minimo / precio_producto"
            />
            <Formula
              label="Crecimiento nominal del salario"
              formula="Δ_salario% = (salario_2026 / salario_2016 − 1) × 100"
            />
            <Formula
              label="Crecimiento del precio del producto"
              formula="Δ_precio% = (precio_2026 / precio_2016 − 1) × 100"
            />
            <Formula
              label="Cambio en poder adquisitivo"
              formula="Δ_poder% = (productos_2026 / productos_2016 − 1) × 100"
            />
            <Formula
              label="Salario real (deflactado por IPC)"
              formula="salario_real = salario_nominal / (IPC_relativo / 100)"
            />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">
            ¿Por qué usar un producto cotidiano para explicar inflación?
          </h3>
          <p className="text-sm text-blue-800">
            Los economistas usan el IPC para medir inflación, pero el IPC es abstracto: es el promedio ponderado de cientos de productos. Un Chocorramo o un meat pie tienen un precio que cualquiera puede verificar en la tienda. Eso hace el concepto tangible y verificable. La limitación es que un producto específico puede tener dinámicas de precio diferentes al promedio (marcas, materias primas, monopolios). Este proyecto muestra ambas perspectivas para que el lector entienda la diferencia.
          </p>
        </div>
      </div>
    </section>
  )
}
