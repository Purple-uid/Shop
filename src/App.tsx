import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useAuth, useCartStore } from "./store/cartStore";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import User from "./components/User/User";
import { PrivateRoute } from "./components/PrivateRoute";
import { FiShoppingCart, FiZap, FiUser } from "react-icons/fi";
import "./App.css";

function Header() {
  const auth = useAuth((state) => state.isAuth);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="header">
      <NavLink className="logo" to="/">
        <FiZap className="logoIcon" /> Nova Shop
      </NavLink>
      <div className="headerRight">
        {auth && (
          <NavLink className="headerBtn" to="/cart" aria-label="Корзина">
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
          </NavLink>
        )}
        <NavLink
          className="headerBtn"
          to={auth ? "/user" : "/login"}
          aria-label={auth ? "Профиль" : "Войти"}
        >
          <FiUser size={20} />
        </NavLink>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
