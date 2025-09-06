import { useCart } from '../context/CartContext';
export default function Cart(){
  const { items, add, remove, total } = useCart();
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length===0 ? <div className="card">Cart is empty</div> : (
        <div className="space-y-3">
          {items.map(i=>(
            <div key={i._id} className="card flex items-center gap-4">
              <img src={i.image || `https://picsum.photos/seed/${i._id}/200/150`} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1"><div className="font-semibold">{i.title}</div><div className="text-sm text-gray-500">₹{i.price} × {i.qty}</div></div>
              <div className="flex items-center gap-2">
                <button className="btn" onClick={()=> remove(i._id,1)}>-</button>
                <div>{i.qty}</div>
                <button className="btn" onClick={()=> add(i,1)}>+</button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl">Total: ₹{total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
