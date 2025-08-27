"use client"

import { AlertTriangle, Refrigerator, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FoodItem } from "@/app/page"

interface DashboardProps {
  foods: FoodItem[]
  removeFood: (id: string) => void
}

export default function Dashboard({ foods, removeFood }: DashboardProps) {
  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: "expired", days: Math.abs(diffDays), color: "bg-red-500" }
    if (diffDays <= 2) return { status: "warning", days: diffDays, color: "bg-orange-500" }
    return { status: "good", days: diffDays, color: "bg-green-500" }
  }

  const expiredItems = foods.filter((food) => getExpiryStatus(food.expiryDate).status === "expired")
  const warningItems = foods.filter((food) => getExpiryStatus(food.expiryDate).status === "warning")

  return (
    <div className="p-4 pb-20">
      {/* Alertas */}
      {(expiredItems.length > 0 || warningItems.length > 0) && (
        <Card className="mb-4 border-orange-200 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
              <AlertTriangle size={16} />
              Alertas de Validade
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {expiredItems.length > 0 && (
              <p className="text-sm text-red-600 mb-1">{expiredItems.length} item(s) vencido(s)</p>
            )}
            {warningItems.length > 0 && (
              <p className="text-sm text-orange-600">{warningItems.length} item(s) vencendo em breve</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Refrigerator className="mx-auto mb-2 text-blue-500" size={24} />
            <p className="text-2xl font-bold">{foods.filter((f) => f.location === "geladeira").length}</p>
            <p className="text-sm text-gray-600">Na Geladeira</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="mx-auto mb-2 text-green-500" size={24} />
            <p className="text-2xl font-bold">{foods.filter((f) => f.location === "despensa").length}</p>
            <p className="text-sm text-gray-600">Na Despensa</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Meus Alimentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {foods.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum alimento cadastrado ainda.
              <br />
              Adicione seus primeiros itens!
            </p>
          ) : (
            foods.map((food) => {
              const expiryInfo = getExpiryStatus(food.expiryDate)

              return (
                <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{food.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {food.location}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {food.quantity} • {food.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${expiryInfo.color}`} />
                      <span className="text-xs text-gray-500">
                        {expiryInfo.status === "expired"
                          ? `Venceu há ${expiryInfo.days} dia(s)`
                          : expiryInfo.status === "warning"
                            ? `Vence em ${expiryInfo.days} dia(s)`
                            : `Vence em ${expiryInfo.days} dia(s)`}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFood(food.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Consumir
                  </Button>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
