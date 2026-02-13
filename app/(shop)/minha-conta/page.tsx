'use client'

import { useRouter } from 'next/navigation'
import { LogOut, ShoppingBag, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/store/userStore'
import { useOrderStore } from '@/lib/store/orderStore'

export default function MinhaContaPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const orders = useOrderStore((state) => state.getUserOrders())

  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minha Conta</h1>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-1">Bem-vindo, {user?.name}!</h2>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>

      {/* Menu */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/minha-conta/pedidos">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
            <ShoppingBag className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-1">Meus Pedidos</h3>
            <p className="text-sm text-muted-foreground">{orders.length} pedidos</p>
          </div>
        </Link>

        <Link href="/minha-conta/enderecos">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
            <MapPin className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-1">Endereços</h3>
            <p className="text-sm text-muted-foreground">Gerenciar endereços</p>
          </div>
        </Link>

        <Link href="/minha-conta/dados">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
            <User className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-1">Dados Pessoais</h3>
            <p className="text-sm text-muted-foreground">Editar informações</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Últimos Pedidos</h2>
          <div className="grid gap-4">
            {orders.slice(0, 5).map((order) => (
              <Link key={order.id} href={`/pedido/${order.id}`}>
                <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-primary transition-all cursor-pointer flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Pedido {order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">R${order.total.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.status === 'entregue'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'enviado'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
