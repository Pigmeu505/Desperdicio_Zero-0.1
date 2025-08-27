import { Card, CardContent } from "@/components/ui/card"
import { Mic, QrCode, Bell, ChefHat, BarChart3, Lightbulb } from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "Cadastro Inteligente",
    description: "Adicione alimentos por texto, voz ou scanner de código de barras de forma rápida e prática.",
  },
  {
    icon: Bell,
    title: "Notificações Inteligentes",
    description: "Receba alertas personalizados baseados no seu consumo real antes que os alimentos estraguem.",
  },
  {
    icon: Mic,
    title: "Assistente de Voz",
    description: 'Use comandos como "adicionar 1 litro de leite" sem precisar abrir a interface do app.',
  },
  {
    icon: ChefHat,
    title: "Receitas Personalizadas",
    description: "Sugestões de receitas e cardápios considerando suas restrições, preferências e tempo disponível.",
  },
  {
    icon: BarChart3,
    title: "Impacto Tangível",
    description: "Veja quanto CO₂ foi evitado e dinheiro economizado com gráficos comparativos ao longo do tempo.",
  },
  {
    icon: Lightbulb,
    title: "Dicas de Conservação",
    description: "Aprenda técnicas para prolongar a vida útil dos seus alimentos e reduzir ainda mais o desperdício.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900">Principais Funcionalidades</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologia avançada para transformar a forma como você gerencia seus alimentos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
