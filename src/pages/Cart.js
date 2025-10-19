import { useCart } from "../Cart/CartContext";

export default function Cart() {
  const { items, removeItem, clear } = useCart();
  

  return (
    <main className="page-wrap" style={{ padding: "2rem 1rem", color: "#fff" }}>
      <h2>My Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0", maxWidth: 720 }}>
            {items.map(it => (
              <li key={it.id}
                  style={{background:"#1a1730",borderRadius:12,padding:"14px 16px",marginBottom:12}}>
                <strong>{it.name}</strong> × {it.qty}
                <button
                  onClick={() => removeItem(it.id)}
                  style={{float:"right", background:"#e53935", color:"#fff",
                          border:"none", borderRadius:8, padding:"6px 10px", cursor:"pointer"}}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clear}
            style={{background:"#d83a3a", color:"#fff", border:"none",
                    borderRadius:10, padding:"10px 14px", cursor:"pointer"}}>
            Clear Cart
          </button>
        </>
      )}
    </main>
  );
}
