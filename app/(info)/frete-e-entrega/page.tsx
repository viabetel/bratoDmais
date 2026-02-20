import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Truck, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frete e Entrega | Brato Mais',
  description: 'Informações sobre frete, prazos e formas de entrega',
}

export default function FreteEEntregaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frete e Entrega</h1>
          <p className="text-gray-600 mb-8">Saiba tudo sobre como entregamos seus produtos</p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Frete Grátis</h2>
              </div>
              <p className="text-gray-700">
                Oferecemos frete grátis em compras acima de <strong>R$ 299</strong> para todas as regiões do Brasil (exceto áreas muito remotas).
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Prazos de Entrega</h2>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900">Entrega Padrão: 7 dias úteis</p>
                  <p className="text-sm text-gray-600">Para a maioria das localidades do Brasil</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900">Entrega Expressa: 2-3 dias úteis</p>
                  <p className="text-sm text-gray-600">Disponível para grandes centros (taxa adicional)</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-900">Entrega Agendada</p>
                  <p className="text-sm text-gray-600">Escolha o dia e horário que preferir</p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Retire na Loja</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Compre online e retire em qualquer uma de nossas lojas físicas no mesmo dia (horário comercial).
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg">
                Localizar Lojas
              </button>
            </section>

            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Rastreamento em Tempo Real</h3>
              <p className="text-gray-700">
                Após sua compra, você recebe um código de rastreamento por email. Acompanhe seu produto a cada etapa da jornada até sua casa.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
