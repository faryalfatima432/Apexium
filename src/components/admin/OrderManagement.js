// src/components/admin/OrderManagement.js
import React, { useState, useEffect } from 'react';
import './OrderManagement.css';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [products] = useState(getFromLocalStorage('products', []));

    useEffect(() => {
        const savedOrders = getFromLocalStorage('orders', []);
        setOrders(savedOrders);
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                // If order is being cancelled, restore stock
                if (newStatus === 'cancelled' && order.status !== 'cancelled') {
                    const products = getFromLocalStorage('products', []);
                    const updatedProducts = products.map(product => {
                        const orderItem = order.items.find(item => item.id === product.id);
                        if (orderItem) {
                            return {
                                ...product,
                                stock: product.stock + orderItem.quantity
                            };
                        }
                        return product;
                    });
                    saveToLocalStorage('products', updatedProducts);
                }
                
                // If order was cancelled and is now being reactivated, deduct stock
                if (order.status === 'cancelled' && newStatus !== 'cancelled') {
                    const products = getFromLocalStorage('products', []);
                    const updatedProducts = products.map(product => {
                        const orderItem = order.items.find(item => item.id === product.id);
                        if (orderItem && product.stock >= orderItem.quantity) {
                            return {
                                ...product,
                                stock: product.stock - orderItem.quantity
                            };
                        }
                        return product;
                    });
                    saveToLocalStorage('products', updatedProducts);
                }

                return { ...order, status: newStatus };
            }
            return order;
        });

        setOrders(updatedOrders);
        saveToLocalStorage('orders', updatedOrders);
    };

    const calculateOrderTotal = (items) => {
        return items.reduce((total, item) => total + (item.salePrice || item.price) * item.quantity, 0);
    };

    const stats = {
        total: orders.length,
        pending: orders.filter(order => order.status === 'pending').length,
        completed: orders.filter(order => order.status === 'completed').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length
    };

    return (
        <div className="order-management">
            <div className="management-header">
                <h1>Orders</h1>
            </div>

            <div className="orders-stats">
                <div className="stat-card">
                    <h3>{stats.total}</h3>
                    <p>Total Orders</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.pending}</h3>
                    <p>Pending</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.completed}</h3>
                    <p>Completed</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.cancelled}</h3>
                    <p>Cancelled</p>
                </div>
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
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id.toString().padStart(6, '0')}</td>
                                    <td>{order.customerName}</td>
                                    <td>
                                        <div className="order-items">
                                            {order.items.map(item => (
                                                <div key={item.id} className="order-item">
                                                    <span>{item.name}</span>
                                                    <span>Qty: {item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>Rs {calculateOrderTotal(order.items).toLocaleString()}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${order.status}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {order.status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="btn-status btn-complete"
                                                        onClick={() => updateOrderStatus(order.id, 'completed')}
                                                    >
                                                        Complete
                                                    </button>
                                                    <button 
                                                        className="btn-status btn-cancel"
                                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'completed' && (
                                                <button 
                                                    className="btn-status btn-cancel"
                                                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {order.status === 'cancelled' && (
                                                <button 
                                                    className="btn-status btn-complete"
                                                    onClick={() => updateOrderStatus(order.id, 'pending')}
                                                >
                                                    Reactivate
                                                </button>
                                            )}
                                        </div>
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