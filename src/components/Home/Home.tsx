import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"
import gif from '../img/loading.gif'
import axios from 'axios'
import './Home.css'

interface Goods{
    id: number,
    title: string,
    price: number,
    category: string,
    thumbnail: string
}

function Home() {
    const navigate = useNavigate()
    const [ search, setSearch ] = useState('')
    const { data: goods, isLoading } = useQuery<Goods[]>({
        queryKey: ['products'],
        queryFn: () => axios.get('https://dummyjson.com/products').then(res => res.data.products)
    })

    const filteredUsers = useMemo(() => {
    return (goods ?? []).filter(good =>
      good.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, goods])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  if (isLoading) return <img className="loadingAnimation" src={gif} alt="Preview" />

    return (
        <div className="main">
            <div className='inputHeader'>
                <input
                placeholder='Поиск товара'
                className='input'
                type="text"
                value={search}
                onChange={handleSearch} />
            </div>
            <div className="mainTwo">
                {filteredUsers.map(good => (
                    <div className="products" onClick={() => navigate(`/product/${good.id}`)} key={good.id}>
                        <img className="productImage" src={good.thumbnail} alt={good.title} />
                        <h5 className="productPrice">{good.price} $</h5>
                        <p className="productCategory">{good.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home