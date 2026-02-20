'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, Package, Truck, MapPin, CreditCard, MessageCircle, Home, Star, Copy, Check, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/orderStore'
import { products } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { formatBRL } from '@/lib/utils/format'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

const PAYMENT_LABELS: Record<string, string> = {
  pix: 'Pix',
  credito: 'Cartão de Crédito',
  boleto: 'Boleto Bancário',
}

const PAYMENT_INSTRUCTIONS: Record<string, string> = {
  pix: 'Seu pagamento Pix foi recebido e o pedido já está sendo separado.',
  credito: 'Pagamento aprovado. Seu pedido será enviado em breve.',
  boleto: 'Seu boleto vence em 3 dias úteis. Após o pagamento o pedido será processado.',
}

const STATUS_STEPS = [
  { id: 'confirmado', label: 'Confirmado', icon: CheckCircle, color: 'bg-green-500' },
  { id: 'separando', label: 'Separando', icon: Package, color: 'bg-blue-500' },
  { id: 'enviado', label: 'Enviado', icon: Truck, color: 'bg-purple-500' },
  { id: 'entregue', label: 'Entregue', icon: CheckCircle, color: 'bg-green-600' },
]

function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className="absolute w-2 h-2 rounded-sm animate-bounce" style={style} />
}

export default function OrderPage() {
  const params = useParams()
  const orderId = params.id as string
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const order = useOrderStore((state) => state.getOrder(orderId))

  useEffect(() => {
    // Trigger success animation after mount
    const t = setTimeout(() => setShowAnimation(true), 100)
    return () => clearTimeout(t)
  }, [])

  const copyOrderId = async () => {
    await navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-3">Pedido não encontrado</h1>
        <p className="text-gray-500 mb-6">O pedido que você procura não existe.</p>
        <Link href="/minha-conta/pedidos">
          <Button>Ver Meus Pedidos</Button>
        </Link>
      </main>
    )
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.status === order.status) || 0
  const estimatedDate = new Date()
  estimatedDate.setDate(estimatedDate.getDate() + (order.shippingMethod === 'frete' ? 5 : 0))
  const formattedDate = estimatedDate.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

  // Cross-sell: products from same category not in order
  const orderProductIds = order.items.map(i => i.productId)
  const crossSell = products.filter(p => !orderProductIds.includes(p.id)).slice(0, 4)

  const confettiColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  const confettiItems = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 8.3)}%`,
    top: `${Math.random() * 60}%`,
    backgroundColor: confettiColors[i % confettiColors.length],
    animationDelay: `${i * 0.1}s`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }))

  return (
    <main className="min-h-screen bg-gray-50/60 pb-16">
      {/* ===== HERO SUCCESS SECTION ===== */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 text-white transition-all duration-700 ${showAnimation ? 'py-14 md:py-20' : 'py-8'}`}>
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {confettiItems.map((style, i) => <ConfettiPiece key={i} style={style} />)}
        </div>

        {/* Animated circles bg */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          {/* Animated checkmark */}
          <div className={`transition-all duration-500 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-black/20">
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-600" />
            </div>
          </div>

          <div className={`transition-all duration-500 delay-200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-green-100 font-semibold text-sm uppercase tracking-widest mb-2">Pedido realizado com sucesso!</p>
            <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
              Obrigado, {order.address?.name?.split(' ')[0] || 'cliente'}! 🎉
            </h1>
            <p className="text-green-100 text-base md:text-lg max-w-lg mx-auto mb-5">
              {PAYMENT_INSTRUCTIONS[order.paymentMethod] || 'Seu pedido foi confirmado e será processado em breve.'}
            </p>

            {/* Order ID copy */}
            <button
              onClick={copyOrderId}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl px-5 py-2.5 text-sm font-bold transition-all backdrop-blur-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Pedido #{orderId}
              <span className="text-green-200 font-normal text-xs">{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ===== DELIVERY ESTIMATE ===== */}
        {order.shippingMethod === 'frete' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Previsão de entrega</p>
              <p className="text-lg font-black text-gray-900">{formattedDate}</p>
              <p className="text-xs text-gray-500">Acompanhe o status na sua conta ou no e-mail cadastrado</p>
            </div>
          </div>
        )}
        {order.shippingMethod === 'retirada' && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-0.5">Retirada na loja</p>
              <p className="font-black text-gray-900">{siteConfig.contact.address}</p>
              <p className="text-sm text-gray-600">{siteConfig.contact.city} - {siteConfig.contact.state} · Horário: {siteConfig.hours.weekdays}</p>
            </div>
          </div>
        )}

        {/* ===== PROGRESS TIMELINE ===== */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="font-black text-gray-900 mb-5 text-lg">Acompanhe seu pedido</h2>
          <div className="flex items-start gap-0">
            {STATUS_STEPS.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex
              const isLast = index === STATUS_STEPS.length - 1
              return (
                <div key={step.id} className="flex-1 flex flex-col items-center">
                  <div className="flex items-center w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                      isCompleted ? `${step.color} border-transparent text-white shadow-md` : 'border-gray-200 text-gray-300 bg-white'
                    } ${isCurrent ? 'ring-4 ring-offset-2 ring-green-200 scale-110' : ''}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {!isLast && (
                      <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-100'}`} />
                    )}
                  </div>
                  <p className={`text-xs font-semibold mt-2 text-center ${isCurrent ? 'text-green-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Order details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Items */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Itens do Pedido
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                      {item.image && !item.image.startsWith('📦') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      ) : '📦'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Quantidade: {item.quantity}</p>
                      {item.services && item.services.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.services.map(s => (
                            <span key={s.serviceId} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                              + {s.serviceName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="font-black text-gray-900 text-sm flex-shrink-0">{formatBRL(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Payment side by side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600" />Endereço de Entrega
                </h3>
                <p className="font-semibold text-sm">{order.address?.name}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {order.address?.street}, {order.address?.number}
                  {order.address?.complement && ` · ${order.address.complement}`}<br />
                  {order.address?.neighborhood} · {order.address?.city}, {order.address?.state}<br />
                  CEP {order.address?.zipCode}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4 text-blue-600" />Pagamento
                </h3>
                <p className="font-semibold text-sm">{PAYMENT_LABELS[order.paymentMethod]}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{PAYMENT_INSTRUCTIONS[order.paymentMethod]}</p>
              </div>
            </div>

            {/* Help / WhatsApp */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-900">Precisou de ajuda com seu pedido?</p>
                <p className="text-sm text-gray-600 mt-0.5">Nossa equipe está pronta para atender você no WhatsApp</p>
              </div>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Olá! Quero informações sobre meu pedido #${orderId}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-md flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: Order summary + actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-24">
              <h2 className="font-black text-gray-900 mb-4">Resumo Financeiro</h2>
              <div className="space-y-2 pb-3 border-b border-gray-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{formatBRL(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frete</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto Pix</span>
                    <span className="font-semibold">-{formatBRL(order.discount)}</span>
                  </div>
                )}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mt-4 mb-5">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide mb-1">Total pago</p>
                <p className="text-3xl font-black text-green-700">{formatBRL(order.total)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>

              <div className="space-y-2">
                <Link href="/minha-conta/pedidos" className="block">
                  <Button variant="outline" className="w-full font-semibold border-2">
                    <Package className="w-4 h-4 mr-2" />
                    Meus Pedidos
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                    <Home className="w-4 h-4 mr-2" />
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VOCÊ TAMBÉM VAI GOSTAR ===== */}
        {crossSell.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Aproveite a visita</p>
                <h2 className="text-2xl font-black text-gray-900">Você também vai gostar</h2>
              </div>
              <Link href="/busca" className="text-sm text-blue-600 hover:underline font-semibold">
                Ver tudo →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {crossSell.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
