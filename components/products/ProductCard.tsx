'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Check, Package, Truck, Eye } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { Product } from '@/data/products'
import { formatBRL, getDiscountPercent, getPixPrice } from '@/lib/utils/format'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'grid' | 'list'
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [feedback, setFeedback] = useState<'cart' | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const discountPercent = getDiscountPercent(product.originalPrice, product.price)
  const pixPrice = getPixPrice(product.price)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock > 0) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0] || '/placeholder.png',
      })
      setFeedback('cart')
      setTimeout(() => setFeedback(null), 2000)
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  // List variant
  if (variant === 'list') {
    return (
      <Link href={`/p/${product.slug}`}>
        <div className="flex gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group">
          <div className="flex-shrink-0 w-36 h-36 bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
            {product.images?.[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            ) : (
              <Package className="w-12 h-12 text-muted-foreground" />
            )}
            {discountPercent > 0 && (
              <div className="absolute top-2 left-2 bg-secondary text-white px-2 py-0.5 rounded-md text-xs font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>
                <button 
                  onClick={handleToggleFavorite} 
                  className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isFavorite ? 'fill-secondary text-secondary scale-110' : 'text-muted-foreground hover:text-secondary'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {product.stock > 0 ? (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Em estoque
                  </span>
                ) : (
                  <span className="text-xs text-destructive font-medium">Esgotado</span>
                )}
                {product.freeShipping && (
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Frete Grátis
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">{formatBRL(product.price)}</span>
                  <span className="text-sm line-through text-muted-foreground">
                    {formatBRL(product.originalPrice)}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-0.5">
                  {formatBRL(pixPrice)} no Pix
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  feedback === 'cart'
                    ? 'bg-green-500 text-white'
                    : 'bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {feedback === 'cart' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Adicionado
                  </>
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
      <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative bg-muted aspect-square overflow-hidden">
          {product.images?.[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercent > 0 && (
              <span className="bg-secondary text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                -{discountPercent}%
              </span>
            )}
            {product.freeShipping && (
              <span className="bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Grátis
              </span>
            )}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-secondary text-white shadow-lg' 
                : 'bg-white/90 hover:bg-white text-gray-500 hover:text-secondary shadow-md'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button (appears on hover) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Condition Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.condition === 'novo' && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-md font-medium">
                Novo
              </span>
            )}
            {product.condition === 'reembalado' && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-md font-medium">
                Reembalado
              </span>
            )}
            {product.pickupAvailable && (
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-md font-medium">
                Retire na Loja
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-auto space-y-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl font-bold text-foreground">
                {formatBRL(product.price)}
              </span>
              <span className="text-sm line-through text-muted-foreground">
                {formatBRL(product.originalPrice)}
              </span>
            </div>
            
            <p className="text-xs text-green-600 font-medium">
              {formatBRL(pixPrice)} no Pix ✨
            </p>
            
            <p className="text-xs text-muted-foreground">
              ou 6x de {formatBRL(product.price / 6)} sem juros
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                feedback === 'cart'
                  ? 'bg-green-500 text-white'
                  : product.stock === 0
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 text-white active:scale-[0.98]'
              }`}
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
                  Adicionar ao Carrinho
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
