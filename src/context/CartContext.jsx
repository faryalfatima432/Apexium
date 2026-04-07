
import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {

  // ✅ IMPORTANT: Load directly from localStorage (not inside useEffect)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.log("Error reading cart:", err);
      return [];
    }
  });

  // ✅ Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (err) {
      console.log("Error saving cart:", err);
    }
  }, [cartItems]);

  // ✅ Add to Cart
  //  const addToCart = (product) => {
  //   setCartItems((prev) => {
  //     const existing = prev.find((item) => item.id === product.id);

  //     let updatedCart;

  //     if (existing) {
  //       updatedCart = prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       updatedCart = [...prev, { ...product, quantity: 1 }];
  //     }

  //     return updatedCart;
  //   });
  // };
  // ✅ Add to Cart (FIXED)
const addToCart = (product) => {
  const qty = product.quantity || 1;

  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty } // ✅ FIXED
          : item
      );
    } else {
      updatedCart = [...prev, { ...product, quantity: qty }]; // ✅ FIXED
    }

    return updatedCart;
  });
};

  // ✅ Remove
    const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      return updatedCart;
    });
  };

  // ✅ Update quantity
    const updateQuantity = (id, quantity) => {
    setCartItems((prev) => {
      let updatedCart;

      if (quantity <= 0) {
        updatedCart = prev.filter((item) => item.id !== id);
      } else {
        updatedCart = prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      return updatedCart;
    });
  };

  // ✅ Clear
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // ✅ Totals
  const totalItems = cartItems.reduce((a, b) => a + b.quantity, 0);
  const totalPrice = cartItems.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;