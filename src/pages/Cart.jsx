
import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      {/* LEFT: CART ITEMS */}
      <div className="cart-items">
        <h2>Shopping Cart</h2>

        {cartItems.map((item) => (
          <div className="cart-card" key={item.id}>
            
            {/* IMAGE */}
            <img src={item.image} alt={item.name} />

            {/* DETAILS */}
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p className="price">${item.price}</p>

              {/* QUANTITY */}
              <div className="qty-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="cart-actions">
              <p className="subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button className="checkout-btn">
          Proceed to Checkout
        </button>

        <button className="clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;