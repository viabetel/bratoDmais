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
import { getServicesByType } from '@/data/services'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { InstallationModule } from '@/components/services/InstallationModule'
import { MaintenanceModule } from '@/components/services/MaintenanceModule'
import { RentalModule } from '@/components/services/RentalModule'
import { ProductCard } from '@/components/products/ProductCard'
import { siteConfig, formatCurrency, calcPixPrice, calcInstallments, calcShipping } from '@/lib/config'
import { resolveProductImage } from '@/lib/utils/images'
import { StickyBuyBar } from '@/components/product/StickyBuyBar'
import { ComprJunto } from '@/components/product/ComprJunto'
import { RecentlyViewed, useRegisterView } from '@/components/product/RecentlyViewed'
import { ReviewsSection } from '@/components/product/ReviewsSection'
import { QASection } from '@/components/product/QASection'

interface ProductPageProps {
  params: Promise<{ slug: string }>
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
  const [showSpecs, setShowSpecs] = useState(true)
  const [selectedServices, setSelectedServices] = useState<Array<{serviceId: string; serviceName: string; servicePrice: number; serviceType: string}>>([])
  const [activeGalleryImage, setActiveGalleryImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'descricao' | 'specs' | 'reviews'>('descricao')
  
  const product = products.find((p) => p.slug === slug)
  const addItem = useCartStore((state) => state.addItem)
  const addServiceToProduct = useCartStore((state) => state.addServiceToProduct)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product?.id || ''))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  // Track this product as recently viewed
  useRegisterView(product?.id || '')

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

  const imageUrl = resolveProductImage(product.images, product.categorySlug, 'lg')
  
  // Generate multiple gallery images (simulate multiple product angles)
  const galleryImages = Array.from({ length: Math.min(4, Math.max(2, product.reviews > 100 ? 4 : 2)) }, (_, i) =>
    resolveProductImage(product.images, product.categorySlug, i === 0 ? 'lg' : 'md')
  )
  
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
      // Add services selected on this page to the cart item
      if (extendedWarranty) {
        addServiceToProduct(product.id, {
          serviceId: 'warranty-ext',
          serviceName: `Garantia Estendida 12m`,
          servicePrice: siteConfig.policies.extendedWarrantyPrice,
          serviceType: 'warranty',
        })
      }
      if (installation) {
        addServiceToProduct(product.id, {
          serviceId: 'installation-std',
          serviceName: 'Instalação Profissional',
          servicePrice: siteConfig.policies.installationPrice,
          serviceType: 'installation',
        })
      }
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
      if (extendedWarranty) {
        addServiceToProduct(product.id, {
          serviceId: 'warranty-ext',
          serviceName: `Garantia Estendida 12m`,
          servicePrice: siteConfig.policies.extendedWarrantyPrice,
          serviceType: 'warranty',
        })
      }
      if (installation) {
        addServiceToProduct(product.id, {
          serviceId: 'installation-std',
          serviceName: 'Instalação Profissional',
          servicePrice: siteConfig.policies.installationPrice,
          serviceType: 'installation',
        })
      }
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

      <div className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Gallery */}
          <div className="space-y-2">
