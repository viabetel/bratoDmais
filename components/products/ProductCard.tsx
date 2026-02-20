'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, ShoppingCart, Check, Package, Truck, Eye, Share2, BarChart3 } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useCompareStore } from '@/lib/store/compareStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { Product } from '@/data/products'
  product: Product
  variant?: 'default' | 'grid' | 'list'
}

// Generate a placeholder image based on product category
function getPlaceholderImage(product: Product): string {
  const categoryImages: Record<string, string> = {
    'geladeiras': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
    'fogoes': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'microondas': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
    'maquinas-lavar': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
    'ar-condicionado': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    'ventiladores': 'https://images.unsplash.com/photo-1617375407633-acd67aba7864?w=400&h=400&fit=crop',
    'tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    'notebooks': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    'eletronicos': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    'perifericos': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    'componentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop',
    'acessorios': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'climatizacao': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    'utilidades': 'https://images.unsplash.com/photo-1522869635100-ce0846b1d02d?w=400&h=400&fit=crop',
  }
  
  return categoryImages[product.categorySlug] || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop'
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [feedback, setFeedback] = useState<'cart' | 'favorite' | 'share' | 'compare' | null>(null)
  const [imageError, setImageError] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isComparing = useCompareStore((state) => state.isComparing(product.id))
  const toggleCompare = useCompareStore((state) => state.toggleItem)

  const discountPercent = getDiscountPercent(product.originalPrice, product.price)
  const pixPrice = getPixPrice(product.price)
  
  const imageUrl = imageError || !product.images?.[0] || product.images[0].startsWith('/products/') 
    ? getPlaceholderImage(product) 
    : product.images[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: imageUrl,
      })
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

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira esse produto: ${product.name} - ${formatBRL(product.price)}`,
        url: `/p/${product.slug}`
      })
    }
    setFeedback('share')
    setTimeout(() => setFeedback(null), 1500)
  }

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleCompare(product, imageUrl)
    setFeedback('compare')
    setTimeout(() => setFeedback(null), 1500)
  }

  // List variant
  if (variant === 'list') {
    return (
      <Link href={`/p/${product.slug}`}>
        <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex gap-4">
          <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden relative">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              onError={() => setImageError(true)}
            />
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            {product.freeShipping && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Frete Grátis
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                Últimas {product.stock} unidades!
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-widest">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-sm">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {product.stock > 0 ? (
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
                    Em estoque
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">
                    Esgotado
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-lg font-bold text-gray-900">{formatBRL(product.price)}</span>
                <span className="text-xs line-through text-gray-400 ml-2">{formatBRL(product.originalPrice)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              >
                {feedback === 'cart' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Adicionado!
                  </>
                ) : product.stock === 0 ? (
                  'Indisponível'
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid variant (default)
  return (
    <Link href={`/p/${product.slug}`}>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            {product.freeShipping && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Frete Grátis
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                Últimas {product.stock}!
              </span>
            )}
          </div>
          
          {/* Action Buttons - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white hover:bg-red-50 text-gray-600 hover:text-red-500'
              }`}
              aria-label={isFavorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
              title={isFavorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full backdrop-blur-sm transition-all shadow-sm"
              aria-label="Compartilhar produto"
              title="Compartilhar"
            >
              <Share2 className="w-5 h-5" aria-hidden="true" />
            </button>
            
            <button
              onClick={handleToggleCompare}
              className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
                isComparing 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white hover:bg-purple-50 text-gray-600 hover:text-purple-600'
              }`}
              aria-label={isComparing ? 'Remover de comparação' : 'Adicionar à comparação'}
              title={isComparing ? 'Remover de comparação' : 'Adicionar à comparação'}
            >
              <BarChart3 className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Quick View - Bottom Center (on hover) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
            <span className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-4 h-4" />
              Ver Detalhes
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-blue-600 font-bold mb-1.5 uppercase tracking-widest">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-3 min-h-[2rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 font-medium">({product.reviews})</span>
          </div>

          {/* Stock and Condition */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
                ✓ Em estoque
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-semibold">
                Esgotado
              </span>
            )}
            {product.condition === 'novo' && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">
                Novo
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-auto space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">
                {formatBRL(product.price)}
              </span>
              <span className="text-xs line-through text-gray-400">
                {formatBRL(product.originalPrice)}
              </span>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
              <p className="text-xs font-bold text-green-700 mb-0.5">
                💰 {formatBRL(pixPrice)} no Pix
              </p>
              <p className="text-xs text-green-600">
                Economize {formatBRL(product.price - pixPrice)}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                feedback === 'cart'
                  ? 'bg-green-500 text-white'
                  : product.stock === 0
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
              }`}
            >
              {feedback === 'cart' ? (
                <>
                  <Check className="w-5 h-5" />
                  Adicionado ao carrinho!
                </>
              ) : product.stock === 0 ? (
                'Indisponível'
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  COMPRAR AGORA
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
