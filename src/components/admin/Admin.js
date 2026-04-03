// Updated Admin.js - Enhanced mobile responsiveness
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './Admin.css';
import AdminDashboard from './AdminDashboard';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import StockManagement from './StockManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const Admin = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get active tab from current route
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes('/products')) return 'products';
        if (path.includes('/categories')) return 'categories';
        if (path.includes('/stock')) return 'stock';
        if (path.includes('/orders')) return 'orders';
        if (path.includes('/users')) return 'users';
        return 'dashboard';
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            // Auto-close sidebar on mobile when resizing to desktop
            if (!mobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, [isSidebarOpen]);

    useEffect(() => {
        setActiveTab(getActiveTab());
    }, [location.pathname]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(`/admin/${tab === 'dashboard' ? '' : tab}`);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            onLogout();
        }
    };

    // Close sidebar when clicking on overlay
    const handleOverlayClick = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="admin-panel">
            {/* Mobile Menu Button */}
            {isMobile && (
                <button 
                    className="mobile-menu-btn" 
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            )}

            {/* Sidebar */}
            <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    
                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout}
                        className="logout-btn-top"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                    
                    {isMobile && (
                        <button className="close-sidebar" onClick={toggleSidebar} aria-label="Close menu">
                            ✕
                        </button>
                    )}
                </div>
                
                <nav className="sidebar-nav">
                    <button 
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => handleTabClick('dashboard')}
                        data-tab="dashboard"
                    >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </button>
                    
                    <button 
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => handleTabClick('products')}
                        data-tab="products"
                    >
                        <i className="fas fa-box"></i>
                        <span>Products</span>
                    </button>
                    
                    <button 
                        className={activeTab === 'categories' ? 'active' : ''}
                        onClick={() => handleTabClick('categories')}
                        data-tab="categories"
                    >
                        <i className="fas fa-tags"></i>
                        <span>Categories</span>
                    </button>
                    
                    <button 
                        className={activeTab === 'stock' ? 'active' : ''}
                        onClick={() => handleTabClick('stock')}
                        data-tab="stock"
                    >
                        <i className="fas fa-warehouse"></i>
                        <span>Stock</span>
                    </button>
                    
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => handleTabClick('orders')}
                        data-tab="orders"
                    >
                        <i className="fas fa-shopping-cart"></i>
                        <span>Orders</span>
                    </button>
                    
                    <button 
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => handleTabClick('users')}
                        data-tab="users"
                    >
                        <i className="fas fa-users"></i>
                        <span>Users</span>
                    </button>
                </nav>
            </div>
            
            {/* Overlay for mobile */}
            {isSidebarOpen && isMobile && (
                <div 
                    className="sidebar-overlay" 
                    onClick={handleOverlayClick}
                ></div>
            )}
            
            {/* Main Content */}
            <div className="admin-content">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="stock" element={<StockManagement />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;