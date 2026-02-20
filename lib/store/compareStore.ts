import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'

interface CompareItem {
  id: string
  slug: string
  name: string
  price: number
  brand: string
  image: string
}

interface CompareStore {
  items: CompareItem[]
  addItem: (product: Product, image: string) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product, image: string) => void
  isComparing: (productId: string) => boolean
  clearAll: () => void
  count: () => number
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, image) =>
        set((state) => {
          if (state.items.length >= 4 && !state.items.some(i => i.id === product.id)) {
            return state
          }
          if (!state.items.some(i => i.id === product.id)) {
            return {
              items: [
                ...state.items,
                {
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  brand: product.brand,
                  image,
                },
              ],
            }
          }
          return state
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(i => i.id !== productId),
        })),

      toggleItem: (product, image) => {
        const { isComparing, addItem, removeItem } = get()
        if (isComparing(product.id)) {
          removeItem(product.id)
        } else {
          addItem(product, image)
        }
      },

      isComparing: (productId) => {
        return get().items.some(i => i.id === productId)
      },

      clearAll: () => set({ items: [] }),

      count: () => get().items.length,
    }),
    {
      name: 'compare-storage',
    }
  )
)
