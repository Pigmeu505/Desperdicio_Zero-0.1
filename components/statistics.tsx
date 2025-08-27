import { TrendingDown, DollarSign, Leaf, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FoodItem } from "@/app/page"

interface StatisticsProps {
  foods: FoodItem[]
}

export default function Statistics({ foods }: StatisticsProps) {
  // Simulando dados de estatísticas
  const stats = {
    moneySaved: 127.5,
    co2Avoided: 8.3,
    itemsConsumed: 23,
    wasteReduction: 85,
  }

  const monthlyData = [
    { month: "Nov", saved: 89.2, co2: 5.2 },
    { month: "Dez", saved: 156.8, co2: 9.1 },
    { month: "Jan", saved: 127.5, co2: 8.3 },
  ]

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">Suas Estatísticas</h1>
        <p className="text-sm text-gray-600">Impacto positivo no meio ambiente e na economia</p>
      </div>

      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto mb-2 text-green-600" size={24} />
            <p className="text-2xl font-bold text-green-700">R$ {stats.moneySaved.toFixed(2)}</p>
            <p className="text-sm text-green-600">Economizados</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Leaf className="mx-auto mb-2 text-blue-600" size={24} />
            <p className="text-2xl font-bold text-blue-700">{stats.co2Avoided} kg</p>
            <p className="text-sm text-blue-600">CO₂ Evitado</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <TrendingDown className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="text-2xl font-bold text-purple-700">{stats.wasteReduction}%</p>
            <p className="text-sm text-purple-600">Menos Desperdício</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Calendar className="mx-auto mb-2 text-orange-600" size={24} />
            <p className="text-2xl font-bold text-orange-700">{stats.itemsConsumed}</p>
            <p className="text-sm text-orange-600">Itens Consumidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Mensal */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Evolução Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">{data.month}</span>
                  </div>
                  <div>
                    <p className="font-medium">R$ {data.saved.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{data.co2} kg CO₂</p>
                  </div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((data.saved / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparativo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comparativo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Família média brasileira</span>
              <span className="text-sm font-medium text-red-600">R$ 89/mês desperdiçados</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Você</span>
              <span className="text-sm font-medium text-green-600">R$ 19/mês desperdiçados</span>
            </div>
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Você está <span className="font-bold text-green-600">78% melhor</span> que a média!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
