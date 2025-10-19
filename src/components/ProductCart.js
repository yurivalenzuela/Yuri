import { useCart } from "../cart/CartContext";
export default function ProductCard({ product }){
  const { addToCart } = useCart();
  return (
    <div className="card">
      {/* ...image, title, price... */}
      <button className="p-cta" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
