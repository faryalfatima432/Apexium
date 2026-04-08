
// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     totalPrice,
//     clearCart,
//   } = useCart();

//   const navigate = useNavigate();
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const backend_url =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   // Fetch similar products (not specific to cart items)
//   useEffect(() => {
//     const fetchSimilarProducts = async () => {
//       setLoading(true);
//       try {
//         const productsRes = await fetch(`${backend_url}/api/products`);
//         const allProducts = await productsRes.json();
        
//         // Get all products except those in cart
//         const cartIds = cartItems.map(item => item.id);
//         const similar = allProducts
//           .filter(p => !cartIds.includes(p._id))
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 8); // Show 8 similar products

//         setSimilarProducts(similar);
//       } catch (err) {
//         console.log("Error fetching similar products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (cartItems.length > 0) {
//       fetchSimilarProducts();
//     }
//   }, [cartItems]);

//   if (cartItems.length === 0) {
//     return (
//       <div className="empty-cart-container">
//         <div className="empty-cart-content">
//           <i className="fas fa-shopping-cart empty-cart-icon"></i>
//           <h2>Your Cart is Empty</h2>
//           <p>Add items to your cart to get started!</p>
//           <button 
//             className="btn-back-shopping"
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       {/* LEFT: ALL CART ITEMS */}
//       <div className="cart-items-section">
//         <div className="cart-header">
//           <h2>Shopping Cart</h2>
//           <span className="item-count">({cartItems.length} items)</span>
//         </div>

//         {/* ALL ITEMS */}
//         <div className="all-cart-items">
//           {cartItems.map((item) => (
//             <div className="cart-card" key={item.id}>
//               {/* IMAGE */}
//               <div className="cart-card-image">
//                 <img src={item.image} alt={item.name} />
//               </div>

//               {/* DETAILS */}
//               <div className="cart-card-details">
//                 <h5 className="cart-item-name">{item.name}</h5>
//                 <p className="cart-item-price">Rs {item.price}</p>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="qty-controls">
//                   <button 
//                     className="qty-btn" 
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   >
//                     −
//                   </button>
//                   <span className="qty-value">{item.quantity}</span>
//                   <button 
//                     className="qty-btn" 
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* SUBTOTAL & ACTION */}
//               <div className="cart-card-action">
//                 <p className="cart-subtotal">
//                   Rs {(item.price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromCart(item.id)}
//                   title="Remove from cart"
//                 >
//                   <i className="fas fa-trash"></i>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT: ORDER SUMMARY */}
//       <div className="order-summary-section">
//         <div className="order-summary-card">
//           <h3>Order Summary</h3>

//           {/* SUMMARY ROWS */}
//           <div className="summary-rows">
//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>Rs {totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Delivery</span>
//               <span className="delivery-free">FREE</span>
//             </div>
//             <div className="summary-divider"></div>
//             <div className="summary-row total-row">
//               <span>Total</span>
//               <span>Rs {totalPrice.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="summary-buttons">
//             <button 
//               className="btn-checkout"
//               onClick={() => navigate("/checkout")}
//             >
//               <i className="fas fa-lock me-2"></i>Proceed to Checkout
//             </button>
//             <button 
//               className="btn-continue-shopping"
//               onClick={() => navigate("/")}
//             >
//               Continue Shopping
//             </button>
//             <button 
//               className="btn-clear-cart"
//               onClick={clearCart}
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SIMILAR PRODUCTS SECTION */}
//       {similarProducts.length > 0 && (
//         <div className="similar-products-section-cart">
//           <h3>You Might Also Like</h3>
//           <div className="similar-products-rows">
//             {similarProducts.map((p) => (
//               <div
//                 key={p._id}
//                 className="similar-product-card-cart"
//                 onClick={() => navigate(`/product/${p._id}`)}
//               >
//                 <div className="similar-card-image">
//                   <img
//                     src={
//                       p.imageUrl
//                         ? `${backend_url}${p.imageUrl}`
//                         : "/images/shopping.png"
//                     }
//                     alt={p.name}
//                   />
//                   {p.salePrice && (
//                     <span className="sale-badge-cart">SALE</span>
//                   )}
//                 </div>
//                 <div className="similar-card-info-cart">
//                   <p className="similar-name">{p.name}</p>
//                   <div className="similar-price-cart">
//                     {p.salePrice ? (
//                       <>
//                         <span className="sale-price">Rs {p.salePrice}</span>
//                         <span className="old-price">Rs {p.price}</span>
//                       </>
//                     ) : (
//                       <span className="normal-price">Rs {p.price}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backend_url}/api/products`);
        const data = await res.json();
        const cartIds = cartItems.map(item => item.id);
        const similar = data.filter(p => !cartIds.includes(p._id))
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 8);
        setSimilarProducts(similar);
      } catch (err) {
        console.error("Error fetching similar products:", err);
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
          <i className="fas fa-shopping-cart empty-cart-icon"></i>
          <h2>Your Cart is Empty</h2>
          <p>Add products to your cart to start shopping!</p>
          <button className="btn-back-shopping" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* LEFT: CART ITEMS */}
      <div className="cart-items-section">
        <h2 className="cart-title">Shopping Cart ({cartItems.length} items)</h2>
        {cartItems.map(item => (
          <div className="cart-card" key={item.id}>
            <div className="cart-card-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-card-details">
              <h5 className="cart-item-name">{item.name}</h5>
              <p className="cart-item-price">Rs {item.price}</p>
              <div className="qty-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <div className="cart-card-action">
              <p className="cart-subtotal">Rs {(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      

      {/* SIMILAR PRODUCTS */}
      {loading ? (
        <p className="loading-text">Loading similar products...</p>
      ) : similarProducts.length > 0 && (
        <div className="similar-products-section-cart">
          <h3>You Might Also Like</h3>
          <div className="similar-products-rows">
            {similarProducts.map(p => (
              <div className="similar-product-card-cart" key={p._id} onClick={() => navigate(`/product/${p._id}`)}>
                <div className="similar-card-image">
                  <img src={p.imageUrl ? `${backend_url}${p.imageUrl}` : "/images/shopping.png"} alt={p.name} />
                  {p.salePrice && <span className="sale-badge-cart">SALE</span>}
                </div>
                <div className="similar-card-info-cart">
                  <p className="similar-name">{p.name}</p>
                  <div className="similar-price-cart">
                    {p.salePrice ? (
                      <>
                        <span className="sale-price">Rs {p.salePrice}</span>
                        <span className="old-price">Rs {p.price}</span>
                      </>
                    ) : (
                      <span className="normal-price">Rs {p.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="order-summary-section order-summary-sticky">
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs {totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="delivery-free">FREE</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>Rs {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="summary-buttons">
            <button className="btn-checkout" onClick={() => navigate("/checkout")}>
              <i className="fas fa-lock me-2"></i>Proceed to Checkout
            </button>
            <button className="btn-continue-shopping" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
            <button className="btn-clear-cart" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;