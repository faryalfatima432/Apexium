import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import API from "./api/api";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');

    if (token && admin) {
      try {
        const parsedAdmin = JSON.parse(admin);
        setAdminData(parsedAdmin);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        handleLogout();
      }
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setAdminData(null);
    navigate('/admin/login');
  };  
  //Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="admin-layout">
      {/* ===== TOPBAR ===== */}
      <header className="topbar w-100">
        <div className="left">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h2>Admin Panel</h2>
        </div>

        {/* RIGHT SIDE (PROFILE DROPDOWN) */}
        <div className="right" ref={dropdownRef}>
          <div
            className="profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <i className="fas fa-user-circle"></i>
            {adminData?.name || "Admin"}
          </div>

          {dropdownOpen && (
            <div className="dropdown">
              <p>{adminData?.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* <h3 className="logo">Admin</h3> */}

        <nav>
          <NavLink to="/admin/dashboard">
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products">
            <i className="fas fa-box"></i>
            Products
          </NavLink>
          <NavLink to="/admin/categories">
            <i className="fas fa-tags"></i>
            Categories
          </NavLink>
          <NavLink to="/admin/orders">
            <i className="fas fa-shopping-cart"></i>
            Orders
          </NavLink>
          <NavLink to="/admin/users">
            <i className="fas fa-users"></i>
            Users
          </NavLink>
        </nav>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* ===== CONTENT ===== */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
