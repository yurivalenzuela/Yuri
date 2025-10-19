import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Cart/CartContext";
import "./cart.css";

const peso = (n) => `₱${Number(n || 0).toLocaleString()}`;

export default function CartPage() {
  const { items, inc, dec, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  // --- Coupon / totals ---
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null); // { code, discount }
  const [msg, setMsg] = useState("");

  // Example coupons; tweak as you like
  const COUPONS = {
    POPS40: { type: "percent", value: 0.4, label: "40% OFF" },
    LESS500: { type: "flat", value: 500, label: "₱500 OFF" },
  };

  const shipping = 0; // free for this design
  const discount = useMemo(() => {
    if (!applied) return 0;
    if (applied.type === "percent") return Math.round(subtotal * applied.value);
    if (applied.type === "flat") return Math.min(applied.value, subtotal);
    return 0;
  }, [applied, subtotal]);

  const total = Math.max(0, subtotal - discount + shipping);

  const applyCode = () => {
    const key = code.trim().toUpperCase();
    const found = COUPONS[key];
    if (!found) {
      setMsg("Invalid promo code.");
      setApplied(null);
      return;
    }
    setApplied({ code: key, ...found });
    setMsg(`Applied: ${found.label}`);
  };

  // Empty state
  if (items.length === 0) {
    return (
      <main className="cart-empty-hero">
        <h1 className="cart-empty-title">Shopping Cart</h1>
        <p className="cart-empty-sub">Review your selected items and proceed to checkout</p>

        <section className="empty-card" role="region" aria-label="Empty cart">
          <div className="empty-icon" aria-hidden>🛒</div>
          <h2>Your cart is empty</h2>
          <p className="empty-desc">
            A little faith and a lot of flour, your next favorite treat is waiting.
          </p>
          <button className="empty-cta" onClick={() => navigate("/menu")} type="button">
            Shop Now →
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-shell">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your selected items and proceed to checkout</p>
      </header>

      <div className="cart-grid">
        {/* LEFT: items list */}
        <section className="cart-list-v2">
          {items.map((it) => (
            <article key={it.id} className="cart-card">
              <div className="card-left">
                <div className="thumb" aria-hidden />
                <div className="info">
                  <div className="title-row">
                    <h3 className="item-title">{it.name}</h3>
                  </div>
                  <div className="meta-row">
                    <span className="price">{it.price}</span>
                    <button className="link danger" onClick={() => removeItem(it.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-right">
                <div className="qty-box">
                  <button className="qty-btn" onClick={() => dec(it.id)} aria-label="Decrease">
                    −
                  </button>
                  <span className="qty-num">{it.qty}</span>
                  <button className="qty-btn" onClick={() => inc(it.id)} aria-label="Increase">
                    +
                  </button>
                </div>
                <button
                  className="trash"
                  title="Remove item"
                  onClick={() => removeItem(it.id)}
                  aria-label="Remove item"
                >
                  🗑
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* RIGHT: summary */}
        <aside className="summary-card">
          <div className="free-ship">Your cart qualifies for free shipping</div>

          <div className="coupon-row">
            <input
              className="coupon-input"
              placeholder="Enter promo code (try: POPS40)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="apply-btn" onClick={applyCode}>Apply</button>
          </div>
          {msg && <div className="coupon-msg">{msg}</div>}

          <div className="line">
            <span>Subtotal:</span>
            <strong>{peso(subtotal)}</strong>
          </div>

          {applied && (
            <div className="line">
              <span>Discount ({applied.code}):</span>
              <strong>-{peso(discount)}</strong>
            </div>
          )}

          <div className="line">
            <span>Shipping:</span>
            <strong>Free</strong>
          </div>

          <hr className="sum-divider" />

          <div className="line total">
            <span>Total:</span>
            <strong>{peso(total)}</strong>
          </div>

          <button className="checkout-big" onClick={() => navigate("/checkout")}>
            Checkout <span className="chev">›</span>
          </button>

          <Link to="/menu" className="continue-wide">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
