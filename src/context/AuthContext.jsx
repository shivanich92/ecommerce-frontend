import { createContext, useContext, useState } from 'react';
import { api } from '../api';
const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }){
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user') || 'null'));
  const login = async (email,password)=>{
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };
  const signup = async (name,email,password)=>{
    const { data } = await api.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };
  const logout = ()=>{
    localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null);
  };
  return <AuthCtx.Provider value={{ user, login, signup, logout }}>{children}</AuthCtx.Provider>;
}
