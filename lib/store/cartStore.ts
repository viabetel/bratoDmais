import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  services?: {
    serviceId: string
    serviceName: string
    servicePrice: number
    serviceType: 'installation' | 'maintenance' | 'warranty' | 'protection' | 'rental'
  }[]
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  addServiceToProduct: (productId: string, service: CartItem['services'][0]) => void
  removeServiceFromProduct: (productId: string, serviceId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === item.productId)

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                id: `${item.productId}-${Date.now()}`,
              },
            ],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.max(0, quantity) } : i
          ),
        })),

      addServiceToProduct: (productId, service) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  services: [...(item.services || []), service],
                }
              : item
          ),
        })),

      removeServiceFromProduct: (productId, serviceId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  services: (item.services || []).filter((s) => s.serviceId !== serviceId),
                }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const productPrice = item.price * item.quantity
          const servicesPrice = (item.services || []).reduce((sum, service) => sum + service.servicePrice, 0)
          return total + productPrice + servicesPrice
        }, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
