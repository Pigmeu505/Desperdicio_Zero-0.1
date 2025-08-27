"use client"

import { Home, Plus, ChefHat, BarChart3, User } from "lucide-react"

interface NavigationProps {
  currentView: "dashboard" | "add" | "recipes" | "stats" | "profile"
  setCurrentView: (view: "dashboard" | "add" | "recipes" | "stats" | "profile") => void
}

export default function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const navItems = [
    { id: "dashboard" as const, icon: Home, label: "Início" },
    { id: "recipes" as const, icon: ChefHat, label: "Receitas" },
    { id: "add" as const, icon: Plus, label: "Adicionar", isCenter: true },
    { id: "stats" as const, icon: BarChart3, label: "Estatísticas" },
    { id: "profile" as const, icon: User, label: "Perfil" },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          const isCenter = item.isCenter

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isCenter
                  ? `${isActive ? "text-white bg-green-600 scale-110" : "text-green-600 bg-green-100 hover:bg-green-200"} transform`
                  : isActive
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-green-600"
              }`}
            >
              <Icon size={isCenter ? 24 : 20} />
              <span className={`text-xs mt-1 ${isCenter ? "font-medium" : ""}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
