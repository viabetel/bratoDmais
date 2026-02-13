'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, 
  ChevronRight, Package, Shield, Zap, Gift, X, Check, Share2,
  Copy, MessageCircle, ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cartStore'
import { products } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { siteConfig, formatCurrency, calcPixPrice, calcInstallments, calcShipping } from '@/lib/config'

// Prevent static pre-rendering
export const dynamic = 'force-dynamic'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState<string | null>(null)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [cep, setCep] = useState('')
  const [shippingResult, setShippingResult] = useState<ReturnType<typeof calcShipping> | null>(null)
  const [selectedShipping, setSelectedShipping] = useState<'standard' | 'express' | 'pickup'>('standard')
  const [linkCopied, setLinkCopied] = useState(false)

  const subtotal = getTotalPrice()
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0 // 10% de desconto com cupom
  const shippingCost = shippingResult 
    ? (selectedShipping === 'pickup' ? 0 : (shippingResult.free ? 0 : (selectedShipping === 'express' ? shippingResult.express.price : shippingResult.standard.price)))
    : 0
  const total = subtotal - couponDiscount + shippingCost
  const pixPrice = calcPixPrice(total)
  const { installments, value: installmentValue } = calcInstallments(total)

  // Cross-sell products (products not in cart)
  const cartProductIds = items.map(i => i.productId)
  const crossSellProducts = products
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 4)

  const handleApplyCoupon = () => {
    setCouponError(null)
    if (couponCode.toUpperCase() === 'PRIMEIRA10' || couponCode.toUpperCase() === 'DESCONTO10') {
      setCouponApplied(couponCode.toUpperCase())
      setCouponCode('')
    } else {
      setCouponError('Cupom inválido ou expirado')
    }
  }

  const handleRemoveCoupon = () => {
    setCouponApplied(null)
  }

  const handleCalcShipping = () => {
    if (cep.length >= 8) {
      const result = calcShipping(cep, subtotal)
      setShippingResult(result)
    }
  }

  const handleShareCart = async (method: 'copy' | 'whatsapp') => {
    const cartItems = items.map(i => `- ${i.name} (${i.quantity}x)`).join('\n')
    const text = `Meu carrinho no ${siteConfig.name}:\n${cartItems}\n\nTotal: ${formatCurrency(total)}`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`, '_blank')
    } else {
      await navigator.clipboard.writeText(url)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Seu carrinho está vazio</h1>
            <p className="text-gray-500 mb-8">
              Adicione produtos ao carrinho para continuar comprando.
            </p>
            <Link href="/busca">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                Ver Produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Carrinho</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Meu Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleShareCart('copy')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              {linkCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {linkCopied ? 'Copiado!' : 'Salvar Carrinho'}
            </button>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition"
            >
              <Trash2 className="w-4 h-4" />
              Limpar
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = products.find(p => p.id === item.productId)
              return (
                <div 
                  key={item.productId} 
                  className="bg-white rounded-2xl border-2 border-gray-100 p-4 flex gap-4"
                >
                  <Link href={`/p/${product?.slug || ''}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link href={`/p/${product?.slug || ''}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                    </Link>
                    {product && (
                      <p className="text-xs text-blue-600 font-medium mb-2">{product.brand}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1.5 font-medium min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {formatCurrency(calcPixPrice(item.price * item.quantity))} no Pix
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Continue Shopping */}
            <Link href="/busca" className="block">
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 transition">
                <ArrowLeft className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Continuar comprando</p>
              </div>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Shipping Calculator */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Calcular Frete
              </h3>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                  maxLength={8}
                />
                <Button 
                  onClick={handleCalcShipping}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={cep.length < 8}
                >
                  OK
                </Button>
              </div>

              {shippingResult && (
                <div className="space-y-2 mt-4">
                  <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    selectedShipping === 'standard' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === 'standard'}
                        onChange={() => setSelectedShipping('standard')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Entrega Padrão</p>
                        <p className="text-xs text-gray-500">{siteConfig.shipping.standardDeliveryDays}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${shippingResult.free ? 'text-green-600' : ''}`}>
                      {shippingResult.free ? 'GRÁTIS' : formatCurrency(shippingResult.standard.price)}
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    selectedShipping === 'express' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === 'express'}
                        onChange={() => setSelectedShipping('express')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm flex items-center gap-1">
                          <Zap className="w-3 h-3 text-blue-600" />
                          Entrega Expressa
                        </p>
                        <p className="text-xs text-gray-500">{siteConfig.shipping.expressDeliveryDays}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm ${shippingResult.free ? 'text-green-600' : ''}`}>
                      {shippingResult.free ? 'GRÁTIS' : formatCurrency(shippingResult.express.price)}
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    selectedShipping === 'pickup' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === 'pickup'}
                        onChange={() => setSelectedShipping('pickup')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Retirar na Loja</p>
                        <p className="text-xs text-gray-500">{siteConfig.contact.city}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-green-600">GRÁTIS</span>
                  </label>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Cupom de Desconto
              </h3>
              
              {couponApplied ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">{couponApplied}</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-gray-400 hover:text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm uppercase"
                    />
                    <Button 
                      onClick={handleApplyCoupon}
                      size="sm"
                      variant="outline"
                      className="border-2"
                      disabled={!couponCode}
                    >
                      Aplicar
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-2">{couponError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Dica: Use <strong>PRIMEIRA10</strong> para 10% de desconto!
                  </p>
                </>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} itens)</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto do cupom</span>
                    <span className="font-medium">-{formatCurrency(couponDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                    {shippingResult ? (shippingCost === 0 ? 'GRÁTIS' : formatCurrency(shippingCost)) : 'Calcular'}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Pix Price */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      No Pix
                    </span>
                    <span className="text-xl font-bold text-green-700">{formatCurrency(pixPrice)}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Economize {formatCurrency(total - pixPrice)} pagando à vista!
                  </p>
                </div>

                <p className="text-gray-500 text-center">
                  ou {installments}x de <strong>{formatCurrency(installmentValue)}</strong> sem juros
                </p>
              </div>

              {/* Checkout Button */}
              <Button 
                onClick={() => router.push('/checkout')}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-500/25"
              >
                Finalizar Compra
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  Compra Segura
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-blue-500" />
                  {siteConfig.policies.returnDays} dias p/ troca
                </span>
              </div>
            </div>

            {/* Free shipping progress */}
            {!shippingResult?.free && subtotal < siteConfig.shipping.freeShippingMinimum && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Frete Grátis</span>
                </div>
                <p className="text-sm text-yellow-700 mb-2">
                  Faltam <strong>{formatCurrency(siteConfig.shipping.freeShippingMinimum - subtotal)}</strong> para ganhar frete grátis!
                </p>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / siteConfig.shipping.freeShippingMinimum) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cross-sell */}
        {crossSellProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quem comprou também levou</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {crossSellProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
