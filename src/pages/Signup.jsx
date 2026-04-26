import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true); setError('')
    try {
      await signup(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = { borderRadius:'10px', padding:'12px 16px', border:'1.5px solid #e0e0e0' }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',background:'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'}}>
      <div className="container">
        <div style={{background:'white',borderRadius:'20px',padding:'40px',boxShadow:'0 20px 60px rgba(0,0,0,0.15)',width:'100%',maxWidth:'440px',margin:'auto'}}>
          <div className="text-center mb-4">
            <div style={{fontSize:'2.5rem'}}>🍕</div>
            <h2 style={{fontWeight:'700',color:'#222'}}>Create Account</h2>
            <p className="text-muted">Join FoodRush and start ordering</p>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" style={inp}
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email address</label>
              <input type="email" className="form-control" placeholder="you@example.com" style={inp}
                value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="Min 6 characters" style={inp}
                value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Repeat password" style={inp}
                value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}/>
            </div>
            <button type="submit" disabled={loading}
              style={{background:'#ff6b35',border:'none',color:'white',width:'100%',padding:'13px',fontSize:'1rem',fontWeight:'700',borderRadius:'10px',marginTop:'8px',cursor:'pointer'}}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>
          <p className="text-center mt-4 text-muted" style={{fontSize:'14px'}}>
            Already have an account?{' '}
            <Link to="/login" style={{color:'#ff6b35',fontWeight:600}}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
