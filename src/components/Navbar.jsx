import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart} from "../context/CartContext";
import { useUser } from "../context/UserContext";
import "./NAvbar.css";
import {
  FaBars,
  FaHome,
  FaShoppingCart,
  FaUserCircle,
  FaBell,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useUser();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar custom-navbar px-3">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT: LOGO */}
          <div 
            className="logo " 
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            🛍️ Apexium
          </div>

          {/* CENTER: SEARCH */}
          <form className="search-container d-none d-md-block" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* RIGHT: ICONS */}
          <div className="nav-icons">

            <div 
              className="icon-item" 
              onClick={() => navigate("/")}
              title="Home"
            >
              <FaHome />
              <span>Home</span>
            </div>

            {/* <div 
              className="icon-item" 
              onClick={() => navigate("/cart")}
              title="Shopping Cart"
            >
              {totalItems > 0 && <span>{totalItems}</span>}
              <FaShoppingCart /> 
              <span>Cart</span>
            </div> */}

            <div 
  className="icon-item cart-icon" 
  onClick={() => navigate("/cart")}
  title="Shopping Cart"
>
  <div className="cart-wrapper">
    <FaShoppingCart />

    {/* ✅ Badge */}
    {totalItems > 0 && (
      <span className="cart-badge">
        {totalItems}
      </span>
    )}
  </div>

  <span>Cart</span>
</div>

            <div 
              className="icon-item"
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <FaBell />
              <span>Notify</span>
            </div>

            {/* Account Section - Dynamic based on auth */}
            {isAuthenticated() ? (
              <div className="icon-item user-menu">
                <div className="user-info">
                  <FaUserCircle />
                  <span>{user?.name || 'Account'}</span>
                </div>
                <div className="user-dropdown">
                  <div onClick={() => navigate("/account")}>My Account</div>
                  <div onClick={() => navigate("/my-orders")}>My Orders</div>
                  <div onClick={handleLogout}>Logout</div>
                </div>
              </div>
            ) : (
              <div 
                className="icon-item"
                onClick={() => navigate("/login")}
                title="Login"
              >
                <FaSignInAlt />
                <span>Login</span>
              </div>
            )}

            <div 
              className="icon-item" 
              onClick={() => setMenuOpen(true)}
              title="Menu"
            >
              <FaBars />
              <span>Menu</span>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH */}
      <div className="mobile-search d-md-none">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h5>
            <FaBars /> Menu
          </h5>
          <span onClick={() => setMenuOpen(false)}>×</span>
        </div>

        <div className="menu-item" onClick={() => { navigate("/"); setMenuOpen(false); }}>
          <FaHome /> Home
        </div>

        <div className="menu-item" onClick={() => { navigate("/cart"); setMenuOpen(false); }}>
          <FaShoppingCart /> Shopping Cart
        </div>

        {isAuthenticated() ? (
          <>
            <div className="menu-item" onClick={() => { navigate("/account"); setMenuOpen(false); }}>
              <FaUserCircle /> My Account
            </div>
            <div className="menu-item" onClick={() => { navigate("/my-orders"); setMenuOpen(false); }}>
              📦 My Orders
            </div>
            <div className="menu-item" onClick={() => { handleLogout(); setMenuOpen(false); }}>
              <FaSignOutAlt /> Logout
            </div>
          </>
        ) : (
          <div className="menu-item" onClick={() => { navigate("/login"); setMenuOpen(false); }}>
            <FaSignInAlt /> Login
          </div>
        )}

        <div className="menu-item" onClick={() => { navigate("/notifications"); setMenuOpen(false); }}>
          <FaBell /> Notifications
        </div>

        <div className="menu-item" onClick={() => { navigate("/privacy"); setMenuOpen(false); }}>
          📋 Privacy Policy
        </div>

        <div className="menu-item" onClick={() => { navigate("/terms"); setMenuOpen(false); }}>
          📄 Terms & Conditions
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;