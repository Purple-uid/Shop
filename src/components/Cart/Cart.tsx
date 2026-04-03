import { useCartStore } from '../../store/cartStore'
import { FaTrashAlt } from "react-icons/fa"
import './Cart.css'

function Cart() {
    const { cart, removeItem } = useCartStore()

    return (
        <div className='mainCart'>
            <h1>Корзина ваших товаров</h1>
            {cart.map(c => (
                <div className='cart' key={c.id}>
                    <div className='Img'>
                        <img src={c.thumbnail} alt={c.title} />
                    </div>
                    <div className='cartData'>
                        <h3 className='cartTitle'>{c.title}</h3>
                        <h3 className='cartPrice'>{c.price} $</h3>
                        <button onClick={() => removeItem(c.id)} className='cartBTN'>
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart