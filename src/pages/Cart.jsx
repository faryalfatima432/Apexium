import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  const navigate = useNavigate();

  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${backend_url}/api/products`);
        const data = await res.json();

        const cartIds = cartItems.map((item) => item.id);

        const similar = data
          .filter((p) => !cartIds.includes(p._id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

        setSimilarProducts(similar);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0) fetchSimilarProducts();
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          
          <h2 className="text-center"><i className="fas fa-shopping-cart empty-cart-icon"></i>Your Cart is Empty</h2>
          <button onClick={() => navigate("/")}>Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
     <div className="cart-items-section">
        <h2 className="cart-title">
          Shopping Cart ({cartItems.length})
        </h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">

            <div className="cart-card-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="cart-card-details">
              <h4>{item.name}</h4>

              <p className="price">Rs {item.price}</p>

              <div className="qty-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-card-action">
              <p className="subtotal">
                Rs {(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* SIMILAR PRODUCTS */}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        similarProducts.length > 0 && (
          <div className="similar-products-section">

            <h3 style={{color: "#6b4423"}}>You Might Also Like</h3>

            <div className="similar-products-grid">

              {similarProducts.map((p) => (
                <ProductCard key={p._id} p={p} backend_url={backend_url} />
              ))}

            </div>
          </div>
        )
      )}

      {/* BOTTOM CHECKOUT BAR */}

      <div className="checkout-bar">

        <div className="checkout-total">
          Total: <span>Rs {totalPrice.toFixed(2)}</span>
        </div>

        <div className="checkout-buttons">

          <button
            className="clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Cart;