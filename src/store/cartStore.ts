import { create } from 'zustand'
import type { CartItem } from '../types/types'

interface CartStore {
    cart: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),

    addItem: (item) => set((state) => {
        const updated = [...state.cart, item]
        localStorage.setItem('cart', JSON.stringify(updated))
        return { cart: updated }
    }),

    removeItem: (id) => set((state) => {
        const updated = state.cart.filter(el => el.id !== id)
        localStorage.setItem('cart', JSON.stringify(updated))
        return { cart: updated }
    }),
}))