import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import "./NAvbar.css";

import {
  FaHome,
  FaShoppingCart,
  FaUserCircle,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaBoxOpen,
  FaSearch
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { logout, isAuthenticated } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <div className="navbar-wrapper">
        {/* ✅ MOBILE TOP SEARCH (DARAZ STYLE) */}
        <div className="mobile-search-top">
          <form onSubmit={handleSearch}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <nav className="navbar-main">

        {/* LOGO */}
        <h2 className="nav_logo" onClick={() => navigate("/")}>
          Apexium
        </h2>

        {/* DESKTOP SEARCH */}
        <form className="nav-search" onSubmit={handleSearch}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          <div className="desktop-icons">

            <div onClick={() => navigate("/")}>
              <FaHome />
              <span>Home</span>
            </div>

            <div onClick={() => navigate("/cart")} className="cart">
              <FaShoppingCart />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
              <span>Cart</span>
            </div>

            <div onClick={() => navigate("/contact")}>
              <FaEnvelope />
              <span>Contact</span>
            </div>

            <div onClick={() => navigate("/about")}>
              <FaInfoCircle />
              <span>About</span>
            </div>

            {/* USER */}
            <div className="user-dropdown" ref={dropdownRef}>
              <FaUserCircle onClick={() => setDropdownOpen(!dropdownOpen)} />
                
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {isAuthenticated() ? (
                    <>
                      <div onClick={() => navigate("/account")}>
                        <FaUserCircle /> 
                        <span>My Account</span>
                      </div>
                      <div onClick={() => navigate("/my-orders")}>
                        <FaBoxOpen />
                        <span>My Orders</span>
                      </div>
                      <div className="d-flex" onClick={logout}>
                        <FaSignOutAlt /> 
                        <span>Logout</span>
                      </div>
                    </>
                  ) : (
                    <div onClick={() => navigate("/login")}>
                      <FaSignInAlt />
                      <span>Login</span>
                    </div>
                  )}
                </div>
              )}
              <span>Accounts</span>
            </div>

          </div>

          <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
        </div>
      </nav>
      </div>

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className=" w-100 justify-content-between d-flex align-items-center">
          <span>Menu</span>
          <span 
         onClick={() => setMenuOpen(false)} >×</span>
        </div>


        <div onClick={() => { navigate("/"); setMenuOpen(false); }}>
          <FaHome /> Home
        </div>

        <div onClick={() => { navigate("/cart"); setMenuOpen(false); }}>
          <FaShoppingCart /> Cart
        </div>

        <div onClick={() => { navigate("/contact"); setMenuOpen(false); }}>
          <FaEnvelope /> Contact
        </div>

        <div onClick={() => { navigate("/about"); setMenuOpen(false); }}>
          <FaInfoCircle /> About
        </div>

        {isAuthenticated() ? (
          <>
            <div  onClick={() => { navigate("/account"); setMenuOpen(false); }}>
              <FaUserCircle /> My Account
            </div>

            <div onClick={() => { navigate("/my-orders"); setMenuOpen(false); }}>
              <FaBoxOpen /> My Orders
            </div>

            <div onClick={() => { logout(); setMenuOpen(false); }}>
              <FaSignOutAlt /> Logout
            </div>
          </>
        ) : (
          <div onClick={() => { navigate("/login"); setMenuOpen(false); }}>
            <FaSignInAlt /> Login
          </div>
        )}
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;