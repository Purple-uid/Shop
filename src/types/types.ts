export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface Goods {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

export interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
}

export interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

export interface UserData {
  fio?: string;
  login?: string;
  email?: string;
  password?: string;
}

export interface AccountState {
  user: UserData;
  setUser: (user: UserData) => void;
}
