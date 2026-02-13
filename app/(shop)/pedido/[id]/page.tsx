'use client'

import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, Loader, Package, Truck, MapPin, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/orderStore'
import Link from 'next/link'

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const order = useOrderStore((state) => state.getOrder(orderId))

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Pedido não encontrado</h1>
        <p className="text-muted-foreground mb-8">O pedido que você procura não existe.</p>
        <Link href="/minha-conta/pedidos">
          <Button className="bg-primary hover:bg-primary text-primary-foreground">
            Ver Meus Pedidos
          </Button>
        </Link>
      </main>
    )
  }

  const statusSteps = [
    { status: 'confirmado', label: 'Confirmado', icon: CheckCircle },
    { status: 'separando', label: 'Separando', icon: Package },
    { status: 'enviado', label: 'Enviado', icon: Truck },
    { status: 'entregue', label: 'Entregue', icon: CheckCircle },
  ]

  const currentStepIndex = statusSteps.findIndex((s) => s.status === order.status)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pedido #{order.id}</h1>

      {/* Timeline */}
      <div className="mb-12 bg-card border border-border rounded-lg p-8">
        <div className="flex justify-between">
          {statusSteps.map((step, index) => {
            const IconComponent = step.icon
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.status} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    isCompleted
                      ? isCurrent
                        ? 'bg-primary text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-center">{step.label}</p>

                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute w-16 h-1 ml-24 mt-6 ${
                      index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                  <div className="w-20 h-20 bg-muted rounded flex-shrink-0 flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                    <p className="text-lg font-bold text-primary mt-2">
                      R${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Endereço de Entrega
            </h2>
            <p className="font-semibold">{order.address.name}</p>
            <p className="text-muted-foreground">
              {order.address.street}, {order.address.number}
              {order.address.complement && ` - ${order.address.complement}`}
            </p>
            <p className="text-muted-foreground">
              {order.address.neighborhood} - {order.address.city}, {order.address.state}{' '}
              {order.address.zipCode}
            </p>
          </div>

          {/* Shipping */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Método de Entrega
            </h2>
            <p className="text-sm">
              {order.shippingMethod === 'frete'
                ? 'Frete Expresso (2-3 dias úteis)'
                : 'Retirada na Loja'}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Forma de Pagamento
            </h2>
            <p className="text-sm">
              {order.paymentMethod === 'pix'
                ? 'Pix'
                : order.paymentMethod === 'credito'
                  ? 'Cartão de Crédito'
                  : 'Boleto Bancário'}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24">
            <h2 className="text-lg font-bold">Resumo Financeiro</h2>

            <div className="space-y-3 pb-4 border-b border-border">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-R${order.discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="bg-primary/10 border border-primary rounded p-3 text-center">
              <p className="text-xs text-primary mb-1">Total Pago</p>
              <p className="text-2xl font-bold text-primary">R${order.total.toFixed(2)}</p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Pedido realizado em{' '}
              {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            <Link href="/minha-conta/pedidos" className="block">
              <Button variant="outline" className="w-full">
                Ver Meus Pedidos
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button className="w-full bg-primary hover:bg-primary text-primary-foreground">
                Voltar à Loja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
