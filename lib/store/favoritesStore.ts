import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'

// Store more product data so ProductCard can work properly in favorites
export interface FavoriteItem {
  id: string
  slug: string
  name: string
  price: number
  originalPrice: number
  brand: string
  categorySlug: string
  category: string
  rating: number
  reviews: number
  stock: number
  condition: 'novo' | 'reembalado' | 'remanufaturado'
  freeShipping?: boolean
  images: string[]
  tags: string[]
  description: string
  specs?: Record<string, string>
  pickupAvailable?: boolean
}

interface FavoritesStore {
  favorites: FavoriteItem[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: string) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) =>
        set((state) => {
          if (!state.favorites.some((f) => f.id === product.id)) {
            return {
              favorites: [
                ...state.favorites,
                {
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  brand: product.brand,
                  categorySlug: product.categorySlug,
                  category: product.category,
                  rating: product.rating,
                  reviews: product.reviews,
                  stock: product.stock,
                  condition: product.condition,
                  freeShipping: product.freeShipping,
                  images: product.images || [],
                  tags: product.tags || [],
                  description: product.description || '',
                  specs: product.specs,
                  pickupAvailable: product.pickupAvailable,
                },
              ],
            }
          }
          return state
        }),

      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== productId),
        })),

      toggleFavorite: (product) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(product.id)) {
          removeFavorite(product.id)
        } else {
          addFavorite(product)
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((f) => f.id === productId)
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
)
