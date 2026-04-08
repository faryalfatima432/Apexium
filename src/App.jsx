
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import { useUser } from "./context/UserContext";
import ScrollToTop from "./components/ScrollToTop";

// Admin
import Admin from "./components/admin/Admin";
import AdminLogin from "./components/admin/AdminLogin";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const getStoredAdmin = () => {
    return (
      JSON.parse(localStorage.getItem("admin")) ||
      JSON.parse(sessionStorage.getItem("admin"))
    );
  };

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    const admin = getStoredAdmin();
    return !!admin?.isAdmin;
  });

  // Detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const admin = getStoredAdmin();
    if (admin?.isAdmin) setIsAdminAuthenticated(true);
  }, []);

  const adminLogin = () => setIsAdminAuthenticated(true);

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("admin");
    sessionStorage.removeItem("admin");
  };

  // Protected Admin Route
  const AdminProtected = ({ children }) => {
    return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
  };

  return (
    <div>
      {/* Navbar only for frontend */}
      {!isAdminRoute && <Navbar />}

        <ScrollToTop />
      <Routes>
        {/* ---------------- FRONTEND ---------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
         element={
         <ProtectedRoute>
         <Checkout />
        </ProtectedRoute>
         }
         
         />
        <Route path="/account" element={
          <ProtectedRoute>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
              <h2>My Account</h2>
              {user && (
                <div style={{ marginBottom: '30px' }}>
                  <h4>Welcome, {user.name}!</h4>
                  <p>Email: {user.email}</p>
                </div>
              )}
              <div>
                <h4>My Orders</h4>
                <p>Order history will be displayed here.</p>
                <button onClick={() => navigate('/my-orders')} style={{ padding: '10px 20px', background: '#4b2e2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  View My Orders
                </button>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={<h2>Notifications</h2>} />
        <Route path="/privacy" element={<h2>Privacy Policy</h2>} />
        <Route path="/terms" element={<h2>Terms & Conditions</h2>} />

        {/* ---------------- ADMIN ---------------- */}
        <Route
          path="/admin/login"
          element={
            isAdminAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <AdminLogin onLogin={adminLogin} />
            )
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminProtected>
              <Admin onLogout={adminLogout} />
            </AdminProtected>
          }
        />
        <Route path="/order-success/:id" element={<OrderSuccess />} />

        {/* ---------------- DEFAULT ---------------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}