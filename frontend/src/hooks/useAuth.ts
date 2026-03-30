import { useState, useEffect } from 'react'
import api from '../services/api'

interface User {
  _id: string
  name: string
  email: string
  role: string
  avatar?: string
  bio?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data.data
      
      localStorage.setItem('token', token)
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password, role })
      return { success: true, message: response.data.message }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    try {
      const response = await api.get('/auth/me')
      setState({
        user: response.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      localStorage.removeItem('token')
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return {
    ...state,
    login,
    register,
    logout,
    checkAuth,
  }
}

export default useAuth