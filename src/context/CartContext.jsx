import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (food) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === food.id)
      if (exists) return prev.map(item => item.id === food.id ? { ...item, qty: item.qty + 1 } : item)
      return [...prev, { ...food, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
