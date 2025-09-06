import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api } from '../api';
import { useAuth } from './AuthContext';
const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

const LS_KEY = 'cart';
export default function CartProvider({ children }){
  const { user } = useAuth();
  const [items, setItems] = useState(()=> JSON.parse(localStorage.getItem(LS_KEY) || '[]'));

  useEffect(()=> localStorage.setItem(LS_KEY, JSON.stringify(items)), [items]);

  useEffect(()=>{
    (async ()=>{
      if(!user) return;
      try{
        const local = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
        if(local.length){
          await api.post('/cart/set', local.map(i=>({ itemId: i._id, qty: i.qty })));
          localStorage.setItem(LS_KEY, JSON.stringify([]));
          setItems([]);
        }
        const { data } = await api.get('/cart');
        const merged = (data.items||[]).map(ci=>({ _id: ci.item._id, title: ci.item.title, price: ci.item.price, image: ci.item.image, qty: ci.qty }));
        setItems(merged);
      }catch(e){}
    })();
  }, [user]);

  const add = async (product, qty=1)=>{
    setItems(prev=>{
      const idx = prev.findIndex(p=>p._id===product._id);
      if(idx>=0){ const copy=[...prev]; copy[idx] = {...copy[idx], qty: copy[idx].qty + qty}; return copy; }
      return [...prev, { ...product, qty }];
    });
    if(user) await api.post('/cart/add', { itemId: product._id, qty });
  };
  const remove = async (productId, qty=1)=>{
    setItems(prev => prev.map(p=> p._id===productId ? {...p, qty: p.qty-qty} : p).filter(p=>p.qty>0));
    if(user) await api.post('/cart/remove', { itemId: productId, qty });
  };
  const total = useMemo(()=> items.reduce((s,i)=> s + i.price * i.qty, 0), [items]);

  return <CartCtx.Provider value={{ items, add, remove, total }}>{children}</CartCtx.Provider>;
}
