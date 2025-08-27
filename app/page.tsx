"use client"

import { useState, useEffect } from "react"
import Dashboard from "@/components/dashboard"
import AddFood from "@/components/add-food"
import Recipes from "@/components/recipes"
import Statistics from "@/components/statistics"
import Profile from "@/components/profile"
import Navigation from "@/components/navigation"

export type FoodItem = {
  id: string
  name: string
  category: string
  expiryDate: string
  quantity: string
  location: "geladeira" | "despensa"
  addedDate: string
  barcode?: string
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "add" | "recipes" | "stats" | "profile">("dashboard")
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("desperdicio-zero-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
        loadFoods()
      } else {
        // Criar usuário padrão para demonstração
        const defaultUser = { id: "1", email: "usuario@exemplo.com", name: "Usuário Demo" }
        localStorage.setItem("desperdicio-zero-user", JSON.stringify(defaultUser))
        setUser(defaultUser)
        loadFoods()
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const loadFoods = () => {
    const savedFoods = localStorage.getItem("desperdicio-zero-foods")
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods))
    } else {
      // Dados de exemplo para demonstração
      const exampleFoods: FoodItem[] = [
        {
          id: "1",
          name: "Leite",
          category: "Laticínios",
          expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          quantity: "1L",
          location: "geladeira",
          addedDate: new Date().toISOString().split("T")[0],
        },
        {
          id: "2",
          name: "Banana",
          category: "Frutas",
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          quantity: "6 unidades",
          location: "despensa",
          addedDate: new Date().toISOString().split("T")[0],
        },
      ]
      setFoods(exampleFoods)
      localStorage.setItem("desperdicio-zero-foods", JSON.stringify(exampleFoods))
    }
  }

  const addFood = (food: Omit<FoodItem, "id" | "addedDate">) => {
    console.log("[v0] Tentando adicionar alimento:", food)

    const newFood: FoodItem = {
      ...food,
      id: Date.now().toString(),
      addedDate: new Date().toISOString().split("T")[0],
    }

    const updatedFoods = [...foods, newFood]
    setFoods(updatedFoods)
    localStorage.setItem("desperdicio-zero-foods", JSON.stringify(updatedFoods))

    console.log("[v0] Alimento adicionado com sucesso:", newFood)
    console.log("[v0] Total de alimentos:", updatedFoods.length)
  }

  const removeFood = (id: string) => {
    const updatedFoods = foods.filter((food) => food.id !== id)
    setFoods(updatedFoods)
    localStorage.setItem("desperdicio-zero-foods", JSON.stringify(updatedFoods))
  }

  const handleLogout = () => {
    localStorage.removeItem("desperdicio-zero-user")
    localStorage.removeItem("desperdicio-zero-foods")
    setUser(null)
    setFoods([])
    setCurrentView("dashboard")
    // Reload page to reset all state
    window.location.reload()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </main>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard foods={foods} removeFood={removeFood} />
      case "add":
        return <AddFood onAddFood={addFood} onBack={() => setCurrentView("dashboard")} />
      case "recipes":
        return <Recipes foods={foods} />
      case "stats":
        return <Statistics foods={foods} />
      case "profile":
        return <Profile user={user} onLogout={handleLogout} />
      default:
        return <Dashboard foods={foods} removeFood={removeFood} />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
          <h1 className="text-xl font-bold text-center">Desperdício Zero</h1>
        </header>

        {renderCurrentView()}

        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </main>
  )
}
