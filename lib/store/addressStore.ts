import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Address {
  id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface AddressStore {
  addresses: Address[]
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  getDefaultAddress: () => Address | null
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...address,
              id: `addr-${Date.now()}`,
            },
          ],
        })),

      updateAddress: (id, address) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...address } : a
          ),
        })),

      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      getDefaultAddress: () => {
        return get().addresses.find((a) => a.isDefault) || null
      },
    }),
    {
      name: 'address-storage',
    }
  )
)
