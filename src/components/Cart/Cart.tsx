import { useCartStore } from "../../store/cartStore";
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cartEmpty">
        <FiShoppingBag size={48} className="cartEmptyIcon" />
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <button className="cartEmptyBtn" onClick={() => navigate("/")}>
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div className="cartPage">
      <h1 className="cartTitle">
        Корзина <span className="cartCount">{itemCount} шт.</span>
      </h1>

      <div className="cartLayout">
        <div className="cartItems">
          {cart.map((item) => (
            <div className="cartItem" key={item.id}>
              <div className="cartItemImg">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="cartItemInfo">
                <h3 className="cartItemTitle">{item.title}</h3>
                <span className="cartItemPrice">{item.price} $</span>
              </div>
              <div className="cartItemActions">
                <div className="quantityControl">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FiMinus size={12} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FiPlus size={12} />
                  </button>
                </div>
                <span className="cartItemTotal">
                  {(item.price * item.quantity).toFixed(2)} $
                </span>
                <button
                  className="removeBtn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Удалить"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cartSummary">
          <h3>Итого</h3>
          <div className="summaryRow">
            <span>Товары ({itemCount} шт.)</span>
            <span>{total.toFixed(2)} $</span>
          </div>
          <div className="summaryRow">
            <span>Доставка</span>
            <span className="free">Бесплатно</span>
          </div>
          <div className="summaryDivider" />
          <div className="summaryRow total">
            <span>К оплате</span>
            <span>{total.toFixed(2)} $</span>
          </div>
          <button className="checkoutBtn">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
