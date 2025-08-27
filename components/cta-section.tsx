import { Button } from "@/components/ui/button"
import { Download, Star } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white">
            Comece Hoje Mesmo a Reduzir o Desperdício
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Junte-se a milhares de famílias que já estão economizando dinheiro e ajudando o meio ambiente com o
            Desperdício Zero.
          </p>

          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-medium">4.8/5</span>
            </div>
            <div className="text-white">
              <span className="font-bold">50k+</span> downloads
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Baixar para Android
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 font-semibold bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar para iOS
            </Button>
          </div>

          <p className="text-sm text-green-100 mt-6">Gratuito para download • Sem anúncios • Privacidade garantida</p>
        </div>
      </div>
    </section>
  )
}
