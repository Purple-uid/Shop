import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/types";

interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
}

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

interface UserData {
  fio?: string;
  login?: string;
  email?: string;
  password?: string;
}

interface AccountState {
  user: UserData;
  setUser: (user: UserData) => void;
}
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
