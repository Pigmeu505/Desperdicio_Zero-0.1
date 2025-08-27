"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ArrowLeft, Mic, Scan, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FoodItem } from "@/app/page"

interface AddFoodProps {
  onAddFood: (food: Omit<FoodItem, "id" | "addedDate">) => void
  onBack: () => void
}

export default function AddFood({ onAddFood, onBack }: AddFoodProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    expiryDate: "",
    quantity: "",
    location: "geladeira" as "geladeira" | "despensa",
  })

  const [showScanner, setShowScanner] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const categories = [
    "Frutas",
    "Vegetais",
    "Laticínios",
    "Carnes",
    "Grãos",
    "Bebidas",
    "Condimentos",
    "Doces",
    "Congelados",
    "Outros",
  ]

  const startScanner = async () => {
    try {
      setShowScanner(true)
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões.")
      setShowScanner(false)
      setIsScanning(false)
    }
  }

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setShowScanner(false)
    setIsScanning(false)
  }

  const captureBarcode = () => {
    const mockProducts = [
      { name: "Leite Integral Piracanjuba 1L", category: "Laticínios" },
      { name: "Arroz Tio João 5kg", category: "Grãos" },
      { name: "Feijão Carioca Camil 1kg", category: "Grãos" },
      { name: "Açúcar Cristal União 1kg", category: "Condimentos" },
      { name: "Óleo de Soja Liza 900ml", category: "Condimentos" },
    ]

    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)]

    setFormData({
      ...formData,
      name: randomProduct.name,
      category: randomProduct.category,
    })

    stopScanner()
    alert(`Produto identificado: ${randomProduct.name}`)
  }

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "pt-BR"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFormData({ ...formData, name: transcript })
      }

      recognition.onerror = () => {
        alert("Erro no reconhecimento de voz. Tente novamente.")
      }

      recognition.start()
    } else {
      alert("Reconhecimento de voz não suportado neste navegador.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.category && formData.expiryDate && formData.quantity) {
      onAddFood(formData)
      setFormData({
        name: "",
        category: "",
        expiryDate: "",
        quantity: "",
        location: "geladeira",
      })
      onBack()
    }
  }

  if (showScanner) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black text-white">
          <h2 className="text-lg font-semibold">Scanner de Código de Barras</h2>
          <Button variant="ghost" size="sm" onClick={stopScanner} className="text-white">
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 relative">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

          {/* Scanner overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-32 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Scan size={32} className="mx-auto mb-2" />
                <p className="text-sm">Posicione o código de barras aqui</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-black">
          <Button onClick={captureBarcode} className="w-full bg-green-600 hover:bg-green-700" disabled={!isScanning}>
            <Camera size={20} className="mr-2" />
            Capturar Código
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">Adicionar Alimento</h1>
      </div>

      {/* Métodos de Entrada */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" className="flex flex-col gap-2 h-20 bg-transparent" onClick={handleVoiceInput}>
          <Mic size={24} />
          <span className="text-sm">Por Voz</span>
        </Button>
        <Button variant="outline" className="flex flex-col gap-2 h-20 bg-transparent" onClick={startScanner}>
          <Scan size={24} />
          <span className="text-sm">Scanner</span>
        </Button>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cadastro Manual</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Alimento</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Leite integral"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Ex: 1L, 500g, 6 unidades"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Localização</Label>
              <Select
                value={formData.location}
                onValueChange={(value: "geladeira" | "despensa") => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geladeira">Geladeira</SelectItem>
                  <SelectItem value="despensa">Despensa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expiryDate">Data de Validade</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Adicionar Alimento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
