import { createContext, useContext, useState } from 'react'

interface AuthContextType {
    isAuth: boolean,
    login: () => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem('auth') === 'true'
    )

    const login = () => {
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('auth')
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}