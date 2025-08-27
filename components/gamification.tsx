import { Trophy, Medal, Star, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Gamification() {
  const userStats = {
    level: 7,
    xp: 1250,
    nextLevelXp: 1500,
    rank: 3,
    totalUsers: 1247,
  }

  const achievements = [
    { id: 1, name: "Primeira Semana", description: "Complete 7 dias sem desperdício", earned: true, icon: "🏆" },
    { id: 2, name: "Eco Warrior", description: "Evite 10kg de CO₂", earned: true, icon: "🌱" },
    { id: 3, name: "Economista", description: "Economize R$ 100", earned: true, icon: "💰" },
    { id: 4, name: "Chef Sustentável", description: "Prepare 20 receitas sugeridas", earned: false, icon: "👨‍🍳" },
    { id: 5, name: "Zero Waste", description: "30 dias sem desperdício", earned: false, icon: "♻️" },
  ]

  const leaderboard = [
    { rank: 1, name: "Maria Silva", score: 2340, avatar: "👩" },
    { rank: 2, name: "João Santos", score: 1890, avatar: "👨" },
    { rank: 3, name: "Você", score: 1250, avatar: "😊", isUser: true },
    { rank: 4, name: "Ana Costa", score: 1120, avatar: "👩‍🦱" },
    { rank: 5, name: "Pedro Lima", score: 980, avatar: "👨‍🦲" },
  ]

  const missions = [
    { id: 1, title: "Adicione 5 novos alimentos", progress: 3, total: 5, xp: 50 },
    { id: 2, title: "Use 3 receitas sugeridas", progress: 1, total: 3, xp: 75 },
    { id: 3, title: "Evite desperdício por 7 dias", progress: 4, total: 7, xp: 100 },
  ]

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">Ranking & Conquistas</h1>
        <p className="text-sm text-gray-600">Compete com amigos e ganhe recompensas</p>
      </div>

      {/* Status do Usuário */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {userStats.level}
              </div>
              <div>
                <p className="font-bold">Nível {userStats.level}</p>
                <p className="text-sm text-gray-600">
                  #{userStats.rank} de {userStats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
            <Badge className="bg-green-600">{userStats.xp} XP</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso para o próximo nível</span>
              <span>
                {userStats.xp}/{userStats.nextLevelXp} XP
              </span>
            </div>
            <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Missões Ativas */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target size={20} />
            Missões Ativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {missions.map((mission) => (
            <div key={mission.id} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm">{mission.title}</p>
                <Badge variant="outline" className="text-xs">
                  +{mission.xp} XP
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progresso</span>
                  <span>
                    {mission.progress}/{mission.total}
                  </span>
                </div>
                <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Medal size={20} />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 border rounded-lg text-center ${
                  achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <p className="font-medium text-sm mb-1">{achievement.name}</p>
                <p className="text-xs text-gray-600">{achievement.description}</p>
                {achievement.earned && <Badge className="mt-2 bg-yellow-600 text-xs">Conquistado!</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy size={20} />
            Ranking da Comunidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.isUser ? "bg-green-50 border border-green-200" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1
                      ? "bg-yellow-400 text-yellow-900"
                      : user.rank === 2
                        ? "bg-gray-300 text-gray-700"
                        : user.rank === 3
                          ? "bg-orange-400 text-orange-900"
                          : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {user.rank}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{user.avatar}</span>
                  <span className={`font-medium ${user.isUser ? "text-green-700" : ""}`}>{user.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-500" />
                <span className="font-bold">{user.score.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
