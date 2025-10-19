import "../../meals.css";
import wings from "../../assets/Meals.png";
import { useCart } from "../../context/CartContext";

export default function Meals() {
  const { add, remove } = useCart();
  const item = { name: "Buffalo Wings", price: 120 };

   return (
    <main className="page meals">
      <div className="header-band">
        <div className="container"><h1 className="title shadow-title">Meals</h1></div>
      </div>
       <div className="container row">
        <img src={wings} alt={item.name} />
        <div className="info">
          <h2>{item.name}</h2>
          <h3>About</h3>
          <p>Irresistible wings—crisp outside, juicy inside—coated in bold, tangy buffalo sauce.</p>
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
