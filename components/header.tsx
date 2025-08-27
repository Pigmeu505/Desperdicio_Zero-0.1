import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DZ</span>
            </div>
            <span className="font-serif font-bold text-xl text-gray-900">Desperdício Zero</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#funcionalidades" className="text-gray-600 hover:text-green-600 transition-colors">
              Funcionalidades
            </a>
            <a href="#impacto" className="text-gray-600 hover:text-green-600 transition-colors">
              Impacto
            </a>
            <a href="#tecnologia" className="text-gray-600 hover:text-green-600 transition-colors">
              Tecnologia
            </a>
          </nav>

          <Button className="bg-green-600 hover:bg-green-700 text-white">Baixar App</Button>
        </div>
      </div>
    </header>
  )
}
