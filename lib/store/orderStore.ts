import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './cartStore'
import { Address } from './addressStore'

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  paymentMethod: 'pix' | 'credito' | 'boleto'
  shippingMethod: 'frete' | 'retirada'
  address: Address
  status: 'confirmado' | 'separando' | 'enviado' | 'entregue'
  createdAt: string
  estimatedDelivery?: string
}

interface OrderStore {
  orders: Order[]
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string
  getOrder: (id: string) => Order | null
  getUserOrders: () => Order[]
  updateOrderStatus: (id: string, status: Order['status']) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (order) => {
        const id = `ORD-${Date.now()}`
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id,
              createdAt: new Date().toISOString(),
            },
          ],
        }))
        return id
      },

      getOrder: (id) => {
        return get().orders.find((o) => o.id === id) || null
      },

      getUserOrders: () => {
        return get().orders
      },

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),
    }),
    {
      name: 'order-storage',
    }
  )
)
