import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string
  isLoading: boolean
}

interface AuthContextType {
  auth: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = React.useState<AuthState>({
    user: null,
    token: '',
    isLoading: false,
  })

  const login = async (email: string, _password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true }))
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = { id: '1', email, name: 'Test User' }
      const token = 'mock-token'
      setAuth({ user, token, isLoading: false })
    } catch (error) {
      setAuth((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    setAuth({ user: null, token: '', isLoading: false })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): [
  AuthState,
  AuthContextType['login'],
  AuthContextType['logout'],
] => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return [context.auth, context.login, context.logout]
}
