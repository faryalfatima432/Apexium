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

const backend_url =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Navbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { logout, isAuthenticated } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${backend_url}/api/products`),
          fetch(`${backend_url}/api/categories`)
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        setProducts(pData || []);
        setCategories(cData || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  if (!searchTerm || searchTerm.trim() === "") {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  const term = searchTerm.toLowerCase();

  // ✅ SAFE CATEGORY MATCH
  const categoryResults = (categories || []).filter((c) =>
    c?.name?.toLowerCase().includes(term)
  ).map((c) => ({
    _id: c._id,
    name: c.name,
    type: "category"
  }));

  // ✅ SAFE PRODUCT MATCH
  const productResults = (products || []).filter((p) =>
    p?.name?.toLowerCase().includes(term)
  ).map((p) => ({
    _id: p._id,
    name: p.name,
    type: "product"
  }));

  const finalResults = [...categoryResults, ...productResults];

  setSuggestions(finalResults);
  setShowSuggestions(true);

}, [searchTerm, products, categories]);

  // ✅ SUBMIT SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  // ✅ CLICK SUGGESTION (FIXED)
  // const handleSuggestionClick = (item) => {

  //   if (item.type === "category") {
  //     navigate(`/category/${item._id}`); // ✅ EXACT MATCH WITH YOUR PAGE
  //   } else {
  //     navigate(`/search?q=${item.name}`);
  //   }

  //   setSearchTerm("");
  //   setShowSuggestions(false);
  // };

  const handleSuggestionClick = (item) => {
  console.log("CLICKED:", item); // 👈 DEBUG

  if (item.type === "category") {
    navigate(`/category/${item._id}`);
  } else {
    navigate(`/search?q=${item.name}`);
  }

  setSearchTerm("");
  setShowSuggestions(false);
};

  return (
    <>
      <div className="navbar-wrapper">

        {/* MOBILE SEARCH */}
        <div className="mobile-search-top" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <FaSearch />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
            />
          </form>

          {/* {showSuggestions && (
            <div className="search-dropdown">
              {suggestions.length > 0 ? (
                suggestions.map((item, i) => (
                  <div key={i} onClick={() => handleSuggestionClick(item)}>
                    {item.name}
                    <small style={{ marginLeft: 8, color: "#888" }}>
                      {item.type === "category" ? "Category" : "Product"}
                    </small>
                  </div>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          )} */}
          {showSuggestions && (
  <div className="search-dropdown">
    {suggestions.length > 0 ? (
      suggestions.map((item, i) => (
        <div key={i} onClick={() => handleSuggestionClick(item)}>
          {item.name}
          <span style={{ color: "gray", marginLeft: 8 }}>
            ({item.type})
          </span>
        </div>
      ))
    ) : (
      <div>No results found</div>
    )}
  </div>
)}
        </div>

        <nav className="navbar-main">

          {/* LOGO */}
          <h2 className="nav_logo" onClick={() => navigate("/")}>
            Khattak <span>Jewellers</span>
          </h2>

          {/* DESKTOP SEARCH */}
          <div className="nav-search" ref={searchRef}>
            <form onSubmit={handleSearch} style={{ display: "flex", width: "100%" }}>
              <FaSearch />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
              />
            </form>

            {showSuggestions && (
              <div className="search-dropdown">
                {suggestions.map((item, i) => (
                  <div key={i} onClick={() => handleSuggestionClick(item)}>
                    {item.name}
                    <small style={{ marginLeft: 8, color: "#888" }}>
                      {item.type === "category" ? "Category" : "Product"}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>

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

              <div className="user-dropdown" ref={dropdownRef}>
                <FaUserCircle onClick={() => setDropdownOpen(!dropdownOpen)} />

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    {isAuthenticated() ? (
                      <>
                        <div onClick={() => navigate("/account")}>
                          <FaUserCircle /> My Account
                        </div>
                        <div onClick={() => navigate("/my-orders")}>
                          <FaBoxOpen /> My Orders
                        </div>
                        <div onClick={logout}>
                          <FaSignOutAlt /> Logout
                        </div>
                      </>
                    ) : (
                      <div onClick={() => navigate("/login")}>
                        <FaSignInAlt /> Login
                      </div>
                    )}
                  </div>
                )}
                <span>Account</span>
              </div>

            </div>

            <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
          </div>
        </nav>
      </div>

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <span onClick={() => setMenuOpen(false)}>×</span>

        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/cart")}>Cart</div>
        <div onClick={() => navigate("/contact")}>Contact</div>
        <div onClick={() => navigate("/about")}>About</div>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;