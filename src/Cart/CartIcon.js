import { Link } from "react-router-dom";
import { useCart } from "./CartContext";   // ✅ same folder
import "./CartIcon.css";                   // ✅ exact filename & case

export default function CartIcon() {
  const { items } = useCart();

  // Sum of quantities
  const count = items.reduce((sum, it) => sum + (it.qty || 0), 0);

  return (
    <Link to="/cart" className="cart-icon" aria-label={`Cart (${count})`}>
      <svg
        width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      >
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>

      {count > 0 && <span className="cart-badge">{count}</span>}
    </Link>
  );
}
