import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Truck, Package, Clock, MapPin, Gift, Zap } from 'lucide-react'
import { siteConfig, formatCurrency } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Frete e Entrega | ' + siteConfig.name,
  description: 'Informações sobre frete, prazos de entrega e retirada na loja.',
}

export default function FreteEEntregaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Frete e Entrega</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frete e Entrega
            </h1>
            <p className="text-gray-600 text-lg">
              Entregamos em todo o Brasil com rapidez e segurança
            </p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Frete Grátis</h2>
                <p className="text-green-100">
                  Em compras acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)} para todo o Brasil!
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Entrega Expressa</h3>
                  <p className="text-sm text-gray-500">{siteConfig.shipping.expressDeliveryDays}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Receba seu pedido o mais rápido possível. Disponível para a maioria das regiões metropolitanas.
              </p>
              <div className="bg-blue-50 rounded-lg p-3 text-sm">
                <p className="text-blue-800">
                  <strong>Custo:</strong> R$ 29,90 (grátis acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)})
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Entrega Padrão</h3>
                  <p className="text-sm text-gray-500">{siteConfig.shipping.standardDeliveryDays}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Nossa opção mais econômica. Entregamos em todo o território nacional.
              </p>
              <div className="bg-purple-50 rounded-lg p-3 text-sm">
                <p className="text-purple-800">
                  <strong>Custo:</strong> R$ 19,90 (grátis acima de {formatCurrency(siteConfig.shipping.freeShippingMinimum)})
                </p>
              </div>
            </div>
          </div>

          {/* Pickup */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Retirada na Loja</h2>
                <p className="text-gray-600 mb-4">
                  Prefere buscar? Retire seu pedido em nossa loja física sem custo de frete!
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">📍 {siteConfig.name}</p>
                  <p className="text-gray-600 text-sm">
                    {siteConfig.contact.address}<br />
                    {siteConfig.contact.city} - {siteConfig.contact.state}, {siteConfig.contact.cep}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    <strong>Horário:</strong> Seg-Sex {siteConfig.hours.weekdays} | Sáb {siteConfig.hours.saturday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Como funciona a entrega</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Confirmação do pedido</h3>
                  <p className="text-gray-600">Após o pagamento aprovado, seu pedido entra em processamento.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Preparação</h3>
                  <p className="text-gray-600">Separamos e embalamos seu produto com cuidado em até 24h.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Envio</h3>
                  <p className="text-gray-600">Você recebe o código de rastreamento por e-mail e SMS.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Entrega</h3>
                  <p className="text-gray-600">Receba em casa ou no endereço de sua escolha!</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Perguntas Frequentes</h2>
            
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Posso rastrear meu pedido?</h3>
              <p className="text-gray-600 text-sm">
                Sim! Após o envio, você receberá o código de rastreamento por e-mail. Também pode acompanhar em "Meus Pedidos".
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-900 mb-2">E se eu não estiver em casa?</h3>
              <p className="text-gray-600 text-sm">
                A transportadora fará até 3 tentativas de entrega. Você também pode optar pela retirada na loja.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Vocês entregam em todo o Brasil?</h3>
              <p className="text-gray-600 text-sm">
                Sim, entregamos em todas as regiões do país. O prazo pode variar de acordo com a localidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
