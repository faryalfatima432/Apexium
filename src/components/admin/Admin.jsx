import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import StockManagement from "./StockManagement";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import ContactMessages from "./ContactMessages";
const Admin = ({ onLogout }) => {
  const admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));

  return (
    <Routes>
      <Route
        path="/"
        element={
          admin ? <AdminLayout onLogout={onLogout} /> : <Navigate to="/admin/login" replace />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="stock" element={<StockManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="contact-messages" element={<ContactMessages />} />
      </Route>

      {/* ❌ UNKNOWN ROUTE */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default Admin;