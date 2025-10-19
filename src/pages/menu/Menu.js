import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add this
import { useCart } from "../../Cart/CartContext";
import "./menu.css";

const DATA = {
  Drinks: [
    { id: "d1", name: "Iced Latte",  price: "₱120", badge: "COFFEE" },
    { id: "d2", name: "Chocolate Shake", price: "₱140", badge: "SHAKE" },
    { id: "d3", name: "Strawberry Milk", price: "₱130", badge: "MILK" },
  ],
  Meals: [
    { id: "m1", name: "Chicken Wings", price: "₱160", badge: "3 pcs CHICKEN WINGS" },
    { id: "m2", name: "Lasagna",     price: "₱190", badge: "PASTA" },
    { id: "m3", name: "Baked Mac",   price: "₱170", badge: "PASTA" },
  ],
  Desserts: [
    { id: "s1", name: "Choco Chip Cookie", price: "₱65", badge: "SOFT COOKIE" },
    { id: "s2", name: "Red Velvet Cookie", price: "₱70", badge: "SOFT COOKIE" },
    { id: "s3", name: "Brownie Bite",      price: "₱60", badge: "SOFT BROWNIE" },
  ],
};

export default function Menu() {
  const [openKey, setOpenKey] = useState(null);
  const gridRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ✅

  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
    requestAnimationFrame(() =>
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const goToCart = () => navigate("/cart"); // ✅

  const list = openKey ? DATA[openKey] : [];

  return (
    <main className="menu-page">
      <section className="menu-banner">
        <h1>Faithful Foods</h1>
        <p>
          Every bite is a reminder of God’s goodness, baked with love, gratitude, and grace to bring joy to your table.
        </p>
      </section>

      <section className="menu-board">
        <div className="menu-row">
          <button
            className={`menu-btn ${openKey === "Drinks" ? "is-active" : ""}`}
            onClick={() => toggle("Drinks")}
          >
            Drinks
          </button>
          <button
            className={`menu-btn ${openKey === "Meals" ? "is-active" : ""}`}
            onClick={() => toggle("Meals")}
          >
            Meals
          </button>
          <button
            className={`menu-btn ${openKey === "Desserts" ? "is-active" : ""}`}
            onClick={() => toggle("Desserts")}
          >
            Desserts
          </button>

          {/* ✅ make this a button and navigate to /cart */}
          <button className="done-chip" onClick={goToCart} type="button">
            Done
          </button>
        </div>

        <div ref={gridRef} className="product-grid">
          {/* ✅ centered hint */}
          {openKey === null && (
            <p className="hint">Tap a category to see products.</p>
          )}

          {list.map((p) => (
            <article className="p-card" key={p.id}>
              <div className="p-media with-emoji"><span className="emoji"></span></div>
              <div className="p-body">
                <span className="p-badge">{p.badge}</span>
                <h3 className="p-title">{p.name}</h3>
                <div className="p-meta">
                  <span className="p-price">{p.price}</span>
                </div>
                <button className="p-cta" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
