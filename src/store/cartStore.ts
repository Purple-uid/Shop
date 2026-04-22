import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore, AuthContextType, AccountState } from "../types/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addItem: (item) => set((state) => ({ cart: [...state.cart, item] })),

      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((el) => el.id !== id),
        })),
    }),
    {
      name: "basket",
    },
  ),
);

export const useAuth = create<AuthContextType>()(
  persist(
    (set) => ({
      isAuth: false,
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),
    }),
    {
      name: "auth",
    },
  ),
);

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (userdata) => set({ user: userdata }),
    }),
    {
      name: "user-info",
    },
  ),
);
