import { useCart } from '../context/CartContext';
export default function ProductCard({ p }){
  const { add } = useCart();
  return (
    <div className="card flex flex-col gap-2">
      <img src={p.image || `https://picsum.photos/seed/${p._id}/600/400`} alt={p.title} className="rounded-xl w-full h-40 object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{p.title}</div>
        <div className="text-sm text-gray-500">{p.description}</div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold">₹{p.price}</span>
        <button className="btn" onClick={()=> add(p,1)}>Add</button>
      </div>
    </div>
  );
}
