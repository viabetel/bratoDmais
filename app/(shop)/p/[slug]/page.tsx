'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Star, Check, Truck, Heart, ShoppingCart, Shield, Package, ArrowLeft, Share2,
  Minus, Plus, CreditCard, Clock, MapPin, ChevronRight, Zap, Copy, MessageCircle,
  CheckCircle, AlertCircle, FileText, Wrench, ChevronDown, ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { ProductCard } from '@/components/products/ProductCard'
import { siteConfig, formatCurrency, calcPixPrice, calcInstallments, calcShipping } from '@/lib/config'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Placeholder images
function getPlaceholderImage(categorySlug: string): string {
  const categoryImages: Record<string, string> = {
    'geladeiras': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop',
    'fogoes': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
    'microondas': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop',
    'maquinas-lavar': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop',
    'ar-condicionado': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&h=600&fit=crop',
    'ventiladores': 'https://images.unsplash.com/photo-1617375407633-acd67aba7864?w=600&h=600&fit=crop',
    'tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
    'notebooks': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
    'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    'eletronicos': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop',
    'perifericos': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
    'componentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=600&fit=crop',
    'acessorios': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  }
  return categoryImages[categorySlug] || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop'
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { slug } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState<'cart' | 'favorite' | 'copied' | null>(null)
  const [cep, setCep] = useState('')
  const [shippingResult, setShippingResult] = useState<ReturnType<typeof calcShipping> | null>(null)
  const [showShipping, setShowShipping] = useState(false)
  const [extendedWarranty, setExtendedWarranty] = useState(false)
  const [installation, setInstallation] = useState(false)
  const [showSpecs, setShowSpecs] = useState(false)
  
  const product = products.find((p) => p.slug === slug)
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product?.id || ''))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-3">Produto não encontrado</h1>
          <p className="text-gray-500 mb-8">
            O produto que você procura não existe ou foi removido do catálogo.
          </p>
          <Link href="/busca">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Busca
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const imageUrl = product.images?.[0]?.startsWith('/products/') 
    ? getPlaceholderImage(product.categorySlug) 
    : product.images?.[0] || getPlaceholderImage(product.categorySlug)
  
  const pixPrice = calcPixPrice(product.price)
  const { installments, value: installmentValue } = calcInstallments(product.price)
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const savings = product.originalPrice - product.price
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  
  // Calculate total with extras
  const extrasTotal = (extendedWarranty ? siteConfig.policies.extendedWarrantyPrice : 0) + 
                     (installation ? siteConfig.policies.installationPrice : 0)
  const totalPrice = product.price * quantity + extrasTotal
  const totalPixPrice = calcPixPrice(totalPrice)

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: imageUrl,
      })
      setFeedback('cart')
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleBuyNow = () => {
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: imageUrl,
      })
      router.push('/checkout')
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    setFeedback('favorite')
    setTimeout(() => setFeedback(null), 2000)
  }

  const handleShare = async (method: 'whatsapp' | 'copy') => {
    const text = `Confira: ${product.name} por ${formatCurrency(product.price)}`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    } else {
      await navigator.clipboard.writeText(url)
      setFeedback('copied')
      setTimeout(() => setFeedback(null), 2000)
    }
  }

  const handleCalcShipping = () => {
    if (cep.length >= 8) {
      const result = calcShipping(cep, totalPrice)
      setShippingResult(result)
      setShowShipping(true)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/busca" className="hover:text-blue-600">Produtos</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/c/${product.categorySlug}`} className="hover:text-blue-600">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[300px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden aspect-square flex items-center justify-center relative group">
              <img 
                src={imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercent > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.freeShipping && (
                  <span className="bg-green-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Frete Grátis
                  </span>
                )}
                {product.condition === 'novo' && (
                  <span className="bg-blue-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                    Novo
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-all shadow-lg ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
              >
                <MessageCircle className="w-5 h-5" />
                Compartilhar no WhatsApp
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition flex items-center gap-2"
              >
                {feedback === 'copied' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                {feedback === 'copied' ? 'Copiado!' : 'Copiar Link'}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-blue-600 font-bold uppercase">{product.brand}</span>
                <span className="text-gray-300">•</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews} avaliações)
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              {/* Original Price */}
              {discountPercent > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-lg">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">
                    Economize {formatCurrency(savings)}
                  </span>
                </div>
              )}

              {/* Current Price */}
              <div className="text-4xl font-black text-gray-900 mb-3">
                {formatCurrency(product.price)}
              </div>

              {/* Pix Price */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-black text-green-700">{formatCurrency(pixPrice)}</span>
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    -{siteConfig.payment.pixDiscount}%
                  </span>
                </div>
                <p className="text-green-600 text-sm">
                  à vista no Pix - Você economiza {formatCurrency(product.price - pixPrice)}!
                </p>
              </div>

              {/* Installments */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <CreditCard className="w-5 h-5" />
                <span>
                  ou <strong>{installments}x de {formatCurrency(installmentValue)}</strong> sem juros
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-600 font-medium">Quantidade:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-bold min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Extra Services */}
              <div className="space-y-3 mb-6">
                <p className="font-semibold text-gray-900">Serviços adicionais:</p>
                
                <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer hover:border-blue-300 transition">
                  <input
                    type="checkbox"
                    checked={extendedWarranty}
                    onChange={(e) => setExtendedWarranty(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        Garantia Estendida (+{siteConfig.policies.warrantyMonths} meses)
                      </span>
                      <span className="font-bold text-blue-600">
                        +{formatCurrency(siteConfig.policies.extendedWarrantyPrice)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Proteção total contra defeitos</p>
                  </div>
                </label>

                {['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'tvs'].includes(product.categorySlug) && (
                  <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer hover:border-blue-300 transition">
                    <input
                      type="checkbox"
                      checked={installation}
                      onChange={(e) => setInstallation(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-blue-600" />
                          Instalação Profissional
                        </span>
                        <span className="font-bold text-blue-600">
                          +{formatCurrency(siteConfig.policies.installationPrice)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Instalação por técnico especializado</p>
                    </div>
                  </label>
                )}
              </div>

              {/* Total with Extras */}
              {extrasTotal > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal ({quantity}x produto + serviços):</span>
                    <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-700">
                    <span>No Pix:</span>
                    <span className="font-bold text-lg">{formatCurrency(totalPixPrice)}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-red-500/25"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  COMPRAR AGORA
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-6 text-lg rounded-xl font-bold ${
                    feedback === 'cart'
                      ? 'bg-green-500 hover:bg-green-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                  }`}
                >
                  {feedback === 'cart' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`w-full py-6 text-lg rounded-xl font-bold ${
                    isFavorite ? 'border-red-500 text-red-500' : ''
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </div>

            {/* Shipping Calculator */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Calcular Frete e Prazo
              </h3>
              
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  maxLength={8}
                />
                <Button 
                  onClick={handleCalcShipping}
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                  disabled={cep.length < 8}
                >
                  Calcular
                </Button>
              </div>

              <a 
                href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Não sei meu CEP
              </a>

              {showShipping && shippingResult && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Entrega Padrão</p>
                      <p className="text-sm text-gray-500">{siteConfig.shipping.standardDeliveryDays}</p>
                    </div>
                    <span className={`font-bold ${shippingResult.free ? 'text-green-600' : 'text-gray-900'}`}>
                      {shippingResult.free ? 'GRÁTIS' : formatCurrency(shippingResult.standard.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        Entrega Expressa
                      </p>
                      <p className="text-sm text-gray-500">{siteConfig.shipping.expressDeliveryDays}</p>
                    </div>
                    <span className={`font-bold ${shippingResult.free ? 'text-green-600' : 'text-gray-900'}`}>
                      {shippingResult.free ? 'GRÁTIS' : formatCurrency(shippingResult.express.price)}
                    </span>
                  </div>
                  {shippingResult.free && (
                    <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Parabéns! Você ganhou frete grátis!
                    </p>
                  )}
                </div>
              )}

              {siteConfig.shipping.pickupAvailable && (
                <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                    <MapPin className="w-4 h-4" />
                    Retirada na Loja - GRÁTIS
                  </div>
                  <p className="text-sm text-orange-600">
                    Retire em {siteConfig.contact.city} - {siteConfig.contact.state}
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border-2 border-gray-100 p-4 text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">Compra Segura</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-100 p-4 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">{siteConfig.policies.warrantyMonths} meses garantia</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-gray-100 p-4 text-center">
                <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">{siteConfig.policies.returnDays} dias p/ troca</p>
              </div>
            </div>

            {/* Policies Links */}
            <div className="flex flex-wrap gap-3">
              <Link href="/trocas-e-devolucoes" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Política de Trocas
              </Link>
              <Link href="/formas-de-pagamento" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Formas de Pagamento
              </Link>
              <Link href="/frete-e-entrega" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Frete e Entrega
              </Link>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descrição do Produto</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <button 
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full flex items-center justify-between text-xl font-bold text-gray-900 mb-4"
              >
                Especificações Técnicas
                {showSpecs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showSpecs && (
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Help CTA */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Precisa de ajuda?</h3>
              <p className="text-gray-600">Nossa equipe está pronta para atender você!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
            <Link href="/contato">
              <Button variant="outline">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