<<<<<<< HEAD
            {/* Main image */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden aspect-square flex items-center justify-center relative group">
=======
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden aspect-square flex items-center justify-center relative group">
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
              <img 
                src={galleryImages[activeGalleryImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
              
              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                🔍 Zoom
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {discountPercent > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.freeShipping && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-0.5">
                    <Truck className="w-3 h-3" />
                    Frete Grátis
                  </span>
                )}
                {product.condition === 'novo' && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                    Novo
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full transition-all shadow-sm ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Gallery nav arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveGalleryImage(i => (i - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setActiveGalleryImage(i => (i + 1) % galleryImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      activeGalleryImage === idx
                        ? 'border-blue-500 shadow-md shadow-blue-100'
                        : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} - foto ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
<<<<<<< HEAD
                Compartilhar
=======
                WhatsApp
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition flex items-center gap-1"
              >
                {feedback === 'copied' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {feedback === 'copied' ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            {/* Compre Junto */}
            <ComprJunto mainProduct={product} />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-blue-600 font-bold uppercase">{product.brand}</span>
                <span className="text-gray-300">•</span>
                <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-0">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {product.rating.toFixed(1)} ({product.reviews})
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              {/* Original Price */}
              {discountPercent > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 line-through text-sm">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">
                    Economize {formatCurrency(savings)}
                  </span>
                </div>
              )}

              {/* Current Price */}
              <div className="text-3xl font-black text-gray-900 mb-2">
                {formatCurrency(product.price)}
              </div>

              {/* Pix Price */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-xl font-black text-green-700">{formatCurrency(pixPrice)}</span>
                  <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    -{siteConfig.payment.pixDiscount}%
                  </span>
                </div>
                <p className="text-green-600 text-xs">
                  à vista no Pix - Economiza {formatCurrency(product.price - pixPrice)}!
                </p>
              </div>

              {/* Installments */}
              <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                ou <strong>{installments}x</strong> de <strong>{formatCurrency(installmentValue)}</strong> sem juros
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-gray-600">Qtd:</span>
                <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 hover:bg-gray-100 transition text-xs"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-2.5 py-1 font-bold text-xs min-w-[30px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-2 py-1 hover:bg-gray-100 transition text-xs"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

<<<<<<< HEAD
              {/* Extra Services - Dynamic from category */}
              <div className="space-y-2 mb-4 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">Adicionar serviços:</p>
                  <Link href={`/busca?service=installation&categoria=${product.categorySlug}`} className="text-xs text-blue-600 hover:underline">Ver todos</Link>
                </div>
                
                <label className="flex items-start gap-2 p-2.5 border rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition text-xs group">
=======
              {/* Extra Services */}
              <div className="space-y-2 mb-4 border-t border-gray-100 pt-3">
                <p className="font-semibold text-gray-900 text-sm">Serviços:</p>
                
                <label className="flex items-start gap-2 p-2 border rounded cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition text-xs">
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                  <input
                    type="checkbox"
                    checked={extendedWarranty}
                    onChange={(e) => setExtendedWarranty(e.target.checked)}
<<<<<<< HEAD
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-gray-900 group-hover:text-blue-700">🛡️ Garantia Estendida 12m</span>
                      <span className="font-bold text-blue-600 flex-shrink-0">+{formatCurrency(siteConfig.policies.extendedWarrantyPrice)}</span>
                    </div>
                    <p className="text-gray-500 mt-0.5">Proteção extra contra defeitos de fabricação</p>
                  </div>
                </label>

                {['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'tvs', 'climatizacao', 'microondas', 'fogoes'].includes(product.categorySlug) && (
                  <label className="flex items-start gap-2 p-2.5 border rounded-lg cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition text-xs group">
=======
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-medium text-gray-900">Garantia +{siteConfig.policies.warrantyMonths}m</span>
                      <span className="font-bold text-blue-600 flex-shrink-0">+{formatCurrency(siteConfig.policies.extendedWarrantyPrice)}</span>
                    </div>
                  </div>
                </label>

                {['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'tvs'].includes(product.categorySlug) && (
                  <label className="flex items-start gap-2 p-2 border rounded cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition text-xs">
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                    <input
                      type="checkbox"
                      checked={installation}
                      onChange={(e) => setInstallation(e.target.checked)}
<<<<<<< HEAD
                      className="mt-0.5 w-4 h-4 text-orange-600 rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-gray-900 group-hover:text-orange-700">🔧 Instalação Profissional</span>
                        <span className="font-bold text-orange-600 flex-shrink-0">+{formatCurrency(siteConfig.policies.installationPrice)}</span>
                      </div>
                      <p className="text-gray-500 mt-0.5">Técnico certificado com garantia de serviço</p>
=======
                      className="mt-0.5 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium text-gray-900">Instalação</span>
                        <span className="font-bold text-blue-600 flex-shrink-0">+{formatCurrency(siteConfig.policies.installationPrice)}</span>
                      </div>
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                    </div>
                  </label>
                )}
              </div>

              {/* Total with Extras */}
              {extrasTotal > 0 && (
                <div className="bg-blue-50 rounded p-2 mb-3 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Total ({quantity}x):</span>
                    <span className="font-bold">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-700">
                    <span>Pix:</span>
                    <span className="font-bold">{formatCurrency(totalPixPrice)}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
<<<<<<< HEAD
                {/* Urgency / social proof */}
                {product.stock > 0 && product.stock <= 8 && (
                  <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-xs text-orange-700 font-semibold">
                      Restam apenas <strong>{product.stock} unidades</strong> — peça logo!
                    </span>
                  </div>
                )}
                {product.stock > 8 && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 py-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                    <span>{12 + Math.floor(product.reviews / 10)} pessoas estão vendo agora</span>
                  </div>
                )}

                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-sm rounded-lg shadow-md shadow-red-500/20 transition-all active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 mr-1.5" />
                  COMPRAR AGORA
=======
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-sm rounded shadow-lg shadow-red-500/25"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  COMPRAR
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                </Button>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
<<<<<<< HEAD
                  className={`w-full py-3 text-sm rounded-lg font-bold transition-all active:scale-[0.98] ${
=======
                  className={`w-full py-3 text-sm rounded font-bold ${
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                    feedback === 'cart'
                      ? 'bg-green-500 hover:bg-green-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  {feedback === 'cart' ? (
<<<<<<< HEAD
                    <><CheckCircle className="w-4 h-4 mr-1.5 inline" />Adicionado ao carrinho!</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-1.5 inline" />Adicionar ao Carrinho</>
=======
                    <>
                      <CheckCircle className="w-4 h-4 mr-1 inline" />
                      Adicionado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-1 inline" />
                      Carrinho
                    </>
>>>>>>> 18863e85927b05c2b3a318e701f2d129ca350308
                  )}
                </Button>

                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`w-full py-2 text-sm rounded-lg font-semibold transition-all ${
                    isFavorite
                      ? 'border-red-300 text-red-500 bg-red-50/60 hover:bg-red-50'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-1.5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Salvo nos Favoritos' : 'Salvar nos Favoritos'}
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

        {/* Service Modules */}
        <div className="mt-12 space-y-6">
          {/* Installation Module */}
          {['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'tvs', 'climatizacao'].includes(product.categorySlug) && (
            <InstallationModule 
              categorySlug={product.categorySlug}
              productName={product.name}
              basePrice={product.price}
              onSelect={(service) => {
                setSelectedServices([...selectedServices, {
                  serviceId: service.id,
                  serviceName: service.name,
                  servicePrice: service.price,
                  serviceType: 'installation'
                }])
              }}
            />
          )}

          {/* Maintenance Module */}
          {['geladeiras', 'ar-condicionado', 'maquinas-lavar', 'climatizacao'].includes(product.categorySlug) && (
            <MaintenanceModule 
              categorySlug={product.categorySlug}
              productName={product.name}
              onSelect={(service) => {
                setSelectedServices([...selectedServices, {
                  serviceId: service.id,
                  serviceName: service.name,
                  servicePrice: service.price,
                  serviceType: 'maintenance'
                }])
              }}
            />
          )}

          {/* Rental Module */}
          {['geladeiras', 'maquinas-lavar', 'ar-condicionado', 'climatizacao', 'tvs', 'notebooks', 'smartphones'].includes(product.categorySlug) && (
            <RentalModule 
              productId={product.id}
              productName={product.name}
              onSelect={(service) => {
                setSelectedServices([...selectedServices, {
                  serviceId: service.id,
                  serviceName: service.name,
                  servicePrice: service.price,
                  serviceType: 'rental'
                }])
              }}
            />
          )}
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mt-12">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {[
              { id: 'descricao', label: 'Descrição' },
              { id: 'specs', label: 'Especificações' },
              { id: 'reviews', label: `Avaliações (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'descricao' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <span className="text-gray-500 text-sm">{key}</span>
                  <span className="font-semibold text-gray-900 text-sm text-right">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewsSection product={product} />
          )}
        </div>

        {/* Q&A */}
        <QASection product={product} />

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

        {/* Recently Viewed */}
        <RecentlyViewed excludeId={product.id} />

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

      {/* Sticky buy bar - mobile only */}
      <StickyBuyBar
        productName={product.name}
        price={product.price}
        pixPrice={pixPrice}
        stock={product.stock}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </main>
  )
}
