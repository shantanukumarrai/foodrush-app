const Footer = () => (
  <footer style={{background:'#1a1a2e',color:'#aaa',padding:'40px 0 20px'}}>
    <div className="container">
      <div className="row py-4">

        <div className="col-md-3 mb-4">
          <h5 style={{color:'white'}}>🍔 FoodRush</h5>
          <p style={{fontSize:'14px'}}>Delicious food delivered to your door. Fast, fresh, and affordable.</p>
        </div>

        <div className="col-md-2 mb-4">
          <h5 style={{color:'white'}}>Company</h5>
          <a href="#" style={{color:'#aaa',textDecoration:'none',display:'block',marginBottom:'6px'}}>About Us</a>
          <a href="#" style={{color:'#aaa',textDecoration:'none',display:'block',marginBottom:'6px'}}>Careers</a>
          <a href="#" style={{color:'#aaa',textDecoration:'none',display:'block',marginBottom:'6px'}}>Blog</a>
        </div>

        <div className="col-md-3 mb-4">
          <h5 style={{color:'white'}}>FAQ</h5>
          <p style={{fontSize:'13px',marginBottom:'6px'}}>🚚 <strong style={{color:'#ddd'}}>Delivery time?</strong><br/>30-45 minutes average delivery.</p>
          <p style={{fontSize:'13px',marginBottom:'6px'}}>💳 <strong style={{color:'#ddd'}}>Payment options?</strong><br/>UPI, Card, Cash on Delivery.</p>
          <p style={{fontSize:'13px',marginBottom:'6px'}}>🔄 <strong style={{color:'#ddd'}}>Cancel order?</strong><br/>Cancel within 5 mins of ordering.</p>
          <p style={{fontSize:'13px',marginBottom:'0'}}>📦 <strong style={{color:'#ddd'}}>Track order?</strong><br/>Track via My Orders page.</p>
        </div>

        <div className="col-md-4 mb-4">
          <h5 style={{color:'white'}}>👨‍💻 Developer</h5>
          <p style={{fontSize:'14px',marginBottom:'6px'}}>
            <strong style={{color:'white'}}>Shantanu Kumar Ray</strong>
          </p>
          <p style={{fontSize:'13px',marginBottom:'6px'}}>📧 <a href="mailto:shantanukumarrai75@gmail.com" style={{color:'#ff6b35',textDecoration:'none'}}>shantanukumarrai75@gmail.com</a></p>
          <p style={{fontSize:'13px',marginBottom:'6px'}}>💼 Full Stack Developer</p>
          <p style={{fontSize:'13px',marginBottom:'8px'}}>🚀 React.js | Node.js | JSON Server</p>
          <div className="d-flex gap-3 mt-2">
            <a href="https://www.linkedin.com/in/shantanu-kumar-ray-18740b284/" target="_blank"
               style={{background:'#0077b5',color:'white',padding:'6px 14px',borderRadius:'6px',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>
              💼 LinkedIn
            </a>
            <a href="mailto:shantanukumarrai75@gmail.com"
               style={{background:'#ff6b35',color:'white',padding:'6px 14px',borderRadius:'6px',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>
              📧 Email Me
            </a>
          </div>
        </div>

      </div>
      <hr style={{borderColor:'#333'}}/>
      <p className="text-center pb-2" style={{fontSize:'13px'}}>
        © 2025 FoodRush. Built with ❤️ by{' '}
        <a href="https://www.linkedin.com/in/shantanu-kumar-ray-18740b284/" target="_blank" 
           style={{color:'#ff6b35',textDecoration:'none'}}>
          Shantanu Kumar Ray
        </a>. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
