import { Button } from "@/components/ui/button"
import { Leaf, DollarSign, Smartphone } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-gray-900 leading-tight">
                Controle e Economia de <span className="text-green-600">Alimentos</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                O Desperdício Zero ajuda famílias e indivíduos a gerenciar seus alimentos, evitando desperdício,
                economizando dinheiro e reduzindo o impacto ambiental.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Sustentável</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Economize Dinheiro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Fácil de Usar</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Baixar para Android
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                Baixar para iOS
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="App Desperdício Zero"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
