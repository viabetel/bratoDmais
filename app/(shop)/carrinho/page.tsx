'use client'

import Link from 'next/link'
import { 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  Package, 
  Truck, 
  Shield,
  CreditCard,
  Sparkles,
  ArrowRight,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cartStore'
import { formatBRL, getPixPrice } from '@/lib/utils/format'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalPrice = getTotalPrice()
  const pixPrice = getPixPrice(totalPrice)
  const pixSavings = totalPrice - pixPrice

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Meu Carrinho</h1>
            <p className="text-muted-foreground mt-1">
              {items.length === 0 
                ? 'Seu carrinho está vazio' 
                : `${items.length} ${items.length === 1 ? 'item' : 'itens'} no carrinho`
              }
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 bg-white rounded-2xl border border-border">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Parece que você ainda não adicionou nenhum produto. Explore nossas ofertas incríveis!
            </p>
            <Link href="/busca">
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Explorar Produtos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white border border-border rounded-xl p-4 md:p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-muted rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image && item.image !== '📦' ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Código: {item.productId.slice(0, 8)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4 gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg md:text-xl font-bold text-foreground">
                          {formatBRL(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {formatBRL(item.price)} cada
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link href="/busca" className="block">
                <Button variant="outline" className="w-full mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 space-y-5">
                <h2 className="text-lg font-bold">Resumo do Pedido</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
                    <span className="font-semibold">{formatBRL(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-green-600 font-semibold">Grátis</span>
                  </div>
                </div>

                {/* Pix Discount */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700">Pague com Pix</p>
                      <p className="text-xs text-green-600">Economize {formatBRL(pixSavings)}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{formatBRL(pixPrice)}</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-border">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{formatBRL(totalPrice)}</p>
                    <p className="text-xs text-muted-foreground">
                      ou 6x de {formatBRL(totalPrice / 6)} sem juros
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 font-bold text-lg py-6"
                  >
                    Finalizar Compra
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="flex flex-col items-center text-center p-2">
                    <Shield className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Compra Segura</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <Truck className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Frete Grátis</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <CreditCard className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">6x Sem Juros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
