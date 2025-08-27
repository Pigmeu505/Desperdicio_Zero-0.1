import { Card, CardContent } from "@/components/ui/card"

export default function ImpactSection() {
  return (
    <section id="impacto" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900">Seu Impacto Positivo</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe em tempo real como suas ações estão fazendo a diferença para o planeta e seu bolso
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-semibold text-xl text-gray-900">CO₂ Evitado</h3>
                  <span className="text-2xl font-bold text-green-600">2.4 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Equivale a plantar 3 árvores</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-semibold text-xl text-gray-900">Dinheiro Economizado</h3>
                  <span className="text-2xl font-bold text-blue-600">R$ 127,50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Meta mensal: R$ 200,00</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-semibold text-xl text-gray-900">Alimentos Salvos</h3>
                  <span className="text-2xl font-bold text-orange-600">18 itens</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Evitou desperdício de 3.2 kg</p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Dashboard de Impacto"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
