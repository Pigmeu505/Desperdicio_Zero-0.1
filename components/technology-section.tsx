import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Smartphone, Zap, Shield } from "lucide-react"

const technologies = [
  {
    icon: Smartphone,
    title: "Multiplataforma",
    description: "Aplicativo nativo para Android e iOS com sincronização em tempo real",
  },
  {
    icon: Cloud,
    title: "Nuvem Segura",
    description: "Banco de dados em nuvem com backup automático e acesso de qualquer lugar",
  },
  {
    icon: Zap,
    title: "IA Integrada",
    description: "Reconhecimento de voz e geração inteligente de receitas personalizadas",
  },
  {
    icon: Shield,
    title: "Privacidade",
    description: "Seus dados são protegidos com criptografia de ponta a ponta",
  },
]

export default function TechnologySection() {
  return (
    <section id="tecnologia" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900">Tecnologia Avançada</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desenvolvido com as mais modernas tecnologias para oferecer a melhor experiência
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <tech.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-gray-900">{tech.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="font-serif font-bold text-2xl mb-4">Recursos Técnicos Inclusos</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <h4 className="font-semibold mb-2">Notificações Push</h4>
              <p className="text-sm opacity-90">Alertas inteligentes personalizados</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">APIs Integradas</h4>
              <p className="text-sm opacity-90">Reconhecimento de voz e receitas</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dashboard Interativo</h4>
              <p className="text-sm opacity-90">Estatísticas e gráficos em tempo real</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
