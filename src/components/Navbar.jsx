import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">🍔 Food<span style={{color:'#ff6b35'}}>Rush</span></Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto ms-4 gap-1">
            <li className="nav-item">
              <NavLink className={({isActive}) => `nav-link ${isActive ? 'fw-bold' : ''}`} style={({isActive}) => isActive ? {color:'#ff6b35'} : {}} to="/">Home</NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className={({isActive}) => `nav-link ${isActive ? 'fw-bold' : ''}`} style={({isActive}) => isActive ? {color:'#ff6b35'} : {}} to="/orders">My Orders</NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/cart" className="btn btn-outline-warning position-relative px-3">
              🛒 Cart
              {totalItems > 0 && (
                <span style={{background:'#ff6b35',color:'white',borderRadius:'50%',width:'20px',height:'20px',fontSize:'11px',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',top:'-6px',right:'-8px'}}>{totalItems}</span>
              )}
            </Link>
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted" style={{fontSize:'14px'}}>👋 {user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-secondary px-3">Login</Link>
                <Link to="/signup" className="btn px-3" style={{background:'#ff6b35',color:'white',border:'none'}}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
