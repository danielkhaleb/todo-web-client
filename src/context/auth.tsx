import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'

interface User {
  isAuthenticated: boolean
  token: string
}

interface AuthContextData {
  user: User
  loading: boolean
  handleLogin(
    email: string,
    password: string,
    keepLogged: boolean,
  ): Promise<boolean>
  handleLogout(): void
}

const AuthUserContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>({} as User)
  useEffect(() => {
    let userInfo
    if (localStorage.getItem('user')) {
      userInfo = localStorage.getItem('user')
    } else {
      userInfo = sessionStorage.getItem('user')
    }
    if (userInfo) {
      const authenticatedUser: User = JSON.parse(userInfo)
      setUser(authenticatedUser)
      api.defaults.headers.authorization = `Bearer ${authenticatedUser.token}`
    }

    setLoading(false)
  }, [])

  async function handleLogin (
    email: string,
    password: string,
    keepLogged: boolean
  ) {
    const data = {
      email: email,
      password: password
    }
    const user = {
      isAuthenticated: false,
      token: ''
    }
    await api
      .post('/auth/', data)
      .then(response => {
        user.isAuthenticated = true
        user.token = response.data.access_token
        if (keepLogged) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        sessionStorage.setItem('user', JSON.stringify(user))
        api.defaults.headers.authorization = `Bearer ${response.data.access_token}`
      })
      .catch(error => {
        toast(error.message)
        console.log(error)
      })
    setUser(user)
    return user.isAuthenticated
  }

  function handleLogout () {
    const removeUser: User = {
      isAuthenticated: false,
      token: ''
    }
    setUser(removeUser)
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
  }

  return ((
    <AuthUserContext.Provider
      value={{ user: user, handleLogin, loading, handleLogout }}
    >
      {children}
    </AuthUserContext.Provider>
  ) as React.ReactElement)
}

export { AuthUserContext, AuthProvider }
