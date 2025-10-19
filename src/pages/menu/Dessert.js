import "../../desserts.css";
import cookie from "../../assets/Dessert.png";
import { useCart } from "../../context/CartContext";

export default function Desserts() {
  const { add, remove } = useCart();
  const item = { name: "Choco Chips Cookies", price: 35 };

  return (
    <main className="page desserts">
      <div className="header-band">
        <div className="container">
          <h1 className="title shadow-title">Desserts</h1>
        </div>
      </div>

      <div className="container row">
        <img src={cookie} alt={item.name} />
        <div className="info">
          <h2>{item.name}</h2>
          <h3>About</h3>
          <p>
            Golden on the edges, soft in the center, and loaded with rich
            chocolate chunks that melt in every bite.
          </p>
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
