// // Updated AdminDashboard.js - Header removed
// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css';
// import { getFromLocalStorage } from '../../utils/storage';

// const AdminDashboard = () => {
//     const [stats, setStats] = useState({
//         totalProducts: 0,
//         totalCategories: 0,
//         totalUsers: 0,
//         totalOrders: 0,
//         lowStockItems: 0
//     });

//     useEffect(() => {
//         const products = getFromLocalStorage('products', []);
//         const categories = getFromLocalStorage('categories', []);
//         const users = getFromLocalStorage('users', []);
//         const orders = getFromLocalStorage('orders', []);

//         const lowStockItems = products.filter(product => 
//             product.stock <= (product.lowStockThreshold || 5)
//         ).length;

//         setStats({
//             totalProducts: products.length,
//             totalCategories: categories.length,
//             totalUsers: users.length,
//             totalOrders: orders.length,
//             lowStockItems: lowStockItems
//         });
//     }, []);

//     return (
//         <div className="admin-dashboard">
//             {/* Header removed */}
//             <h1>Dashboard</h1>
//             <div className="stats-grid">

//                 <div className="stat-card">
//                     <div className="stat-icon">
//                         <i className="fas fa-box"></i>
//                     </div>
//                     <div className="stat-info">
//                         <h3>{stats.totalProducts}</h3>
//                         <p>Total Products</p>
//                     </div>
//                 </div>

//                 <div className="stat-card">
//                     <div className="stat-icon">
//                         <i className="fas fa-tags"></i>
//                     </div>
//                     <div className="stat-info">
//                         <h3>{stats.totalCategories}</h3>
//                         <p>Total Categories</p>
//                     </div>
//                 </div>

//                 <div className="stat-card">
//                     <div className="stat-icon">
//                         <i className="fas fa-users"></i>
//                     </div>
//                     <div className="stat-info">
//                         <h3>{stats.totalUsers}</h3>
//                         <p>Total Users</p>
//                     </div>
//                 </div>

