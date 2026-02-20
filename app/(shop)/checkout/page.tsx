'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronRight, 
  MapPin, 
  Truck, 
  CreditCard, 
  Check, 
  Package,
  Shield,
  Clock,
  ArrowLeft,
  Sparkles,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cartStore'
import { useUserStore } from '@/lib/store/userStore'
import { useAddressStore } from '@/lib/store/addressStore'
import { useOrderStore } from '@/lib/store/orderStore'
import { formatBRL, getPixPrice } from '@/lib/utils/format'

type CheckoutStep = 'address' | 'shipping' | 'payment'

const steps = [
  { id: 'address', label: 'Endereço', icon: MapPin },
  { id: 'shipping', label: 'Entrega', icon: Truck },
  { id: 'payment', label: 'Pagamento', icon: CreditCard },
]

export default function CheckoutPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const user = useUserStore((state) => state.user)

  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  const addresses = useAddressStore((state) => state.addresses)
  const createOrder = useOrderStore((state) => state.createOrder)

  const [step, setStep] = useState<CheckoutStep>('address')
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [selectedShipping, setSelectedShipping] = useState<'frete' | 'retirada'>('frete')
  const [selectedPayment, setSelectedPayment] = useState<'pix' | 'credito' | 'boleto'>('pix')
  const [isProcessing, setIsProcessing] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [installmentCount, setInstallmentCount] = useState(1)

  const maxInstallments = Math.min(6, Math.floor(totalPrice / 50))
  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim()
  const formatExpiry = (v: string) =>
    v.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2')

  const totalPrice = getTotalPrice()
  const pixPrice = getPixPrice(totalPrice)
  const pixSavings = totalPrice - pixPrice

  // Allow guest checkout - just redirect if explicitly not logged in AND cart empty
  // Redirect if empty cart
  useEffect(() => {
    if (items.length === 0) {
      router.push('/carrinho')
    }
  }, [items, router])

  if (items.length === 0) {
    return null
  }

  const handleConfirmOrder = async () => {
    const address = addresses.find((a) => a.id === selectedAddress)
    if (!address) return

    setIsProcessing(true)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const orderId = createOrder({
      items,
      subtotal: totalPrice,
      discount: selectedPayment === 'pix' ? pixSavings : 0,
      total: selectedPayment === 'pix' ? pixPrice : totalPrice,
      paymentMethod: selectedPayment,
      shippingMethod: selectedShipping,
      address,
      status: 'confirmado',
    })

    clearCart()
    router.push(`/pedido/${orderId}`)
  }

  const currentStepIndex = steps.findIndex(s => s.id === step)

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground text-sm">Finalize sua compra com segurança</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, index) => {
            const Icon = s.icon
            const isActive = s.id === step
            const isCompleted = index < currentStepIndex
            
            return (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (isCompleted) setStep(s.id as CheckoutStep)
                  }}
                  disabled={!isCompleted && !isActive}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : isCompleted
                      ? 'bg-green-500 text-white cursor-pointer'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="font-medium hidden sm:inline">{s.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: Address */}
            {step === 'address' && (
              <div className="bg-white border border-border rounded-2xl p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Endereço de Entrega
                </h2>

                {/* Guest checkout notice */}
                {!isLoggedIn && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">Comprando como convidado</p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Você pode finalizar a compra sem criar conta.{' '}
                        <Link href="/login?redirect=/checkout" className="underline font-medium">
                          Entrar ou criar conta
                        </Link>{' '}
                        para salvar endereços e acompanhar pedidos.
                      </p>
                    </div>
                  </div>
                )}

                {addresses.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Nenhum endereço cadastrado</p>
                    <Link href="/minha-conta/enderecos">
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Endereço
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedAddress === addr.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mt-1 accent-primary"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{addr.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {addr.street}, {addr.number}
                            {addr.complement && ` - ${addr.complement}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {addr.neighborhood} - {addr.city}, {addr.state}
                          </p>
                          <p className="text-sm text-muted-foreground">CEP: {addr.zipCode}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                <Button
                  onClick={() => selectedAddress && setStep('shipping')}
                  disabled={!selectedAddress}
                  className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 font-semibold"
                >
                  Continuar para Entrega
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* STEP 2: Shipping */}
            {step === 'shipping' && (
              <div className="bg-white border border-border rounded-2xl p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Método de Entrega
                </h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedShipping === 'frete' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="frete"
                      checked={selectedShipping === 'frete'}
                      onChange={(e) => setSelectedShipping(e.target.value as any)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        <p className="font-semibold">Entrega Expressa</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          GRÁTIS
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Receba em 2-5 dias úteis
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedShipping === 'retirada' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="retirada"
                      checked={selectedShipping === 'retirada'}
                      onChange={(e) => setSelectedShipping(e.target.value as any)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-600" />
                        <p className="font-semibold">Retirada na Loja</p>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                          GRÁTIS
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disponível para retirada amanhã
                      </p>
                    </div>
                  </label>
                </div>

                <Button
                  onClick={() => setStep('payment')}
                  className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 font-semibold"
                >
                  Continuar para Pagamento
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 'payment' && (
              <div className="bg-white border border-border rounded-2xl p-6 md:p-8 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Forma de Pagamento
                </h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'pix' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-border hover:border-green-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={selectedPayment === 'pix'}
                      onChange={(e) => setSelectedPayment(e.target.value as any)}
                      className="mt-1 accent-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">PIX</span>
                        </div>
                        <p className="font-semibold">Pix</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          10% OFF
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-600 mt-2">{formatBRL(pixPrice)}</p>
                      <p className="text-xs text-green-600">Economia de {formatBRL(pixSavings)}</p>
                    </div>
                  </label>

                  <div className={`border-2 rounded-xl transition-all ${selectedPayment === 'credito' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <label className="flex items-start gap-4 p-4 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="credito"
                        checked={selectedPayment === 'credito'}
                        onChange={(e) => setSelectedPayment(e.target.value as any)}
                        className="mt-1 accent-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" />
                          <p className="font-semibold">Cartão de Crédito</p>
                          <div className="flex gap-1 ml-auto">
                            {['Visa', 'MC', 'Elo'].map(b => (
                              <span key={b} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">{b}</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-lg font-bold mt-1">{formatBRL(totalPrice)}</p>
                        <p className="text-sm text-muted-foreground">em até {maxInstallments}x de {formatBRL(totalPrice / maxInstallments)} sem juros</p>
                      </div>
                    </label>

                    {/* Card form — appears when selected */}
                    {selectedPayment === 'credito' && (
                      <div className="px-4 pb-4 space-y-3 border-t border-primary/20 pt-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Número do Cartão</label>
                          <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Nome no Cartão</label>
                          <input
                            type="text"
                            placeholder="NOME COMO ESTÁ NO CARTÃO"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm uppercase focus:border-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Validade</label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              maxLength={5}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              maxLength={4}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Parcelas</label>
                          <select
                            value={installmentCount}
                            onChange={(e) => setInstallmentCount(Number(e.target.value))}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none bg-white"
                          >
                            {Array.from({ length: maxInstallments }, (_, i) => i + 1).map(n => (
                              <option key={n} value={n}>
                                {n}x de {formatBRL(totalPrice / n)} {n === 1 ? '— sem juros (à vista)' : '— sem juros'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <label
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'boleto' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="boleto"
                      checked={selectedPayment === 'boleto'}
                      onChange={(e) => setSelectedPayment(e.target.value as any)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <p className="font-semibold">Boleto Bancário</p>
                      </div>
                      <p className="text-lg font-bold mt-2">{formatBRL(totalPrice)}</p>
                      <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                    </div>
                  </label>
                </div>

                <Button
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 h-14 bg-green-600 hover:bg-green-700 font-bold text-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Confirmar Pedido
                    </>
                  )}
                </Button>

                {/* Security trust row */}
                <div className="mt-4 bg-gray-50 rounded-xl p-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Shield className="w-4 h-4 text-green-500" />
                    SSL Seguro
                  </span>
                  <span className="flex items-center gap-1">
                    🔒 Dados criptografados
                  </span>
                  <span className="flex items-center gap-1">
                    ✓ Ambiente 100% seguro
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {['Visa', 'Mastercard', 'Elo', 'Pix', 'Boleto'].map((brand) => (
                    <span key={brand} className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 space-y-5">
              <h2 className="text-lg font-bold">Resumo do Pedido</h2>

              {/* Items */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image && item.image !== '📦' ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Package className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatBRL(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatBRL(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                {selectedPayment === 'pix' && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto Pix</span>
                    <span>-{formatBRL(pixSavings)}</span>
                  </div>
                )}
              </div>

              {/* Final Total */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total a pagar</p>
                <p className="text-3xl font-bold text-primary">
                  {formatBRL(selectedPayment === 'pix' ? pixPrice : totalPrice)}
                </p>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Compra Segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
