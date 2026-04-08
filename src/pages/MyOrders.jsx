import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backend_url}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return <div>Redirecting to login...</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading orders...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>My Orders</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h4>No orders found</h4>
          <p>You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: '10px 20px',
              background: '#4b2e2e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                background: 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>Order #{order._id.slice(-8)}</h4>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    background: order.status === 'Pending' ? '#fff3cd' : '#d1ecf1',
                    color: order.status === 'Pending' ? '#856404' : '#0c5460'
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> Rs {order.totalAmount?.toFixed(2)}</p>
                <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
              </div>

              {order.shippingAddress && (
                <div style={{ marginBottom: '15px' }}>
                  <h5>Shipping Address:</h5>
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              )}

              <div>
                <h5>Items:</h5>
                {(order.products || []).map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity} × Rs {item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;