export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🍫</span>
              <span className="font-bold text-white">Índice Chocorramo</span>
            </div>
            <p className="text-sm">
              Proyecto educativo de código abierto. MIT License.
            </p>
          </div>
          <div className="text-sm space-y-1">
            <p>
              Datos:{' '}
              <a href="https://www.dane.gov.co/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                DANE
              </a>
              {' · '}
              <a href="https://www.fwc.gov.au/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Fair Work Commission
              </a>
              {' · '}
              <a href="https://www.abs.gov.au/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                ABS
              </a>
            </p>
            <p className="text-gray-500">
              Los precios de productos son estimaciones, no datos oficiales.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
