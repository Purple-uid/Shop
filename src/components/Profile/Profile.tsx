import { useParams } from "react-router-dom"
import { useCartStore } from '../../store/cartStore'
import { useAuth } from '../../context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import gif from '../img/loading.gif'
import axios from 'axios'
import './Profile.css'

interface Goods{
    id: number
    title: string
    description: string
    price: number
    category: string
    thumbnail: string
    rating: number
    stock: number
}

// interface Rating {
//     rate: number
//     count: number
// }

function Profile() {
    const { id } = useParams<{ id: string }>()
    const { isAuth } = useAuth()
    const { cart, addItem, removeItem } = useCartStore()
    const basket = cart.some((item) => item.id === Number(id))
    const { data: post, isLoading } = useQuery<Goods>({
        queryKey: ['product', id],
        queryFn: () => axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
    })

    if (isLoading || !post) return <img className="loadingAnimation" src={gif} alt="Preview" />

    const addToCart = () => {
        if (!isAuth) return

        const exists = cart.find((item) => item.id === post.id)

        if (exists) {
            removeItem(post.id)
        } else {
            addItem({ ...post, quantity: 1 })
        }
    }

    return (
        <div className="Profiel">
            <div className="profileImageBox">
                <img src={post.thumbnail} alt={post.title} />
            </div>
            <div className="infoProfile">
                <h2 style={{ margin: 0 }}>{post.title}</h2>
                <div className="priceBox">
                    <p className="priceNew">{post.price} $</p>
                    <p className="priceOld">{(post.price * 1.1).toFixed(2)} $</p>
                </div>
                <button 
                 className={basket === true ? 'profielBtn profielBTNGreen' : 'profielBtn'}
                 onClick={addToCart}
                 disabled={!isAuth}
                 >{basket ? 'В корзине' : 'В корзину'}</button>
                <div>
                    <h3 style={{ margin: 0 }}>Рейтинг:</h3>
                    <h2 className={post.rating >= 3.5 ? 'text4' : 'text3'}>
                        ⭐ {post.rating} ({post.stock} отзывов)
                    </h2>
                </div>
                <p><b>Категория:</b> {post.category}</p>
                <p className="description"><b>О товаре:</b><br />{post.description}</p>
            </div>
        </div>
    )
}

export default Profile