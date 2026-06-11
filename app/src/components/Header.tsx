export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍫</span>
          <span className="font-bold text-gray-900 text-lg">
            Índice Chocorramo
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#colombia" className="hover:text-gray-900 transition-colors">Colombia</a>
          <a href="#australia" className="hover:text-gray-900 transition-colors">Australia</a>
          <a href="#metodologia" className="hover:text-gray-900 transition-colors">Metodología</a>
          <a href="#fuentes" className="hover:text-gray-900 transition-colors">Fuentes</a>
        </nav>
      </div>
    </header>
  )
}
