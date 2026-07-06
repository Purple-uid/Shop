import { useAuth, useAccount, useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../types/types";
import { FiLogOut } from "react-icons/fi";
import "./User.css";

function User() {
  const logout = useAuth((state) => state.logout);
  const user = useAccount((state) => state.user);
  const cart = useCartStore((state) => state.cart);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="userPage">
      <div className="userCard">
        <div className="userHeader">
          <div className="userAvatar">
            {user.fio?.[0] || "G"}
          </div>
          <div>
            <h2 className="userName">{user.fio || "Гость"}</h2>
            <span className="userLogin">@{user.login || "unknown"}</span>
          </div>
        </div>

        <div className="userDetails">
          <div className="detailRow">
            <span>Email</span>
            <span className="detailValue">{user.email || "—"}</span>
          </div>
          <div className="detailRow">
            <span>Логин</span>
            <span className="detailValue">{user.login || "—"}</span>
          </div>
        </div>

        <div className="userStats">
          <div className="statCard">
            <span className="statNumber">{itemCount}</span>
            <span className="statLabel">товаров</span>
          </div>
          <div className="statCard">
            <span className="statNumber">{totalPrice} $</span>
            <span className="statLabel">сумма корзины</span>
          </div>
        </div>

        <button className="logoutBtn" onClick={logout}>
          <FiLogOut size={16} /> Выйти
        </button>
      </div>
    </div>
  );
}

export default User;
