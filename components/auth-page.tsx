"use client"

import type React from "react"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Eye, EyeOff, Check, X } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isEmailValid = email.includes("@") && email.includes(".")
  const isPasswordValid = password.length >= 6
  const isPasswordMatch = password === confirmPassword && confirmPassword.length > 0

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        })
        if (error) throw error
        setMessage("Conta criada com sucesso!")
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Desperdício Zero</h1>
          <p className="text-green-600 mt-2">Gerencie seus alimentos de forma inteligente</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Entrar" : "Criar Conta"}</CardTitle>
            <CardDescription>{isLogin ? "Entre na sua conta" : "Crie sua conta gratuita"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={email.length > 0 ? (isEmailValid ? "border-green-500" : "border-red-500") : ""}
                  />
                  {email.length > 0 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isEmailValid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={password.length > 0 ? (isPasswordValid ? "border-green-500" : "border-red-500") : ""}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {password.length > 0 && (
                      <>
                        {isPasswordValid ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {password.length > 0 && !isPasswordValid && (
                  <p className="text-xs text-red-500 mt-1">Senha deve ter pelo menos 6 caracteres</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={
                        confirmPassword.length > 0 ? (isPasswordMatch ? "border-green-500" : "border-red-500") : ""
                      }
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {confirmPassword.length > 0 && (
                        <>
                          {isPasswordMatch ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {confirmPassword.length > 0 && !isPasswordMatch && (
                    <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
                  )}
                </div>
              )}

              {message && (
                <p className={`text-sm ${message.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || (!isLogin && (!isPasswordMatch || !isPasswordValid || !isEmailValid))}
              >
                {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setPassword("")
                  setConfirmPassword("")
                  setMessage("")
                }}
                className="text-sm text-green-600 hover:underline transition-colors"
              >
                {isLogin ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
