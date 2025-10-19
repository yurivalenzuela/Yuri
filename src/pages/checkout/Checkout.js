import { useMemo, useState } from "react";
import { useCart } from "../../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const formatPhp = (n) => `₱${Number(n || 0).toLocaleString()}`;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const rows = useMemo(
    () =>
      items.map((it) => ({
        id: it.id,
        name: it.name,
        qty: it.qty,
        price: it.price, // e.g. "₱60"
      })),
    [items]
  );

  const shipping = 0;
  const total = Number(subtotal) + shipping;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      setSending(true);
      setStatus("Placing your order…");

      // Send to your API route (configure backend separately)
      const resp = await fetch("/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, items: rows, subtotal, total }),
      });

      if (!resp.ok) throw new Error("Failed to send order");

      // Success: clear cart + redirect home with flash message
      clearCart();
      navigate("/", {
        replace: true,
        state: { flash: "Thank you! Your order was placed successfully. 💜" },
      });
    } catch (err) {
      console.error(err);
      setStatus("Sorry, something went wrong sending your order. Please try again.");
      setSending(false);
    }
  };

  return (
    <main className="checkout-page">
      {/* Hero */}
      <header className="checkout-hero">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </header>

      {/* Body */}
      <section className="checkout-body">
        <div className="co-grid">
          {/* Left: form */}
          <form id="checkout-form" className="co-form" onSubmit={onSubmit}>
            <div className="co-card">
              <h2>Contact Information</h2>
              <div className="grid-2">
                <label>
                  First Name *
                  <input name="firstName" required placeholder="Juan" />
                </label>
                <label>
                  Last Name *
                  <input name="lastName" required placeholder="Dela Cruz" />
                </label>
              </div>
              <div className="grid-2">
                <label>
                  Email *
                  <input type="email" name="email" required placeholder="you@example.com" />
                </label>
                <label>
                  Phone *
                  <input name="phone" required placeholder="+63 9xx xxx xxxx" />
                </label>
              </div>
            </div>

            <div className="co-card">
              <h2>Shipping Address</h2>
              <label>
                Address *
                <input name="address" required placeholder="House/Unit, Street, Barangay" />
              </label>
              <div className="grid-4">
                <label>
                  City *
                  <input name="city" required placeholder="Parañaque" />
                </label>
                <label>
                  Region *
                  <select name="region" required defaultValue="">
                    <option value="" disabled>Select Region</option>
                    <option>Metro Manila</option>
                    <option>CALABARZON</option>
                    <option>Central Luzon</option>
                    <option>Central Visayas</option>
                    <option>Davao Region</option>
                  </select>
                </label>
                <label>
                  ZIP Code *
                  <input name="zip" required placeholder="1609" />
                </label>
                <div className="spacer" />
              </div>
            </div>

            <div className="co-card">
              <h2>Payment Method</h2>
              <div className="pay-list">
                <label className="radio">
                  <input type="radio" name="payment" value="COD" defaultChecked />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="radio">
                  <input type="radio" name="payment" value="GCash" />
                  <span>GCash</span>
                </label>
                <label className="radio">
                  <input type="radio" name="payment" value="Bank Transfer" />
                  <span>Bank Transfer</span>
                </label>
              </div>
            </div>

            <div className="co-card">
              <h2>Order Notes (Optional)</h2>
              <textarea name="notes" rows={4} placeholder="Special instructions, delivery notes, etc." />
            </div>

            {status && <div className="co-status" role="status">{status}</div>}
          </form>

          {/* Right: summary */}
          <aside className="co-summary">
            <h3>Order Summary</h3>

            <ul className="co-lines">
              {rows.map((row) => (
                <li key={row.id} className="co-line">
                  <div className="co-line-info">
                    <strong className="co-line-title">{row.name}</strong>
                    <small className="co-line-sub">Qty: {row.qty}</small>
                  </div>
                  <div className="co-line-price">{row.price}</div>
                </li>
              ))}
            </ul>

            <hr className="co-divider" />

            <div className="co-row">
              <span>Subtotal</span>
              <strong>{formatPhp(subtotal)}</strong>
            </div>
            <div className="co-row">
              <span>Shipping</span>
              <strong>{shipping ? formatPhp(shipping) : "Free"}</strong>
            </div>
            <div className="co-row total">
              <span>Total</span>
              <strong>{formatPhp(total)}</strong>
            </div>

            {/* This button submits the form above */}
            <button
              className="co-place"
              type="submit"
              form="checkout-form"
              disabled={sending || items.length === 0}
            >
              {sending ? "Placing Order…" : "Place Order"}
            </button>

            <p className="co-terms">
              By placing your order, you agree to our terms and conditions.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
