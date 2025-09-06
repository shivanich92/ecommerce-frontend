import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  return (
    <header className="bg-white sticky top-0 z-10 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">ShopSwift</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/">Products</NavLink>
          <NavLink to="/cart">Cart ({items.reduce((s,i)=>s+i.qty,0)})</NavLink>
          {user ? <>
            <span className="text-sm text-gray-600">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn" onClick={()=>{ logout(); navigate('/'); }}>Logout</button>
          </> : <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup" className="btn">Sign up</NavLink>
          </>}
        </nav>
      </div>
    </header>
  );
}
