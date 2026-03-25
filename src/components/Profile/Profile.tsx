import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import type  { CartItem } from '../../types/types'
import { useAuth } from '../../context/AuthContext'
import gif from '../img/loading.gif'
import './Profile.css'

interface Goods{
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    image: string,
    rating: Rating,
}

interface Rating {
    rate: number
    count: number
}

function Profile() {
    const { id } = useParams<{ id: string }>()
    const { isAuth } = useAuth()
    const [ post, setPost ] = useState<Goods | null>(null)
    const [ loading, setLoading ] = useState(true)
    const [ basket, setBasket ] = useState<boolean>(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        return cart.some((item: CartItem) => item.id === Number(id))
    })

    

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const date = await response.json()
                setPost(date)
            } catch (error) {
                if(error instanceof Error) {
                    console.error('Ошибка при запросе:', error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        getData()
    } ,[id])

    if (loading || !post) return <img className="loadingAnimation" src={gif} alt="Preview" />

    const addToCart = () => {
        if (!isAuth) return

        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const exists = cart.find((item: CartItem) => item.id === post.id)

        if (exists) {
            const newCart = cart.filter((item: CartItem) => item.id !== post.id)
            localStorage.setItem('cart', JSON.stringify(newCart))
            setBasket(false)
        } else {
            cart.push({ ...post, quantity: 1 })
            localStorage.setItem('cart', JSON.stringify(cart))
            setBasket(true)
        }
    }

    return (
        <div className="Profiel">
            <div className="profileImageBox">
                <img src={post.image} alt={post.title} />
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
                    <h2 className={post.rating.rate >= 3.5 ? 'text4' : 'text3'}>
                        ⭐ {post.rating.rate} ({post.rating.count} отзывов)
                    </h2>
                </div>
                <p><b>Категория:</b> {post.category}</p>
                <p className="description"><b>О товаре:</b><br />{post.description}</p>
            </div>
        </div>
    )
}

export default Profile