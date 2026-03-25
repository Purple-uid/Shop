import { Navigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

interface Props {
  children: JSX.Element
}

function PrivateRoute({ children }: Props) {
    const { isAuth } = useAuth()
    
    if (!isAuth) return <Navigate to="/login" />

    return children
}

export default PrivateRoute