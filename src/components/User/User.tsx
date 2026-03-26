import { useAuth } from '../../context/AuthContext'
import type  { CartItem } from '../../types/types'
import './User.css'

function User() {
    const { logout } = useAuth()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    const itemCount = cart.length

    const totalPrice = cart.reduce((sum: number, item: CartItem) => {
        return sum + item.price
    }, 0).toFixed(2)

    return (
        <div className='user'>
            <div className='userProfile'>
                <div className='userIcon'>
                    <span>{user.fio?.[0]}</span>
                </div>
                <div className='userInfo'>
                    <span className='userInfoFio'>{user.fio}</span>
                    <span className='userInfoLogin'>@{user.login}</span>
                </div>
                <div className='userData'>
                    <div className='userDataEmail'>
                        <h3 className='dataText'>Email</h3>
                        <h3 className='dataLenght'>{user.email}</h3>
                    </div>
                    <div className='userDatalogin'>
                        <h3 className='dataText'>Логин</h3>
                        <h3 className='loginLenght'>{user.login}</h3>
                    </div>
                </div>
                <div className='cartDate'>
                    <div className='cartLenght'>
                        <h1 className='cartLenghtRecount'>{itemCount}</h1>
                        <span className='cartLenghtText'>товаров в корзине</span>
                    </div>
                    <div className='loginPrice'>
                        <h1 className='loginPriceRecount'>{totalPrice}</h1>
                        <span className='loginPriceText'>сумма корзины</span>
                    </div>
                </div>
                <button className='userProfileBtn' onClick={logout}>Выйти из аккаунта</button>
            </div>
        </div>
    )
}

export default User