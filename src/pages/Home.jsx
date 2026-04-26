import { useState, useEffect } from 'react'
import FoodCard from '../components/FoodCard'
import { categories } from '../data/foods'

const Home = () => {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/foods')
      .then(res => res.json())
      .then(data => { setFoods(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = foods.filter(f => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (loading) return (
    <div className="text-center py-5 mt-5">
      <div className="spinner-border" style={{color:'#ff6b35'}}></div>
      <p className="mt-3 text-muted">Loading delicious food...</p>
    </div>
  )

  return (
    <>
      <div style={{background:'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',color:'white',padding:'80px 0',textAlign:'center'}}>
        <div className="container">
          <h1 style={{fontSize:'3rem',fontWeight:'700',marginBottom:'1rem'}}>Hungry? We've got you 🍕</h1>
          <p style={{fontSize:'1.2rem',opacity:'0.9',marginBottom:'2rem'}}>Order from the best restaurants near you</p>
          <div className="d-flex justify-content-center">
            <input type="text" className="form-control" placeholder="🔍  Search for food..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{maxWidth:'480px',borderRadius:'50px',padding:'14px 24px',fontSize:'16px',border:'none'}}/>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{borderRadius:'50px',padding:'8px 22px',fontWeight:'500',cursor:'pointer',
                background: activeCategory === cat ? '#ff6b35' : 'white',
                color: activeCategory === cat ? 'white' : '#555',
                border: activeCategory === cat ? '2px solid #ff6b35' : '2px solid #ddd',
                transition:'all 0.2s'}}>
              {cat}
            </button>
          ))}
        </div>
        <p className="text-muted mb-3">{filtered.length} items found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{fontSize:'4rem'}}>😕</div>
            <h4 className="mt-3">No food found</h4>
            <p className="text-muted">Try a different search or category</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filtered.map(food => (
              <div className="col" key={food.id}><FoodCard food={food}/></div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Home
