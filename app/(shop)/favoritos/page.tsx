'use client'

import Link from 'next/link'
import { Heart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/lib/store/favoritesStore'
import { useCartStore } from '@/lib/store/cartStore'

export default function FavoritosPage() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (favorite: any) => {
    addItem({
      productId: favorite.id,
      name: favorite.name,
      price: favorite.price,
      quantity: 1,
      image: '📦',
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-8">Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">Nenhum favorito salvo</h2>
          <p className="text-muted-foreground mb-8">
            Clique no ícone de coração em qualquer produto para adicionar aos favoritos
          </p>
          <Link href="/busca">
            <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Produtos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex gap-4 bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <div className="w-32 h-32 bg-muted rounded flex-shrink-0 flex items-center justify-center text-5xl">
                📦
              </div>
              <div className="flex-1">
                <Link href={`/p/${favorite.slug}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                    {favorite.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{favorite.brand}</p>
                <p className="text-2xl font-bold text-primary">R${favorite.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Button
                  className="bg-primary hover:bg-primary text-primary-foreground"
                  onClick={() => handleAddToCart(favorite)}
                >
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeFavorite(favorite.id)}
                >
                  <Heart className="w-4 h-4 mr-2 fill-destructive" />
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
