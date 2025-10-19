import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

// Your pages
import Home from "./pages/menu/Home";
import About from "./pages/menu/About";
import Contact from "./pages/menu/Contact";
import Menu from "./pages/menu/Menu";
import CartPage from "./pages/menu/CartPage";

// ✅ add this import (put Checkout wherever you saved it)
import Checkout from "./pages/checkout/Checkout"; 
// If you stored it alongside others in /pages/menu/, use:
// import Checkout from "./pages/menu/Checkout";

export default function App() {
  return (
    <>
      {/* Navbar on all pages */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ new route */}
        <Route path="/checkout" element={<Checkout />} />

        {/* optional: simple 404 */}
        {/* <Route path="*" element={<div style={{padding: 16}}>Not found</div>} /> */}
      </Routes>
    </>
  );
}
