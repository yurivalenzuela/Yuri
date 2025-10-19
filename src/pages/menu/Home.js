import "../home.css";
import { Link } from "react-router-dom";
import "../home.css";          // one level up to pages/home.css


export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Freshly Baked, Made with Love 💜</h1>
        <p>Delicious cookies, cakes, and desserts made with faith and passion.</p>
        
        <Link to="/menu" className="cta">Order Now</Link>

      </div>
    </section>
  );
}
