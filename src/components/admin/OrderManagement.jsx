// src/components/admin/OrderManagement.jsx
import React, { useState, useEffect } from "react";
import API from "./api/api";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState(null);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      console.log("Orders response:", res.data);
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      console.error("Error response:", err.response?.data || err.message);
      setError(`Failed to load orders: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrder(orderId);
      await API.put(`/orders/${orderId}/status`, { status: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setError("");
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const calculateOrderTotal = (products) =>
    products.reduce((total, item) => total + item.price * item.quantity, 0);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  if (loading) {
    return (
      <div className="order-management">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-management">
      <div className="management-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-shopping-cart"></i>
            Order Management
          </h1>
          <p>Manage customer orders and track their status</p>
        </div>
        <button className="btn-primary" onClick={fetchOrders}>
          <i className="fas fa-sync-alt"></i>
          Refresh Orders
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-stats">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{value}</h3>
            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
          </div>
        ))}
      </div>

      <div className="orders-table">
        {orders.length === 0 ? (
          <p className="no-data">No orders found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total (Rs)</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-8).toUpperCase()}</td>
                  <td>
                    <div>
                      <div>{order.user?.name || "Unknown"}</div>
                      <small>{order.user?.email}</small>
                    </div>
                  </td>
                  <td>
                    <div className="order-items">
                      {order.products?.map((item, index) => (
                        <div key={index} className="order-item">
                          <span>{item.name}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      )) || <span>No items</span>}
                    </div>
                  </td>
                  <td>Rs {calculateOrderTotal(order.products || []).toLocaleString()}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                      {order.status || "Unknown"}
                    </span>
                  </td>
                  <td className="action-buttons">
                    {order.status === "Pending" && (
                      <>
                        <button
                          className="btn-status btn-processing"
                          onClick={() => updateOrderStatus(order._id, "Processing")}
                          disabled={updatingOrder === order._id}
                        >
                          {updatingOrder === order._id ? "..." : "Process"}
                        </button>
                        <button
                          className="btn-status btn-cancel"
                          onClick={() => updateOrderStatus(order._id, "Cancelled")}
                          disabled={updatingOrder === order._id}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "Processing" && (
                      <>
                        <button
                          className="btn-status btn-complete"
                          onClick={() => updateOrderStatus(order._id, "Shipped")}
                          disabled={updatingOrder === order._id}
                        >
                          Ship
                        </button>
                        <button
                          className="btn-status btn-cancel"
                          onClick={() => updateOrderStatus(order._id, "Cancelled")}
                          disabled={updatingOrder === order._id}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "Shipped" && (
                      <button
                        className="btn-status btn-complete"
                        onClick={() => updateOrderStatus(order._id, "Delivered")}
                        disabled={updatingOrder === order._id}
                      >
                        Deliver
                      </button>
                    )}
                    {(order.status === "Delivered" || order.status === "Cancelled") && (
                      <span className="status-text">{order.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;