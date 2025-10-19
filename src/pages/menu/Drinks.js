import "../../drinks.css";
import drink from "../../assets/Drinks.png";
import { useCart } from "../../context/CartContext";

export default function Drinks() {
  const { add, remove } = useCart();
  const item = { name: "Salted Caramel Coffee", price: 85 };

  return (
    <main className="page drinks">
      <div className="header-band">
        <div className="container"><h1 className="title shadow-title">Drinks</h1></div>
      </div>

      <div className="container row">
        <img src={drink} alt={item.name} />
        <div className="info">
          <h2>{item.name}</h2>
          <h3>About</h3>
          <p>A refreshing coffee indulgence that perfectly blends rich espresso with creamy milk, drizzled generously with golden caramel.</p>
          <div className="actions">
            <span className="price">Price ₱ {item.price}</span>
            <button className="round" onClick={() => add(item.name, item.price)}>+</button>
            <button className="round" onClick={() => remove(item.name)}>−</button>
          </div>
        </div>
      </div>
    </main>
  );
}
