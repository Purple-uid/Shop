import { useState, useEffect } from 'react'
import type  { CartItem } from '../../types/types'
import { FaTrashAlt } from "react-icons/fa";
import './Cart.css'

function Cart() {
    const [ cart, setCart ] = useState<CartItem[]>([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]')
        setCart(saved)
    }, [])

    const addDelete = (id: number) => {
        const newCart = cart.filter((prev) => prev.id !== id)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }
    

    return (
        <div className='mainCart'>
            <h1>Корзина ваших товаров</h1>
        {cart.map(c =>(
            <div className='cart' key={c.id}>
                <div className='Img'>
                    <img src={c.image} alt={c.title} />
                </div>
                
                <div className='cartDate'>
                    <h3 className='cartTitle'>{c.title}</h3>
                    <h3 className='cartPrice'>{c.price} $</h3>
                    <button onClick={() => addDelete(c.id)} className='cartBTN'><FaTrashAlt /></button>
                </div>
            </div>
        ))}
        </div>
    )
}

export default Cart