'use client'

import Link from 'next/link'
import { Heart, ArrowLeft, ShoppingCart, Trash2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { useCartStore } from '@/lib/store/cartStore'
import { ProductCard } from '@/components/products/ProductCard'
import { resolveProductImage } from '@/lib/utils/images'
import { formatBRL } from '@/lib/utils/format'
import { products } from '@/data/products'

export default function FavoritosPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddAllToCart = () => {
    favorites.forEach((fav) => {
      if (fav.stock > 0) {
        addItem({
          productId: fav.id,
          name: fav.name,
          price: fav.price,
          quantity: 1,
          image: resolveProductImage(fav.images, fav.categorySlug),
        })
      }
    })
  }

  // Suggestions: products not in favorites
  const favIds = favorites.map(f => f.id)
  const suggestions = products.filter(p => !favIds.includes(p.id)).slice(0, 4)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/busca">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  Meus Favoritos
                  {favorites.length > 0 && (
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {favorites.length > 0
                    ? `${favorites.filter(f => f.stock > 0).length} disponíveis para compra`
                    : 'Salve produtos para comparar depois'}
                </p>
              </div>
            </div>

            {favorites.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAddAllToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Adicionar Tudo</span>
                  <span className="sm:hidden">Tudo</span>
                </Button>
                <button
                  onClick={clearFavorites}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Limpar favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-200" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum favorito salvo</h2>
            <p className="text-gray-500 text-sm mb-8">
              Clique no ❤️ em qualquer produto para salvar aqui e comprar depois.
            </p>
            <Link href="/busca">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Explorar Produtos
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>

            {/* Suggested products */}
            <div className="mt-14 text-left">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Talvez você goste</p>
              <div className="grid grid-cols-2 gap-3">
                {suggestions.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Savings summary bar */}
            {(() => {
              const totalOriginal = favorites.reduce((s, f) => s + f.originalPrice, 0)
              const totalNow = favorites.reduce((s, f) => s + f.price, 0)
              const savings = totalOriginal - totalNow
              return savings > 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-green-800">
                      💰 Você economiza <span className="text-green-600">{formatBRL(savings)}</span> comparado ao preço original
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">Total dos favoritos: {formatBRL(totalNow)}</p>
                  </div>
                  <Button onClick={handleAddAllToCart} className="bg-green-600 hover:bg-green-700 text-white text-sm" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-1.5" />
                    Comprar Tudo
                  </Button>
                </div>
              ) : null
            })()}

            {/* Favorites Grid using ProductCard */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="relative group">
                  {/* Remove from favorites button */}
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="absolute -top-1.5 -right-1.5 z-20 w-6 h-6 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all opacity-0 group-hover:opacity-100"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400 group-hover:text-red-500" />
                  </button>
                  {/* Cast FavoriteItem to Product shape — it has all required fields */}
                  <ProductCard product={fav as unknown as import('@/data/products').Product} />
                </div>
              ))}
            </div>

            {/* Suggestions after favorites */}
            {suggestions.length > 0 && (
              <div className="mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gray-200" />
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Você também pode gostar
                  </p>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {suggestions.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
