// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";

// import ProductDetails from "./pages/ProductDetails";

// // Admin
// import Admin from "./components/admin/Admin";
// import AdminLogin from "./components/admin/AdminLogin";

// export default function App() {
//   const location = useLocation();

//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   // ✅ Detect admin route
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   useEffect(() => {
//     const admin = localStorage.getItem("admin");
//     if (admin) setIsAdminAuthenticated(true);
//   }, []);

//   const adminLogin = () => setIsAdminAuthenticated(true);

//   const adminLogout = () => {
//     setIsAdminAuthenticated(false);
//     localStorage.removeItem("admin");
//   };

//   // ✅ Protected Admin Route
//   const AdminProtected = ({ children }) => {
//     return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
//   };

//   return (
//     <div>
//       {/* ✅ Navbar only for frontend */}
//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         {/* ---------------- FRONTEND ---------------- */}
//         <Route path="/" element={<Home />} />
     

//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/account" element={<h2>My Account</h2>} />
//         <Route path="/notifications" element={<h2>Notifications</h2>} />
//         <Route path="/privacy" element={<h2>Privacy Policy</h2>} />
//         <Route path="/terms" element={<h2>Terms & Conditions</h2>} />

//         {/* ---------------- ADMIN ---------------- */}
//         <Route
//           path="/admin/login"
//           element={
//             isAdminAuthenticated ? (
//               <Navigate to="/admin" />
//             ) : (
//               <AdminLogin onLogin={adminLogin} />
//             )
//           }
//         />

//         <Route
//           path="/admin/*"
//           element={
//             <AdminProtected>
//               <Admin onLogout={adminLogout} />
//             </AdminProtected>
//           }
//         />

//         {/* ---------------- DEFAULT ---------------- */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

// Admin
import Admin from "./components/admin/Admin";
import AdminLogin from "./components/admin/AdminLogin";

export default function App() {
  const location = useLocation();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) setIsAdminAuthenticated(true);
  }, []);

  const adminLogin = () => setIsAdminAuthenticated(true);

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("admin");
  };

  // Protected Admin Route
  const AdminProtected = ({ children }) => {
    return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
  };

  return (
    <div>
      {/* Navbar only for frontend */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ---------------- FRONTEND ---------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<h2>My Account</h2>} />
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

        {/* ---------------- DEFAULT ---------------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}