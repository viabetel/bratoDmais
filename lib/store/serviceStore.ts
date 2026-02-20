import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ServiceOption, RentOption } from '@/data/services'

export interface SelectedService {
  id: string
  name: string
  price: number
  type: 'installation' | 'rental' | 'maintenance' | 'warranty' | 'protection'
  duration?: string
  quantity?: number
  productId?: string
}

interface ServiceStoreState {
  selectedServices: SelectedService[]
  addService: (service: ServiceOption | RentOption | SelectedService) => void
  removeService: (serviceId: string) => void
  clearServices: () => void
  getTotal: () => number
}

export const useServiceStore = create<ServiceStoreState>()(
  persist(
    (set, get) => ({
      selectedServices: [],

      addService: (service) => {
        set((state) => {
          const existing = state.selectedServices.find((s) => s.id === service.id)
          
          if (existing) {
            // Se já existe, incrementa quantidade
            return {
              selectedServices: state.selectedServices.map((s) =>
                s.id === service.id ? { ...s, quantity: (s.quantity || 1) + 1 } : s
              ),
            }
          }
          
          // Novo serviço
          const newService: SelectedService = {
            id: service.id,
            name: service.name,
            price: service.price,
            type: service.type,
            duration: ('duration' in service) ? service.duration : undefined,
            quantity: 1,
            productId: ('productId' in service) ? service.productId : undefined,
          }
          
          return {
            selectedServices: [...state.selectedServices, newService],
          }
        })
      },

      removeService: (serviceId) => {
        set((state) => ({
          selectedServices: state.selectedServices.filter((s) => s.id !== serviceId),
        }))
      },

      clearServices: () => {
        set({ selectedServices: [] })
      },

      getTotal: () => {
        const state = get()
        return state.selectedServices.reduce(
          (total, service) => total + service.price * (service.quantity || 1),
          0
        )
      },
    }),
    {
      name: 'services-storage',
    }
  )
)
