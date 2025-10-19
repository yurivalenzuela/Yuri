import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";
import "./NavBar.css";


export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ff-header">
      <div className="ff-nav container">
        {/* Brand */}
        <Link to="/" className="brand">
          Faith & Flour
        </Link>

        {/* Desktop links */}
        <nav className="links desktop">
          <NavLink end to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/menu">Menu</NavLink>
        </nav>

        {/* Cart icon */}
        <div className="cart-slot">
          <CartIcon />
        </div>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="links mobile">
          <NavLink end to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menu</NavLink>
        </nav>
      )}
    </header>
  );
}
