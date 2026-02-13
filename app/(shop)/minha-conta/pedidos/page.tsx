'use client'

import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store/orderStore'
import { useUserStore } from '@/lib/store/userStore'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PedidosPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const orders = useOrderStore((state) => state.getUserOrders())

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/minha-conta">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">Nenhum pedido realizado</p>
          <Link href="/busca">
            <Button className="bg-primary hover:bg-primary text-primary-foreground">
              Começar a Comprar
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/pedido/${order.id}`}>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Número do Pedido</p>
                  <p className="font-bold text-lg">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Data</p>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Total</p>
                  <p className="font-bold text-primary">R${order.total.toFixed(2)}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs text-muted-foreground uppercase">Status</p>
                  <span
                    className={`text-xs px-3 py-1 rounded font-semibold inline-block ${
                      order.status === 'entregue'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'enviado'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'separando'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
