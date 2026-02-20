'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Check, Truck, Wrench, Shield, Calendar } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useCompareStore } from '@/lib/store/compareStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { Product } from '@/data/products'
import { formatBRL, getDiscountPercent, getPixPrice } from '@/lib/utils/format'
import { getServicesByCategory } from '@/data/services'
import { resolveProductImage, SERVICE_TYPE_CONFIG } from '@/lib/utils/images'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'grid' | 'list'
}

function ServiceBadge({ type }: { type: keyof typeof SERVICE_TYPE_CONFIG }) {
  const config = SERVICE_TYPE_CONFIG[type]
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    installation: Wrench,
    rental: Calendar,
    maintenance: Shield,
    warranty: Shield,
    protection: Shield,
  }
  const Icon = icons[type] || Shield
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded ${config.bgClass} ${config.textClass} border ${config.borderClass}`}>
      <Icon className="w-2.5 h-2.5" />
      {config.label}
    </span>
  )
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [feedback, setFeedback] = useState<'cart' | 'favorite' | null>(null)
  const [imageError, setImageError] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isComparing = useCompareStore((state) => state.isComparing(product.id))
  const toggleCompare = useCompareStore((state) => state.toggleItem)

  const discountPercent = getDiscountPercent(product.originalPrice, product.price)
  const pixPrice = getPixPrice(product.price)
  const availableServices = getServicesByCategory(product.categorySlug)
  const serviceTypes = [...new Set(availableServices.map(s => s.type))] as Array<keyof typeof SERVICE_TYPE_CONFIG>

  const imageUrl = imageError
    ? resolveProductImage(undefined, product.categorySlug)
    : resolveProductImage(product.images, product.categorySlug)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock > 0) {
      addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: imageUrl })
      setFeedback('cart')
      setTimeout(() => setFeedback(null), 2000)
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
    setFeedback('favorite')
    setTimeout(() => setFeedback(null), 1500)
  }

  // List variant
  if (variant === 'list') {
    return (
      <Link href={`/p/${product.slug}`}>
        <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
            {discountPercent > 0 && (
              <span className="absolute top-1.5 left-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded text-[11px] font-black shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border">Esgotado</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-0.5">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-snug">{product.name}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">({product.reviews})</span>
                {product.freeShipping && (
                  <span className="ml-1 inline-flex items-center gap-0.5 text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-bold">
                    <Truck className="w-2.5 h-2.5" /> Frete Grátis
                  </span>
                )}
              </div>
              {serviceTypes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {serviceTypes.slice(0, 2).map(type => <ServiceBadge key={type} type={type} />)}
                </div>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-xs text-orange-600 font-bold mt-1">⚡ Últimas {product.stock} unidades!</p>
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-gray-900">{formatBRL(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs line-through text-gray-400">{formatBRL(product.originalPrice)}</span>
                  )}
                </div>
                <p className="text-xs text-green-600 font-bold">{formatBRL(pixPrice)} no Pix</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  feedback === 'cart'
                    ? 'bg-green-500 text-white'
                    : product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                }`}
              >
                {feedback === 'cart' ? (
                  <><Check className="w-4 h-4" />Adicionado!</>
                ) : product.stock === 0 ? (
                  'Indisponível'
                ) : (
                  <><ShoppingCart className="w-4 h-4" />Comprar</>
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid variant
  return (
    <Link href={`/p/${product.slug}`}>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col relative">
        {/* Favorite + Compare buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={handleToggleFavorite}
            className="w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm"
            aria-label="Favoritar"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleCompare(product, imageUrl)
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-colors ${
              isComparing ? 'bg-blue-600 text-white' : 'bg-white/90 hover:bg-white text-gray-400'
            }`}
            aria-label="Comparar"
            title={isComparing ? 'Remover da comparação' : 'Adicionar para comparar'}
          >
            <span className="text-[10px] font-black">{isComparing ? '✓' : '⇆'}</span>
          </button>
        </div>

        {/* Image */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-md text-xs font-black shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.freeShipping && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm flex items-center gap-0.5">
                <Truck className="w-3 h-3" /> Grátis
              </span>
            )}
            {product.condition !== 'novo' && (
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm capitalize">
                {product.condition}
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Esgotado</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wide">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-gray-500 text-xs">({product.reviews})</span>
          </div>

          {/* Service badges - cross-service integration */}
          {serviceTypes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {serviceTypes.slice(0, 3).map(type => <ServiceBadge key={type} type={type} />)}
            </div>
          )}

          {/* Low stock */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs text-orange-600 font-semibold mb-1 animate-pulse">
              ⚡ Últimas {product.stock} unidades!
            </p>
          )}

          {/* Pricing */}
          <div className="mt-auto space-y-1.5 border-t border-gray-100 pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-gray-900">{formatBRL(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs line-through text-gray-400">{formatBRL(product.originalPrice)}</span>
              )}
            </div>

            {pixPrice < product.price && (
              <div className="bg-green-50 border border-green-100 rounded-lg px-2 py-1 flex items-center gap-1.5">
                <span className="text-xs font-bold text-green-700">{formatBRL(pixPrice)}</span>
                <span className="text-[10px] text-green-600">no PIX</span>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-all duration-200 ${
                feedback === 'cart'
                  ? 'bg-green-500 text-white scale-95'
                  : product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md active:scale-95'
              }`}
            >
              {feedback === 'cart' ? (
                <><Check className="w-4 h-4" />Adicionado!</>
              ) : product.stock === 0 ? (
                'Indisponível'
              ) : (
                <><ShoppingCart className="w-4 h-4" />Comprar</>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
