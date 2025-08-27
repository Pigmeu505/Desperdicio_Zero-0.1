"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Heart, LogOut, Settings } from "lucide-react"

interface ProfileProps {
  user: any
  onLogout: () => void
}

export default function Profile({ user, onLogout }: ProfileProps) {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSavedRecipes()
  }, [])

  const loadSavedRecipes = () => {
    const saved = localStorage.getItem("savedRecipesData")
    if (saved) {
      setSavedRecipes(JSON.parse(saved))
    }
    setLoading(false)
  }

  const handleLogout = () => {
    onLogout()
  }

  const removeSavedRecipe = (recipeId: number) => {
    const updated = savedRecipes.filter((recipe) => recipe.id !== recipeId)
    setSavedRecipes(updated)
    localStorage.setItem("savedRecipesData", JSON.stringify(updated))

    const savedIds = JSON.parse(localStorage.getItem("savedRecipes") || "[]")
    const updatedIds = savedIds.filter((id: number) => id !== recipeId)
    localStorage.setItem("savedRecipes", JSON.stringify(updatedIds))
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header do Perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name || user.email?.split("@")[0] || "Usuário"}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receitas Salvas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Receitas Salvas ({savedRecipes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            </div>
          ) : savedRecipes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhuma receita salva ainda</p>
              <p className="text-sm">Salve suas receitas favoritas na aba Receitas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                    <p className="text-sm text-gray-600">
                      {recipe.time || "30min"} • {recipe.difficulty || "Fácil"}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs text-gray-500">{recipe.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSavedRecipe(recipe.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Preferências de Notificação
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <User className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
