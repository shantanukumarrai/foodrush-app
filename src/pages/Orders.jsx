import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const statusColor = { 'Confirmed': '#ff6b35', 'Preparing': '#f7931e', 'Delivered': '#28a745' }

const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetch(`http://localhost:5000/orders?userId=${user.id}`)
      .then(res => res.json())
      .then(data => { setOrders(data.reverse()); setLoading(false) })
  }, [user])

  if (!user) return (
    <div className="container text-center py-5 my-5">
      <div style={{fontSize:'4rem'}}>🔒</div>
      <h3 className="mt-3">Please login first</h3>
      <Link to="/login" className="btn mt-3 px-5" style={{background:'#ff6b35',color:'white',borderRadius:'50px'}}>Login</Link>
    </div>
  )

  if (loading) return (
    <div className="text-center py-5 mt-5">
      <div className="spinner-border" style={{color:'#ff6b35'}}></div>
    </div>
  )

  if (orders.length === 0) return (
    <div className="container text-center py-5 my-5">
      <div style={{fontSize:'4rem'}}>📦</div>
      <h3 className="mt-3">No orders yet</h3>
      <p className="text-muted">Place your first order!</p>
      <Link to="/" className="btn mt-3 px-5" style={{background:'#ff6b35',color:'white',borderRadius:'50px'}}>Order Now</Link>
    </div>
  )

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">My Orders 📦</h3>
      {orders.map(order => (
        <div key={order.id} style={{background:'white',borderRadius:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',padding:'24px',marginBottom:'20px'}}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="fw-bold mb-1">Order #{order.id}</h6>
              <p className="text-muted mb-0" style={{fontSize:'13px'}}>📅 {order.date}</p>
            </div>
            <span style={{background: statusColor[order.status] || '#888',color:'white',padding:'4px 14px',borderRadius:'50px',fontSize:'13px',fontWeight:'600'}}>
              {order.status}
            </span>
          </div>
          <div className="mb-3">
            {order.items.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center py-1" style={{borderBottom:'1px solid #f5f5f5'}}>
                <span style={{fontSize:'14px'}}>{item.name} × {item.qty}</span>
                <span style={{fontSize:'14px',fontWeight:'600'}}>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted" style={{fontSize:'14px'}}>Total Amount</span>
            <span style={{fontWeight:'700',color:'#ff6b35',fontSize:'18px'}}>₹{order.totalPrice}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
