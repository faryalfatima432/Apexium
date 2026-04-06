import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import StockManagement from "./StockManagement";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import ProtectedRoute from "./ProtectedRoute";

const Admin = () => {
  const admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));

  return (
    <Routes>
      {/* 🔓 LOGIN ROUTE */}
      <Route path="login" element={<AdminLogin />} />

      {/* 🔒 PROTECTED ROUTES */}
      <Route
        path="/"
        element={admin ? <AdminLayout /> : <Navigate to="login" replace />}
      >
        {/* <Route index element={<AdminDashboard />} /> */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="stock" element={<StockManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      {/* ❌ UNKNOWN ROUTE */}
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};

export default Admin;