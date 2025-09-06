import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const [items,setItems]=useState([]); const [meta,setMeta]=useState({page:1,pages:1,total:0});
  const [q,setQ]=useState(''); const [category,setCategory]=useState(''); const [min,setMin]=useState(''); const [max,setMax]=useState('');

  async function load(page=1){
    const params = new URLSearchParams();
    if(q) params.set('q', q);
    if(category) params.set('category', category);
    if(min) params.set('price_min', min);
    if(max) params.set('price_max', max);
    params.set('page', page); params.set('limit', 12);
    const { data } = await api.get(`/items?${params.toString()}`);
    setItems(data.items); setMeta({ page: data.page, pages: data.pages, total: data.total });
  }

  useEffect(()=>{ load(1); },[]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <div className="flex-1 min-w-[180px]"><label className="label">Search</label><input className="input" placeholder="Search products" value={q} onChange={e=>setQ(e.target.value)} /></div>
        <div><label className="label">Category</label><select className="input" value={category} onChange={e=>setCategory(e.target.value)}><option value="">All</option><option>Electronics</option><option>Fashion</option><option>Home</option><option>Sports</option></select></div>
        <div><label className="label">Min price</label><input className="input" type="number" value={min} onChange={e=>setMin(e.target.value)} /></div>
        <div><label className="label">Max price</label><input className="input" type="number" value={max} onChange={e=>setMax(e.target.value)} /></div>
        <button className="btn" onClick={()=> load(1)}>Apply</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p._id} p={p} />)}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <button className="btn" disabled={meta.page<=1} onClick={()=> load(meta.page-1)}>Prev</button>
        <div className="px-3 py-2">Page {meta.page} / {meta.pages}</div>
        <button className="btn" disabled={meta.page>=meta.pages} onClick={()=> load(meta.page+1)}>Next</button>
      </div>
    </div>
  );
}
