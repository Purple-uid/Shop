import { BrowserRouter, Routes, Route, NavLink  } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import User from './components/User/User'
import PrivateRoute from './components/PrivateRoute'
import { FaBasketShopping } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi"
import { IoPersonSharp } from "react-icons/io5"
import './App.css'

function Header() {
  const { isAuth } = useAuth()
  return (
    <header className='header'>
      <NavLink className='logo' to='/'>
        <HiLightningBolt className='logoIcon' /> Nova Shop
      </NavLink>
      <div className='headerRight'>
        {isAuth && <NavLink className='headerBtn' to='/cart'><FaBasketShopping /></NavLink>}
        <NavLink className='headerBtn' to='/login'><IoPersonSharp /></NavLink>
      </div>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route 
          path='/cart' 
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>} />
        <Route 
          path='/user' 
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
