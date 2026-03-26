import { useNavigate } from "react-router-dom"
import { useState, useMemo, useEffect, useCallback } from 'react'
import gif from '../img/loading.gif'
import './Home.css'

interface Goods{
    id: number,
    title: string,
    price: number,
    category: string,
    image: string
}

function Home() {
    const navigate = useNavigate()
    const [ search, setSearch ] = useState('')
    const [ goods, setGoods ] = useState<Goods[]>([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        async function getDate() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')

                if (!response.ok) {
                    throw new Error(`Ошибка ${response.status}`)
                }

                const data = await response.json()
                setGoods(data)
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Ошибка', error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        getDate()
    }, [])

    const filteredUsers = useMemo(() => {
    return goods.filter(good =>
      good.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, goods])

  const handleSearch = useCallback((e: any) => {
    setSearch(e.target.value)
  }, [])

  if (loading) return <img className="loadingAnimation" src={gif} alt="Preview" />

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
                        <img className="productImage" src={good.image} alt={good.title} />
                        <h5 className="productPrice">{good.price} $</h5>
                        <p className="productCategory">{good.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home