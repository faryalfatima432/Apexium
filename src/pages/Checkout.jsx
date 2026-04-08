// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css";

// const Checkout = () => {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     paymentMethod: "cod",
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [loading, setLoading] = useState(false);

//   if (cartItems.length === 0 && !orderPlaced) {
//     return (
//       <div className="empty-checkout">
//         <h2>Your cart is empty</h2>
//         <button onClick={() => navigate("/")}>Continue Shopping</button>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Simulate order placement
//       setTimeout(() => {
//         setOrderPlaced(true);
//         setLoading(false);
//       }, 1500);
//     } catch (err) {
//       console.error("Error placing order:", err);
//       setLoading(false);
//       alert("Error placing order. Please try again.");
//     }
//   };

//   if (orderPlaced) {
//     return (
//       <div className="order-success-container">
//         <div className="order-success-content">
//           <div className="success-icon">
//             <i className="fas fa-check-circle"></i>
//           </div>
//           <h2>Order Placed Successfully!</h2>
//           <p className="order-number">Order #ORD-{Date.now().toString().slice(-6)}</p>
//           <p className="order-message">
//             Thank you for your purchase. Your order has been confirmed and will be delivered soon.
//           </p>

//           <div className="order-details-mini">
//             <p>
//               <strong>Total Amount:</strong> Rs {totalPrice.toFixed(2)}
//             </p>
//             <p>
//               <strong>Delivery:</strong> 3-5 Business Days
//             </p>
//           </div>

//           <div className="success-buttons">
//             <button
//               className="btn-orders"
//               onClick={() => {
//                 clearCart();
//                 navigate("/");
//               }}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-container">
//       <div className="checkout-wrapper">
//         {/* LEFT: CHECKOUT FORM */}
//         <div className="checkout-form-section">
//           <h2>Checkout</h2>

//           <form onSubmit={handleSubmit} className="checkout-form">
//             {/* PERSONAL INFORMATION */}
//             <div className="form-section">
//               <h4>Personal Information</h4>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>First Name *</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder="Enter first name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Last Name *</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder="Enter last name"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   required
//                 />
//               </div>
//             </div>

//             {/* DELIVERY ADDRESS */}
//             <div className="form-section">
//               <h4>Delivery Address</h4>

//               <div className="form-group">
//                 <label>Address *</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Street address"
//                   required
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Postal Code</label>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     placeholder="Postal code"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* PAYMENT METHOD */}
//             <div className="form-section">
//               <h4>Payment Method</h4>
//               <div className="payment-options">
//                 <label className="payment-option">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={formData.paymentMethod === "cod"}
//                     onChange={handleChange}
//                   />
//                   <span className="payment-label">
//                     <i className="fas fa-money-bill-wave"></i>Cash on Delivery
//                   </span>
//                 </label>
//                 <label className="payment-option">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="card"
//                     checked={formData.paymentMethod === "card"}
//                     onChange={handleChange}
//                   />
//                   <span className="payment-label">
//                     <i className="fas fa-credit-card"></i>Credit/Debit Card
//                   </span>
//                 </label>
//                 <label className="payment-option">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="bank"
//                     checked={formData.paymentMethod === "bank"}
//                     onChange={handleChange}
//                   />
//                   <span className="payment-label">
//                     <i className="fas fa-university"></i>Bank Transfer
//                   </span>
//                 </label>
//               </div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               className="btn-place-order"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner"></span> Processing...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-check me-2"></i>Place Order
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: ORDER SUMMARY */}
//         <div className="checkout-summary-section">
//           <div className="checkout-summary-card">
//             <h3>Order Summary</h3>

//             {/* ITEMS LIST */}
//             <div className="summary-items">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <div className="summary-item-image">
//                     <img src={item.image} alt={item.name} />
//                     <span className="item-qty">{item.quantity}</span>
//                   </div>
//                   <div className="summary-item-details">
//                     <p className="summary-item-name">{item.name}</p>
//                     <p className="summary-item-price">
//                       Rs {(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* DIVIDER */}
//             <div className="summary-divider"></div>

//             {/* PRICING */}
//             <div className="summary-pricing">
//               <div className="pricing-row">
//                 <span>Subtotal</span>
//                 <span>Rs {totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="pricing-row">
//                 <span>Delivery Fee</span>
//                 <span className="free-shipping">FREE</span>
//               </div>
//               <div className="pricing-row">
//                 <span>Tax</span>
//                 <span>Rs 0</span>
//               </div>
//               <div className="pricing-divider"></div>
//               <div className="pricing-row total">
//                 <span>Total Amount</span>
//                 <span>Rs {totalPrice.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* GUARANTEES */}
//             <div className="guarantees">
//               <div className="guarantee-item">
//                 <i className="fas fa-shield-alt"></i>
//                 <span>Secure Checkout</span>
//               </div>
//               <div className="guarantee-item">
//                 <i className="fas fa-truck"></i>
//                 <span>Fast Delivery</span>
//               </div>
//               <div className="guarantee-item">
//                 <i className="fas fa-undo"></i>
//                 <span>Easy Returns</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Pre-fill form with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
      }));
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading while checking authentication
  if (!isAuthenticated()) {
    return (
      <div className="checkout-loading">
        <div className="spinner"></div>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Prepare order data
      const orderData = {
        products: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        })),
        totalAmount: totalPrice,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod
      };

      const res = await axios.post(
        `${backend_url}/api/orders`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success-container">
        <div className="order-success-content">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p className="order-number">Order #ORD-{Date.now().toString().slice(-6)}</p>
          <p className="order-message">
            Thank you for your purchase. Your order has been confirmed and will be delivered soon.
          </p>

          <div className="order-details-mini">
            <p>
              <strong>Total Amount:</strong> Rs {totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Delivery:</strong> 3-5 Business Days
            </p>
          </div>

          <div className="success-buttons">
            <button
              className="btn-orders"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className="btn-orders-secondary"
              onClick={() => navigate("/my-orders")}
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* LEFT: CHECKOUT FORM */}
        <div className="checkout-form-section">
          <h2>Checkout</h2>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="checkout-form">
            {/* PERSONAL INFORMATION */}
            <div className="form-section">
              <h4>Personal Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="form-section">
              <h4>Delivery Address</h4>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="form-section">
              <h4>Payment Method</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fas fa-money-bill-wave"></i>Cash on Delivery
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fas fa-credit-card"></i>Credit/Debit Card
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fas fa-university"></i>Bank Transfer
                  </span>
                </label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn-place-order"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Processing Order...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i>Place Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="checkout-summary-section">
          <div className="checkout-summary-card">
            <h3>Order Summary</h3>

            {/* ITEMS LIST */}
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-details">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-price">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="summary-divider"></div>

            {/* PRICING */}
            <div className="summary-pricing">
              <div className="pricing-row">
                <span>Subtotal</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
              <div className="pricing-row">
                <span>Delivery Fee</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="pricing-row">
                <span>Tax</span>
                <span>Rs 0</span>
              </div>
              <div className="pricing-divider"></div>
              <div className="pricing-row total">
                <span>Total Amount</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* GUARANTEES */}
            <div className="guarantees">
              <div className="guarantee-item">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Checkout</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-truck"></i>
                <span>Fast Delivery</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-undo"></i>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;