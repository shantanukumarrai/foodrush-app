import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodrush_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/users')
    const users = await res.json()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const userData = { id: found.id, name: found.name, email: found.email }
    setUser(userData)
    localStorage.setItem('foodrush_user', JSON.stringify(userData))
    return userData
  }

  const signup = async (name, email, password) => {
    const res = await fetch('http://localhost:5000/users')
    const users = await res.json()
    if (users.find(u => u.email === email)) throw new Error('Email already registered')
    const newUser = { name, email, password }
    const postRes = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    const created = await postRes.json()
    const userData = { id: created.id, name: created.name, email: created.email }
    setUser(userData)
    localStorage.setItem('foodrush_user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('foodrush_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
