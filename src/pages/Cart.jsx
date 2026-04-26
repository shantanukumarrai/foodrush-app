import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ordering, setOrdering] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const delivery = 40
  const taxes = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + delivery + taxes

  const placeOrder = async () => {
    if (!user) { navigate('/login'); return }
    setOrdering(true)
    const order = {
      userId: user.id,
      userName: user.name,
      items: cartItems,
      totalPrice: grandTotal,
      status: 'Confirmed',
      date: new Date().toLocaleString()
    }
    await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
    clearCart()
    setOrdered(true)
    setOrdering(false)
  }

  if (ordered) return (
    <div className="container text-center py-5 my-5">
      <div style={{fontSize:'5rem'}}>🎉</div>
      <h3 className="mt-3 fw-bold">Order Placed Successfully!</h3>
      <p className="text-muted">Your food is being prepared. Estimated delivery: 30-45 mins</p>
      <div className="d-flex gap-3 justify-content-center mt-4">
        <Link to="/" className="btn px-4" style={{background:'#ff6b35',color:'white',borderRadius:'50px'}}>Order More</Link>
        <Link to="/orders" className="btn btn-outline-secondary px-4" style={{borderRadius:'50px'}}>My Orders</Link>
      </div>
    </div>
  )

  if (cartItems.length === 0) return (
    <div className="container text-center py-5 my-5">
      <div style={{fontSize:'5rem'}}>🛒</div>
      <h3 className="mt-3">Your cart is empty</h3>
      <p className="text-muted">Add some delicious food to get started!</p>
      <Link to="/" className="btn mt-3 px-5 py-2" style={{background:'#ff6b35',color:'white',borderRadius:'50px'}}>Browse Menu</Link>
    </div>
  )

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Your Cart 🛒</h3>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map(item => (
            <div key={item.id} style={{background:'white',borderRadius:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',padding:'16px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'16px'}}>
              <img src={item.img} alt={item.name} style={{width:'80px',height:'80px',objectFit:'cover',borderRadius:'10px'}}/>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{item.name}</h6>
                <p className="text-muted mb-2" style={{fontSize:'13px'}}>{item.category}</p>
                <span style={{color:'#ff6b35',fontWeight:'700'}}>₹{item.price}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{width:'32px',height:'32px',borderRadius:'50%',border:'2px solid #ff6b35',background:'white',color:'#ff6b35',fontWeight:'700',cursor:'pointer'}}>−</button>
                <span className="fw-bold" style={{minWidth:'24px',textAlign:'center'}}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{width:'32px',height:'32px',borderRadius:'50%',border:'2px solid #ff6b35',background:'white',color:'#ff6b35',fontWeight:'700',cursor:'pointer'}}>+</button>
              </div>
              <div className="text-end ms-3">
                <div className="fw-bold">₹{item.price * item.qty}</div>
                <button onClick={() => removeFromCart(item.id)} style={{fontSize:'12px',color:'red',background:'none',border:'none',cursor:'pointer',padding:'0',marginTop:'4px'}}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="btn btn-outline-danger btn-sm mt-2">🗑 Clear Cart</button>
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div style={{background:'white',borderRadius:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',padding:'24px',position:'sticky',top:'80px'}}>
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="d-flex justify-content-between mb-2"><span className="text-muted">Delivery</span><span>₹{delivery}</span></div>
            <div className="d-flex justify-content-between mb-3"><span className="text-muted">Taxes (5%)</span><span>₹{taxes}</span></div>
            <hr/>
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5" style={{color:'#ff6b35'}}>₹{grandTotal}</span>
            </div>
            {!user && <p className="text-muted text-center mb-3" style={{fontSize:'13px'}}>Please login to place order</p>}
            <button onClick={placeOrder} disabled={ordering}
              style={{background:'#ff6b35',border:'none',color:'white',width:'100%',padding:'14px',fontSize:'1.1rem',fontWeight:'700',borderRadius:'12px',cursor:'pointer'}}>
              {ordering ? 'Placing Order...' : user ? 'Place Order 🎉' : 'Login to Order'}
            </button>
            <Link to="/" className="btn btn-link w-100 text-center mt-3" style={{color:'#ff6b35'}}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
