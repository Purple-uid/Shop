import { useAuth, useAccount } from "../../store/cartStore";
import { useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../types/types";
import "./User.css";

function User() {
  const logout = useAuth((state) => state.logout);
  const user = useAccount((state) => state.user);
  const cart = useCartStore((state) => state.cart);

  const itemCount = cart.length;

  const totalPrice = cart
    .reduce((sum: number, item: CartItem) => {
      return sum + item.price;
    }, 0)
    .toFixed(2);

  return (
    <div className="user">
      <div className="userProfile">
        <div className="userIcon">
          <span>{user.fio?.[0]}</span>
        </div>
        <div className="userInfo">
          <span className="userInfoFio">{user.fio || "Гость"}</span>
          <span className="userInfoLogin">@{user.login || ""}</span>
        </div>
        <div className="userData">
          <div className="userDataEmail">
            <h3 className="dataText">Email</h3>
            <h3 className="dataLenght">{user.email || "Не указан"}</h3>
          </div>
          <div className="userDatalogin">
            <h3 className="dataText">Логин</h3>
            <h3 className="loginLenght">{user.login || "Goust"}</h3>
          </div>
        </div>
        <div className="cartDate">
          <div className="cartLenght">
            <h1 className="cartLenghtRecount">{itemCount}</h1>
            <span className="cartLenghtText">товаров в корзине</span>
          </div>
          <div className="loginPrice">
            <h1 className="loginPriceRecount">{totalPrice}</h1>
            <span className="loginPriceText">сумма корзины</span>
          </div>
        </div>
        <button className="userProfileBtn" onClick={logout}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default User;
