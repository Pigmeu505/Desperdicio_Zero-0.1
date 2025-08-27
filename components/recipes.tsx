"use client"

import { Clock, Users, Search, Play, ArrowLeft, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useCallback } from "react"
import type { FoodItem } from "@/app/page"

interface RecipesProps {
  foods: FoodItem[]
}

interface Recipe {
  id: number
  name: string
  ingredients: string[]
  time: string
  servings: number
  difficulty: string
  description: string
  videoUrl: string
  instructions: string[]
  nutritionalInfo: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
  image: string
  rating: number
  author: string
  tags: string[]
}

export default function Recipes({ foods }: RecipesProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [apiRecipes, setApiRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>([])
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipes")
    if (saved) {
      setSavedRecipes(JSON.parse(saved))
    }
  }, [])

  const toggleSaveRecipe = (recipeId: number) => {
    const newSavedRecipes = savedRecipes.includes(recipeId)
      ? savedRecipes.filter((id) => id !== recipeId)
      : [...savedRecipes, recipeId]

    setSavedRecipes(newSavedRecipes)
    localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes))

    // Salvar também os dados completos da receita
    const recipe = combinedRecipes.find((r) => r.id === recipeId)
    if (recipe && !savedRecipes.includes(recipeId)) {
      const savedRecipesData = JSON.parse(localStorage.getItem("savedRecipesData") || "[]")
      savedRecipesData.push(recipe)
      localStorage.setItem("savedRecipesData", JSON.stringify(savedRecipesData))
    } else if (savedRecipes.includes(recipeId)) {
      const savedRecipesData = JSON.parse(localStorage.getItem("savedRecipesData") || "[]")
      const filteredData = savedRecipesData.filter((r: Recipe) => r.id !== recipeId)
      localStorage.setItem("savedRecipesData", JSON.stringify(filteredData))
    }
  }

  const translateWithGoogleAPI = async (text: string): Promise<string> => {
    try {
      const manualTranslations: { [key: string]: string } = {
        chicken: "frango",
        beef: "carne bovina",
        pork: "carne suína",
        fish: "peixe",
        salmon: "salmão",
        tuna: "atum",
        shrimp: "camarão",
        eggs: "ovos",
        egg: "ovo",
        milk: "leite",
        cheese: "queijo",
        butter: "manteiga",
        cream: "creme",
        rice: "arroz",
        pasta: "macarrão",
        bread: "pão",
        flour: "farinha",
        sugar: "açúcar",
        salt: "sal",
        pepper: "pimenta",
        onion: "cebola",
        garlic: "alho",
        tomato: "tomate",
        potato: "batata",
        carrot: "cenoura",
        broccoli: "brócolis",
        spinach: "espinafre",
        lettuce: "alface",
        cucumber: "pepino",
        mushroom: "cogumelo",
        lemon: "limão",
        lime: "lima",
        orange: "laranja",
        apple: "maçã",
        banana: "banana",
        strawberry: "morango",
        avocado: "abacate",
        beans: "feijão",
        chickpeas: "grão-de-bico",
        nuts: "nozes",
        almonds: "amêndoas",
        parsley: "salsa",
        basil: "manjericão",
        oregano: "orégano",
        ginger: "gengibre",
        "olive oil": "azeite de oliva",
        "vegetable oil": "óleo vegetal",
        vinegar: "vinagre",
        wine: "vinho",
        water: "água",
      }

      // Verificar se há tradução manual primeiro
      const lowerText = text.toLowerCase().trim()
      for (const [english, portuguese] of Object.entries(manualTranslations)) {
        if (lowerText.includes(english)) {
          return text.replace(new RegExp(english, "gi"), portuguese)
        }
      }

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`,
      )
      const data = await response.json()

      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0]
      }
      return text
    } catch (error) {
      console.log("[v0] Erro na tradução:", error)
      return text
    }
  }

  const searchRecipesByIngredient = async (ingredient: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`,
      )
      const data = await response.json()

      if (data.meals) {
        return data.meals.slice(0, 6) // Limitar a 6 receitas por ingrediente
      }
      return []
    } catch (error) {
      console.log("[v0] Erro ao buscar receitas por ingrediente:", error)
      return []
    }
  }

  const getRecipeDetails = async (mealId: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      const data = await response.json()
      return data.meals ? data.meals[0] : null
    } catch (error) {
      console.log("[v0] Erro ao buscar detalhes da receita:", error)
      return null
    }
  }

  const fetchRecipesFromTheMealDB = async (ingredients: string[] = [], loadMore = false) => {
    if (loadMore) {
      setLoadingMore(true)
    } else {
      setLoading(true)
      setOffset(0)
    }

    try {
      console.log("[v0] Iniciando busca de receitas...")
      const startTime = Date.now()

      const recipes: Recipe[] = []
      let recipesToFetch = loadMore ? 8 : 12

      // Se há ingredientes selecionados, buscar receitas específicas
      if (ingredients.length > 0) {
        console.log("[v0] Buscando receitas por ingredientes:", ingredients)
        for (const ingredient of ingredients) {
          const ingredientRecipes = await searchRecipesByIngredient(ingredient)

          for (const meal of ingredientRecipes.slice(0, 4)) {
            // 4 receitas por ingrediente
            const fullMeal = await getRecipeDetails(meal.idMeal)
            if (fullMeal) {
              const recipe = await processRecipeData(fullMeal)
              if (recipe) recipes.push(recipe)
            }
          }
        }
        recipesToFetch = Math.max(0, recipesToFetch - recipes.length)
      }

      console.log("[v0] Buscando", recipesToFetch, "receitas aleatórias...")
      const randomRecipePromises = []
      for (let i = 0; i < recipesToFetch; i++) {
        randomRecipePromises.push(
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then(async (data) => {
              if (data.meals && data.meals[0]) {
                return await processRecipeData(data.meals[0])
              }
              return null
            })
            .catch((error) => {
              console.log("[v0] Erro ao buscar receita individual:", error)
              return null
            }),
        )
      }

      const randomRecipes = await Promise.all(randomRecipePromises)
      const validRandomRecipes = randomRecipes.filter((recipe) => recipe !== null)
      recipes.push(...validRandomRecipes)

      if (loadMore) {
        setApiRecipes((prev) => [...prev, ...recipes])
        setOffset((prev) => prev + recipes.length)
      } else {
        setApiRecipes(recipes)
        setOffset(recipes.length)
      }

      setHasMore(true)

      const endTime = Date.now()
      console.log("[v0] Busca concluída em", endTime - startTime, "ms. Receitas encontradas:", recipes.length)
    } catch (error) {
      console.log("[v0] Erro ao buscar receitas da TheMealDB:", error)
      if (!loadMore) {
        setApiRecipes([])
      }
    }

    setLoading(false)
    setLoadingMore(false)
  }

  const processRecipeData = async (meal: any): Promise<Recipe | null> => {
    try {
      // Extrair ingredientes e medidas
      const ingredientsList: string[] = []
      for (let j = 1; j <= 20; j++) {
        const ingredient = meal[`strIngredient${j}`]
        const measure = meal[`strMeasure${j}`]
        if (ingredient && ingredient.trim()) {
          const ingredientText = measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
          // Traduzir ingrediente
          const translatedIngredient = await translateWithGoogleAPI(ingredientText)
          ingredientsList.push(translatedIngredient)
        }
      }

      // Traduzir nome da receita
      const translatedName = await translateWithGoogleAPI(meal.strMeal)

      // Traduzir instruções
      const translatedInstructions = await translateWithGoogleAPI(
        meal.strInstructions || "Siga as instruções da receita original",
      )

      // Dividir instruções em passos
      const instructions = translatedInstructions
        .split(/\.\s+/)
        .filter((step: string) => step.trim().length > 10)
        .map((step: string) => step.trim())
        .slice(0, 6)

      // Traduzir categoria e área
      const translatedCategory = await translateWithGoogleAPI(meal.strCategory || "Principal")
      const translatedArea = await translateWithGoogleAPI(meal.strArea || "Internacional")

      // Converter YouTube URL para embed
      let videoUrl = ""
      if (meal.strYoutube) {
        const videoId = meal.strYoutube.split("v=")[1]?.split("&")[0]
        if (videoId) {
          videoUrl = `https://www.youtube.com/embed/${videoId}`
        }
      }

      const recipe: Recipe = {
        id: Number.parseInt(meal.idMeal),
        name: translatedName,
        ingredients: ingredientsList,
        time: `${Math.floor(Math.random() * 30) + 15} min`,
        servings: Math.floor(Math.random() * 4) + 2,
        difficulty: ["Fácil", "Médio", "Difícil"][Math.floor(Math.random() * 3)],
        description: `Deliciosa receita de ${translatedName} da culinária ${translatedArea}.`,
        videoUrl: videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        instructions: instructions,
        nutritionalInfo: {
          calories: Math.floor(Math.random() * 300) + 200,
          protein: `${Math.floor(Math.random() * 20) + 10}g`,
          carbs: `${Math.floor(Math.random() * 40) + 20}g`,
          fat: `${Math.floor(Math.random() * 15) + 5}g`,
        },
        image: meal.strMealThumb || "/placeholder.svg?height=200&width=300&text=Receita",
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        author: `Chef ${translatedArea}`,
        tags: [translatedArea, translatedCategory].filter(Boolean),
      }

      return recipe
    } catch (error) {
      console.log("[v0] Erro ao processar receita:", error)
      return null
    }
  }

  const searchIngredients = async (term: string) => {
    if (term.length < 2) {
      setSuggestedIngredients([])
      return
    }

    try {
      // Buscar ingredientes comuns que correspondem ao termo
      const commonIngredients = [
        "chicken",
        "beef",
        "pork",
        "fish",
        "salmon",
        "tuna",
        "shrimp",
        "eggs",
        "milk",
        "cheese",
        "butter",
        "cream",
        "rice",
        "pasta",
        "bread",
        "flour",
        "sugar",
        "salt",
        "pepper",
        "onion",
        "garlic",
        "tomato",
        "potato",
        "carrot",
        "broccoli",
        "spinach",
        "lettuce",
        "cucumber",
        "mushroom",
        "lemon",
        "lime",
        "orange",
        "apple",
        "banana",
        "strawberry",
        "avocado",
        "beans",
        "chickpeas",
        "nuts",
        "almonds",
        "parsley",
        "basil",
        "oregano",
        "ginger",
        "olive oil",
        "vegetable oil",
        "vinegar",
        "wine",
        "water",
      ]

      const matches = commonIngredients
        .filter((ingredient) => ingredient.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 8)

      // Traduzir sugestões
      const translatedMatches = await Promise.all(
        matches.map(async (ingredient) => await translateWithGoogleAPI(ingredient)),
      )

      setSuggestedIngredients(translatedMatches)
    } catch (error) {
      console.log("[v0] Erro ao buscar ingredientes:", error)
      setSuggestedIngredients([])
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchIngredients(searchTerm)
    }, 150) // Reduzido de 300ms para 150ms para resposta mais rápida

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight - 800) {
      fetchRecipesFromTheMealDB(selectedIngredients, true)
    }
  }, [selectedIngredients, loadingMore, hasMore])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    fetchRecipesFromTheMealDB(selectedIngredients)
  }, [selectedIngredients])

  const allRecipes: Recipe[] = []

  const combinedRecipes = [...apiRecipes, ...allRecipes]

  const availableIngredients = foods.map((food) => food.name)

  const recommendedRecipes = combinedRecipes.slice(0, 6)

  const getFilteredRecipes = () => {
    if (selectedIngredients.length === 0) {
      return combinedRecipes
    }

    return combinedRecipes
      .filter((recipe) =>
        selectedIngredients.some((ingredient) =>
          recipe.ingredients.some((recipeIngredient) =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase()),
          ),
        ),
      )
      .sort((a, b) => {
        const aMatches = selectedIngredients.filter((ingredient) =>
          a.ingredients.some((recipeIngredient) => recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())),
        ).length
        const bMatches = selectedIngredients.filter((ingredient) =>
          b.ingredients.some((recipeIngredient) => recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())),
        ).length
        return bMatches - aMatches
      })
  }

  const getMatchingIngredients = (recipeIngredients: string[]) => {
    return recipeIngredients.filter((ingredient) =>
      availableIngredients.some(
        (available) =>
          available.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(available.toLowerCase()),
      ),
    )
  }

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient],
    )
    setSearchTerm("")
    setSuggestedIngredients([])
  }

  if (selectedRecipe) {
    return (
      <div className="p-4 pb-20">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-2 p-0 h-auto"
          >
            <ArrowLeft size={20} />
            Voltar às receitas
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{selectedRecipe.rating}</span>
              </div>
              <span className="text-sm text-gray-600">por {selectedRecipe.author}</span>
            </div>
            <p className="text-gray-600">{selectedRecipe.description}</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={selectedRecipe.image || "/placeholder.svg"}
                  alt={`Receita: ${selectedRecipe.name}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-t-lg">
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={() => window.open(selectedRecipe.videoUrl, "_blank")}
                  >
                    <Play size={24} />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSaveRecipe(selectedRecipe.id)
                    }}
                  >
                    <Heart
                      size={16}
                      className={savedRecipes.includes(selectedRecipe.id) ? "fill-red-500 text-red-500" : ""}
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {selectedRecipe.time}
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              {selectedRecipe.servings} porções
            </div>
            <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => {
                  const isAvailable = getMatchingIngredients([ingredient]).length > 0
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={isAvailable ? "text-green-700" : "text-gray-600"}>{ingredient}</span>
                      {isAvailable && (
                        <Badge variant="secondary" className="text-xs">
                          Disponível
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">{instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedRecipe.instructions.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>Instruções não disponíveis para esta receita.</p>
                  <p className="text-sm mt-1">Assista ao vídeo para ver o preparo.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Nutricionais (por porção)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedRecipe.nutritionalInfo.calories}</div>
                  <div className="text-sm text-gray-600">Calorias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.nutritionalInfo.protein}</div>
                  <div className="text-sm text-gray-600">Proteína</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedRecipe.nutritionalInfo.carbs}</div>
                  <div className="text-sm text-gray-600">Carboidratos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedRecipe.nutritionalInfo.fat}</div>
                  <div className="text-sm text-gray-600">Gordura</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">Receitas</h1>
        <p className="text-sm text-gray-600">
          {selectedIngredients.length > 0
            ? `Receitas com ${selectedIngredients.join(", ")}`
            : "Recomendações baseadas nos seus alimentos"}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search size={20} />
            Buscar por Ingredientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Digite um ingrediente (ex: frango, tomate, queijo...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            {suggestedIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestedIngredients.map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleIngredient(ingredient)}
                    className="text-xs hover:bg-blue-50"
                  >
                    + {ingredient}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Seus ingredientes disponíveis:</p>
            <div className="flex flex-wrap gap-2">
              {availableIngredients.map((ingredient) => (
                <Button
                  key={ingredient}
                  variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleIngredient(ingredient)}
                  className="text-xs"
                >
                  {ingredient}
                </Button>
              ))}
            </div>
          </div>

          {availableIngredients.length === 0 && (
            <p className="text-gray-500 text-sm">Adicione alimentos para buscar receitas personalizadas</p>
          )}
          {selectedIngredients.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedIngredients([])} className="text-xs">
              Limpar seleção
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {selectedIngredients.length === 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">🌟 Recomendações para Você</h2>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-48"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-14"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="space-y-4 transition-all duration-300">
          {getFilteredRecipes().map((recipe) => {
            const matchingIngredients = getMatchingIngredients(recipe.ingredients)
            const matchPercentage = Math.round((matchingIngredients.length / recipe.ingredients.length) * 100)

            return (
              <Card
                key={recipe.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                  matchingIngredients.length > 0 ? "border-green-200 bg-green-50" : ""
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative">
                  <img
                    src={recipe.image || "/placeholder.svg?height=120&width=300&text=Receita"}
                    alt={recipe.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveRecipe(recipe.id)
                      }}
                    >
                      <Heart
                        size={16}
                        className={savedRecipes.includes(recipe.id) ? "fill-red-500 text-red-500" : ""}
                      />
                    </Button>
                  </div>
                  {matchingIngredients.length > 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-600">{matchPercentage}% match</Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2 pt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{recipe.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-sm">★</span>
                          <span className="text-sm text-gray-600">{recipe.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">• {recipe.author}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {recipe.servings} porções
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Ingredientes:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient) => {
                        const isAvailable = matchingIngredients.includes(ingredient)
                        return (
                          <Badge
                            key={ingredient}
                            variant={isAvailable ? "default" : "outline"}
                            className={`text-xs ${isAvailable ? "bg-green-600" : ""}`}
                          >
                            {ingredient.length > 15 ? ingredient.substring(0, 15) + "..." : ingredient}
                          </Badge>
                        )
                      })}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-gray-500">Toque para detalhes</span>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Play size={12} />
                      <span className="text-xs">Vídeo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {loadingMore && (
          <Card className="animate-pulse">
            <CardContent className="text-center py-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <p className="text-gray-500 mt-2">Carregando mais receitas...</p>
            </CardContent>
          </Card>
        )}

        {getFilteredRecipes().length === 0 && selectedIngredients.length > 0 && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Nenhuma receita encontrada com os ingredientes selecionados.</p>
              <Button variant="outline" onClick={() => setSelectedIngredients([])} className="mt-4">
                Ver todas as recomendações
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
