// Updated AdminDashboard.js - Header removed
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { getFromLocalStorage } from '../../utils/storage';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalOrders: 0,
        lowStockItems: 0
    });

    useEffect(() => {
        const products = getFromLocalStorage('products', []);
        const categories = getFromLocalStorage('categories', []);
        const users = getFromLocalStorage('users', []);
        const orders = getFromLocalStorage('orders', []);

        const lowStockItems = products.filter(product => 
            product.stock <= (product.lowStockThreshold || 5)
        ).length;

        setStats({
            totalProducts: products.length,
            totalCategories: categories.length,
            totalUsers: users.length,
            totalOrders: orders.length,
            lowStockItems: lowStockItems
        });
    }, []);

    return (
        <div className="admin-dashboard">
            {/* Header removed */}
            <h1>Dashboard</h1>
            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-box"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalCategories}</h3>
                        <p>Total Categories</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;