//                 <div className="stat-card">
//                     <div className="stat-icon">
//                         <i className="fas fa-shopping-cart"></i>
//                     </div>
//                     <div className="stat-info">
//                         <h3>{stats.totalOrders}</h3>
//                         <p>Total Orders</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import API from './api/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalOrders: 0,
        lowStockItems: 0,
        totalRevenue: 0,
        pendingOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all data in parallel
            const [productsRes, categoriesRes, usersRes, ordersRes] = await Promise.all([
                API.get('/products'),
                API.get('/categories'),
                API.get('/users'),
                API.get('/orders')
            ]);

            const products = productsRes.data;
            const categories = categoriesRes.data;
            const users = usersRes.data;
            const orders = ordersRes.data;

            // Calculate statistics
            const lowStockItems = products.filter(product =>
                product.stock <= (product.lowStockThreshold || 5)
            );

            const totalRevenue = orders
                .filter(order => order.status === 'delivered')
                .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

            const pendingOrders = orders.filter(order =>
                order.status === 'pending' || order.status === 'processing'
            ).length;

            // Get recent orders (last 5)
            const recentOrdersData = orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);

            setStats({
                totalProducts: products.length,
                totalCategories: categories.length,
                totalUsers: users.length,
                totalOrders: orders.length,
                lowStockItems: lowStockItems.length,
                totalRevenue,
                pendingOrders
            });

            setRecentOrders(recentOrdersData);
            setLowStockProducts(lowStockItems.slice(0, 5));

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        removeFromLocalStorage('admin');
        localStorage.removeItem('adminAuthenticated');
        navigate('/admin/login');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard">
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>{error}</p>
                    <button onClick={fetchDashboardData} className="retry-btn">
                        <i className="fas fa-redo"></i> Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    <i className="fas fa-tachometer-alt"></i>
                    Admin Dashboard
                </h1>
                <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Statistics Grid */}
            <div className="stats-grid">
                <div className="stat-card products">
                    <div className="stat-icon">
                        <i className="fas fa-box"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                        <span className="stat-change positive">
                            <i className="fas fa-arrow-up"></i> Active
                        </span>
                    </div>
                </div>

                <div className="stat-card categories">
                    <div className="stat-icon">
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalCategories}</h3>
                        <p>Categories</p>
                        <span className="stat-change positive">
                            <i className="fas fa-arrow-up"></i> Organized
                        </span>
                    </div>
                </div>

                <div className="stat-card users">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalUsers}</h3>
                        <p>Registered Users</p>
                        <span className="stat-change positive">
                            <i className="fas fa-user-plus"></i> Growing
                        </span>
                    </div>
                </div>

                <div className="stat-card orders">
                    <div className="stat-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                        <span className="stat-change positive">
                            <i className="fas fa-chart-line"></i> Trending
                        </span>
                    </div>
                </div>

                <div className="stat-card revenue">
                    <div className="stat-icon">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{formatCurrency(stats.totalRevenue)}</h3>
                        <p>Total Revenue</p>
                        <span className="stat-change positive">
                            <i className="fas fa-arrow-up"></i> +12%
                        </span>
                    </div>
                </div>

                <div className="stat-card low-stock">
                    <div className="stat-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.lowStockItems}</h3>
                        <p>Low Stock Items</p>
                        <span className="stat-change warning">
                            <i className="fas fa-exclamation"></i> Attention
                        </span>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.pendingOrders}</h3>
                        <p>Pending Orders</p>
                        <span className="stat-change info">
                            <i className="fas fa-info-circle"></i> Processing
                        </span>
                    </div>
                </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="dashboard-content">
                {/* Recent Orders */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-history"></i>
                            Recent Orders
                        </h2>
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/admin/orders')}
                        >
                            View All
                        </button>
                    </div>
                    <div className="orders-list">
                        {recentOrders.length > 0 ? (
                            recentOrders.map(order => (
                                <div key={order._id} className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#{order._id.slice(-8)}</span>
                                        <span className="order-customer">{order.customerName || 'N/A'}</span>
                                    </div>
                                    <div className="order-details">
                                        <span className="order-amount">{formatCurrency(order.totalAmount || 0)}</span>
                                        <span className={`order-status ${order.status}`}>
                                            {order.status}
                                        </span>
                                        <span className="order-date">{formatDate(order.createdAt)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-shopping-cart"></i>
                                <p>No orders yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-exclamation-triangle"></i>
                            Low Stock Alert
                        </h2>
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/admin/products')}
                        >
                            Manage Stock
                        </button>
                    </div>
                    <div className="stock-list">
                        {lowStockProducts.length > 0 ? (
                            lowStockProducts.map(product => (
                                <div key={product._id} className="stock-item">
                                    <div className="product-info">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-category">{product.category?.name || 'N/A'}</span>
                                    </div>
                                    <div className="stock-info">
                                        <span className="stock-count">{product.stock} left</span>
                                        <span className="stock-threshold">Min: {product.lowStockThreshold || 5}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-check-circle"></i>
                                <p>All products are well stocked!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button
                        className="action-btn primary"
                        onClick={() => navigate('/admin/products')}
                    >
                        <i className="fas fa-plus"></i>
                        Add Product
                    </button>
                    <button
                        className="action-btn secondary"
                        onClick={() => navigate('/admin/categories')}
                    >
                        <i className="fas fa-tags"></i>
                        Manage Categories
                    </button>
                    <button
                        className="action-btn info"
                        onClick={() => navigate('/admin/orders')}
                    >
                        <i className="fas fa-list"></i>
                        View Orders
                    </button>
                    <button
                        className="action-btn warning"
                        onClick={() => navigate('/admin/users')}
                    >
                        <i className="fas fa-users"></i>
                        Manage Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;