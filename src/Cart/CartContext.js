import { createContext, useContext, useState, useMemo, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Custom hook for easy cart access
export const useCart = () => useContext(CartContext);

// Provider component that wraps your entire app
export function CartProvider({ children }) {
  // Load cart items from localStorage (if available)
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  // Add an item to the cart
  const addToCart = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((x) => x.id === product.id);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = { ...next[existingIndex], qty: next[existingIndex].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Increase item quantity
  const inc = (id) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  // Decrease item quantity (minimum 1)
  const dec = (id) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      )
    );
  };

  // Remove item completely
  const removeItem = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart_items");
  };

  // Compute subtotal
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const priceNum = Number(String(it.price).replace(/[^\d.]/g, "")); // handle "₱120"
      return sum + priceNum * it.qty;
    }, 0);
  }, [items]);

  // All cart functions available to the rest of the app
  const value = {
    items,
    addToCart,
    inc,
    dec,
    removeItem,
    clearCart,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
