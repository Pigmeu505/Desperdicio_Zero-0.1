import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Target, Award } from "lucide-react"

export default function GamificationSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900">Gamificação Profunda</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Torne a sustentabilidade divertida com missões, conquistas e rankings comunitários
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-gray-900">Conquistas</h3>
              <p className="text-gray-600 text-sm">Desbloqueie badges especiais ao atingir metas de sustentabilidade</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-gray-900">Rankings</h3>
              <p className="text-gray-600 text-sm">Compare seu progresso com vizinhos e comunidades locais</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-gray-900">Missões</h3>
              <p className="text-gray-600 text-sm">Participe de desafios coletivos e individuais semanais</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-gray-900">Recompensas</h3>
              <p className="text-gray-600 text-sm">Ganhe pontos e troque por descontos em parceiros locais</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6 text-center">Ranking da Comunidade</h3>
          <div className="space-y-4">
            {[
              { name: "Maria Silva", score: 2450, position: 1 },
              { name: "João Santos", score: 2380, position: 2 },
              { name: "Você", score: 2120, position: 3 },
              { name: "Ana Costa", score: 1950, position: 4 },
              { name: "Pedro Lima", score: 1820, position: 5 },
            ].map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${user.name === "Você" ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"}`}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.position === 1
                        ? "bg-yellow-500 text-white"
                        : user.position === 2
                          ? "bg-gray-400 text-white"
                          : user.position === 3
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.position}
                  </span>
                  <span className={`font-medium ${user.name === "Você" ? "text-green-700" : "text-gray-900"}`}>
                    {user.name}
                  </span>
                </div>
                <span className="font-bold text-gray-900">{user.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
