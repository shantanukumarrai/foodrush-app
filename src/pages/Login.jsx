import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',background:'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'}}>
      <div className="container">
        <div style={{background:'white',borderRadius:'20px',padding:'40px',boxShadow:'0 20px 60px rgba(0,0,0,0.15)',width:'100%',maxWidth:'440px',margin:'auto'}}>
          <div className="text-center mb-4">
            <div style={{fontSize:'2.5rem'}}>🍔</div>
            <h2 style={{fontWeight:'700',color:'#222'}}>Welcome back!</h2>
            <p className="text-muted">Login to your FoodRush account</p>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Email address</label>
              <input type="email" className="form-control" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                style={{borderRadius:'10px',padding:'12px 16px',border:'1.5px solid #e0e0e0'}}/>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                style={{borderRadius:'10px',padding:'12px 16px',border:'1.5px solid #e0e0e0'}}/>
            </div>
            <button type="submit" disabled={loading}
              style={{background:'#ff6b35',border:'none',color:'white',width:'100%',padding:'13px',fontSize:'1rem',fontWeight:'700',borderRadius:'10px',marginTop:'8px',cursor:'pointer'}}>
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>
          <p className="text-center mt-4 text-muted" style={{fontSize:'14px'}}>
            Don't have an account?{' '}
            <Link to="/signup" style={{color:'#ff6b35',fontWeight:600}}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
