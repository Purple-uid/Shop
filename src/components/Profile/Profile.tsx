import { useParams, useNavigate } from "react-router-dom";
import type { Goods } from "../../types/types";
import { useCartStore, useAuth } from "../../store/cartStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiArrowLeft, FiShoppingCart, FiCheck } from "react-icons/fi";
import "./Profile.css";

function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useAuth((state) => state.isAuth);
  const { cart, addItem } = useCartStore();

  const { data: post, isLoading } = useQuery<Goods>({
    queryKey: ["product", id],
    queryFn: () =>
      axios.get(`https://dummyjson.com/products/${id}`).then((res) => res.data),
  });

  if (isLoading || !post) {
    return (
      <div className="profileLoading">
        <div className="skeleton" style={{ width: "100%", maxWidth: 400, height: 400, borderRadius: 12 }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: 28, width: "60%", marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 14, width: "30%", marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 32, width: "40%", marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 42, width: 160, marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 60, width: "100%" }} />
        </div>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === post.id);
  const inCart = !!cartItem;

  const handleCart = () => {
    if (!auth) return navigate("/login");
    if (!inCart) {
      addItem({ id: post.id, title: post.title, price: post.price, thumbnail: post.thumbnail, quantity: 1 });
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="profilePage">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <FiArrowLeft size={18} /> Назад
      </button>

      <div className="profileContent">
        <div className="profileImageBox">
          <img src={post.thumbnail} alt={post.title} />
        </div>

        <div className="profileInfo">
          <span className="profileCategory">{post.category}</span>
          <h1 className="profileTitle">{post.title}</h1>

          <div className="profileRating">
            <span className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= Math.round(post.rating) ? "star filled" : "star"}>★</span>
              ))}
            </span>
            <span>{post.rating}</span>
            <span className="profileReviews">{post.stock} отзывов</span>
          </div>

          <div className="profilePriceBox">
            <span className="profilePrice">{post.price} $</span>
            <span className="profileOldPrice">{(post.price * 1.1).toFixed(2)} $</span>
          </div>

          <button
            className={inCart ? "addToCartBtn inCart" : "addToCartBtn"}
            onClick={handleCart}
          >
            {inCart ? <><FiCheck size={18} /> В корзине</> : <><FiShoppingCart size={18} /> В корзину</>}
          </button>

          <p className="profileDescription">
            <strong>О товаре:</strong><br />
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
