import { useState } from 'react'
import { useCart } from '../context/CartContext'

const FoodCard = ({ food }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(food)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card food-card h-100">
      <div className="position-relative">
        <img src={food.img} alt={food.name} style={{height:'200px',objectFit:'cover',width:'100%'}}/>
        <span className={`badge position-absolute top-0 start-0 m-2`} style={{background: food.veg ? '#28a745' : '#dc3545', color:'white', fontSize:'11px', padding:'3px 8px', borderRadius:'4px'}}>
          {food.veg ? '🟢 Veg' : '🔴 Non-Veg'}
        </span>
      </div>
      <div className="card-body d-flex flex-column gap-1">
        <div className="d-flex justify-content-between align-items-start">
          <h6 className="card-title mb-0 fw-bold" style={{fontSize:'15px'}}>{food.name}</h6>
          <span style={{fontSize:'0.85rem',color:'#888'}}>⭐ {food.rating}</span>
        </div>
        <p className="text-muted mb-1" style={{fontSize:'13px'}}>{food.desc}</p>
        <span className="text-muted" style={{fontSize:'12px'}}>🕒 {food.time}</span>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span style={{fontSize:'1.2rem',fontWeight:'700',color:'#ff6b35'}}>₹{food.price}</span>
          <button onClick={handleAdd} style={{background: added ? '#28a745' : '#ff6b35',border:'none',color:'white',borderRadius:'8px',padding:'8px 18px',fontWeight:'600',transition:'background 0.2s',cursor:'pointer'}}>
            {added ? '✓ Added!' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
