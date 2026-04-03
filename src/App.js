// App.js - Updated with Buy Now functionality
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import CartPanel from './components/CartPanel';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Privacy from './pages/Privacy';
import Admin from './components/admin/Admin';
import AdminLogin from './components/admin/AdminLogin';
import { generateSampleData } from './utils/sampleData';
import MyAccount from './pages/MyAccount';
import Notifications from './pages/Notifications';
import './App.css';
import Terms from './pages/Terms';

// Create Cart Context
export const CartContext = React.createContext();

function App() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    generateSampleData();
    
    // Check if admin is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
        setIsAdminAuthenticated(true);
    } else {
        setIsAdminAuthenticated(false);
        localStorage.removeItem('adminAuthenticated');
    }

    // Check if user is logged in
    const userLoginData = localStorage.getItem('userLoginData');
    if (userLoginData) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleCart = () => setShowCart(!showCart);
  const closeCart = () => setShowCart(false);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    if (!showCart) {
      toggleCart();
    }
  };

  // Buy Now function - sets item for immediate checkout
  const buyNow = (product, quantity = 1) => {
    setBuyNowItem({ ...product, quantity });
    
    // Check authentication and redirect accordingly
    if (isLoggedIn) {
      // User is logged in, redirect to checkout
      window.location.href = '/checkout';
    } else {
      // User not logged in, redirect to login with buy now intent
      window.location.href = '/my-account?buyNow=true';
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setBuyNowItem(null);
  };

  // User authentication functions
  const userLogin = () => {
    setIsLoggedIn(true);
    
    // If there's a buy now item and user just logged in, redirect to checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('buyNow') === 'true' && buyNowItem) {
      window.location.href = '/checkout';
    }
  };

  const userLogout = () => {
    setIsLoggedIn(false);
    setBuyNowItem(null);
    localStorage.removeItem('userLoginData');
  };

  // Admin authentication functions
  const adminLogin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminAuthenticated', 'true');
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  // Cart context value with all necessary functions
  const cartContextValue = {
    cartItems,
    addToCart,
    buyNow,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
    isLoggedIn,
    userLogin,
    userLogout,
    buyNowItem,
    setBuyNowItem
  };

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="App">
        {/* Conditionally render Header - don't show on admin routes */}
        {!isAdminRoute && (
         // In App.js - Update the Header component to pass toggleSearch
          <Header 
            toggleSearch={toggleSearch} 
            toggleCart={toggleCart} 
            cartItems={cartItems}
            isLoggedIn={isLoggedIn}
            userLogout={userLogout}
          />
        )}
        
        <SearchPanel show={showSearch} handleClose={toggleSearch} />
        <CartPanel 
          show={showCart} 
          handleClose={closeCart} 
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          isLoggedIn={isLoggedIn}
        />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/my-account" element={<MyAccount onLogin={userLogin} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/terms" element={<Terms />} />


            {/* Admin Routes with Authentication */}
            <Route 
              path="/admin/*" 
              element={
                isAdminAuthenticated ? (
                  <Admin onLogout={adminLogout} />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } 
            />
            
            {/* Admin Login Route */}
            <Route 
              path="/admin/login" 
              element={
                isAdminAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <AdminLogin onLogin={adminLogin} />
                )
              } 
            />
            
            {/* Catch-all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Conditionally render Footer - don't show on admin routes */}
        {!isAdminRoute && <Footer />}
      </div>
    </CartContext.Provider>
  );
}

// Wrap App with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}