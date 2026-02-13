import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserData {
  id: string
  email: string
  name: string
  phone: string
  avatar?: string
}

interface UserStore {
  user: UserData | null
  isLoggedIn: boolean
  login: (email: string, name: string) => void
  logout: () => void
  updateProfile: (data: Partial<UserData>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (email, name) =>
        set({
          user: {
            id: `user-${Date.now()}`,
            email,
            name,
            phone: '',
          },
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
)
