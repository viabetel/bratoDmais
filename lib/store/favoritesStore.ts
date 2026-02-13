import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'

interface FavoriteItem {
  id: string
  slug: string
  name: string
  price: number
  brand: string
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
                  brand: product.brand,
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

