import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
export default function Signup(){
  const { signup } = useAuth();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState(''); const navigate=useNavigate();
  const submit=async(e)=>{ e.preventDefault(); setErr(''); try{ await signup(name,email,password); navigate('/'); }catch(e){ setErr(e.response?.data?.message || 'Signup failed'); }};
  return (
    <div className="max-w-md mx-auto p-6 mt-10 card">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form className="space-y-4" onSubmit={submit}>
        <div><label className="label">Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required /></div>
        <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <button className="btn w-full" type="submit">Sign up</button>
      </form>
      <p className="text-sm mt-3">Have an account? <Link className="underline" to="/login">Login</Link></p>
    </div>
  );
}
