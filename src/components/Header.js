// Header.js - Updated with mobile search icon
import React, { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Form, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Header = ({ toggleSearch, toggleCart, cartItems, isLoggedIn, userLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleMenuToggle = () => setShowMenu(!showMenu);
  const handleMenuClose = () => setShowMenu(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      navigate('/search', { state: { searchTerm, results: searchResults } });
      setShowSearchResults(false);
      setSearchTerm('');
      setShowMobileSearch(false);
    }
  };

  const handleProductClick = (productId) => {
    setShowSearchResults(false);
    setSearchTerm('');
    setShowMobileSearch(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length > 2 && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow for clicking on results
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const handleMyAccount = () => {
    handleMenuClose();
    navigate('/my-account');
  };

  const handleNotifications = () => {
    handleMenuClose();
    navigate('/notifications');
  };

  const handlePrivacyPolicy = () => {
    handleMenuClose();
    navigate('/privacy-policy');
  };

  const handleTermsAndConditions = () => {
    handleMenuClose();
    navigate('/terms');
  };

  const handleLogout = () => {
    handleMenuClose();
    userLogout();
    navigate('/');
  };

  return (
    <>
      <Navbar bg="white" sticky="top" className="custom-navbar">
        <Container fluid className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <Navbar.Brand as={Link} to="/" className="brand-logo">
              <span className="logo-text">Shopping By Apexium</span>
            </Navbar.Brand>
          </div>

          {/* Search Box - Functional search for Desktop */}
          <div className="search-box-container d-none d-md-flex">
            <Form onSubmit={handleSearchSubmit} className="w-100 position-relative">
              <div className="search-box">
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="search-input"
                />
                <button type="submit" className="search-icon-btn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <ListGroup>
                    {searchResults.map(product => (
                      <ListGroup.Item 
                        key={product.id}
                        action 
                        onClick={() => handleProductClick(product.id)}
                        className="search-result-item"
                      >
                        <div className="d-flex align-items-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                          />
                          <div>
                            <div className="fw-medium">{product.name}</div>
                            <small className="text-muted">Rs. {product.price}</small>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </Form>
          </div>

          {/* Header Icons */}
          <div className="header-icons-container">
            {/* Home Icon - Always visible */}
            <Link to="/" className="icon-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
              </svg>
              <span className="icon-label">Home</span>
            </Link>

            {/* Search Icon - Mobile only */}
            <button className="icon-btn search-icon-mobile d-md-none" onClick={handleMobileSearchToggle}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <span className="icon-label">Search</span>
            </button>
            
            {/* Cart Icon */}
            <button className="icon-btn cart-icon" onClick={toggleCart}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              <span className="icon-label">Cart</span>
            </button>

            {/* Menu Button - Always visible */}
            <button className="icon-btn menu-btn" onClick={handleMenuToggle}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <span className="icon-label">Menu</span>
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Search Bar - Shows when search icon is clicked */}
      {showMobileSearch && (
        <div className="mobile-search-container d-md-none">
          <div className="mobile-search-wrapper">
            <Form onSubmit={handleSearchSubmit} className="w-100 position-relative">
              <div className="mobile-search-box">
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="mobile-search-input"
                  autoFocus
                />
                <button type="submit" className="mobile-search-icon-btn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
                <button 
                  type="button" 
                  className="mobile-search-close-btn"
                  onClick={handleMobileSearchToggle}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                </button>
              </div>

              {/* Mobile Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mobile-search-results-dropdown">
                  <ListGroup>
                    {searchResults.map(product => (
                      <ListGroup.Item 
                        key={product.id}
                        action 
                        onClick={() => handleProductClick(product.id)}
                        className="search-result-item"
                      >
                        <div className="d-flex align-items-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                          />
                          <div>
                            <div className="fw-medium">{product.name}</div>
                            <small className="text-muted">Rs. {product.price}</small>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}

      {/* Sidebar Menu */}
      <Offcanvas show={showMenu} onHide={handleMenuClose} placement="end" className="menu-sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <Nav.Link onClick={handleMyAccount} className="menu-item">
              <i className="fas fa-user me-2"></i>My Account
            </Nav.Link>
            <Nav.Link onClick={handleNotifications} className="menu-item">
              <i className="fas fa-bell me-2"></i>Notifications
            </Nav.Link>
            <Nav.Link onClick={handlePrivacyPolicy} className="menu-item">
              <i className="fas fa-shield-alt me-2"></i>Privacy Policy
            </Nav.Link>
            <Nav.Link onClick={handleTermsAndConditions} className="menu-item">
              <i className="fas fa-file-contract me-2"></i>Terms & Conditions
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout} className="menu-item logout-item">
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <style>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }

        .custom-navbar {
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 0.5rem 0;
          min-height: 60px;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          flex-wrap: nowrap;
          gap: 1rem;
        }

        /* Logo Section */
        .logo-section {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 700;
        }

        .logo-text {
          color: var(--primary-color);
          font-weight: 700;
          font-size: 1.3rem;
          white-space: nowrap;
        }

        /* Search Box for Desktop/Tablet */
        .search-box-container {
          flex: 1;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .search-input {
          width: 100%;
          padding: 0.6rem 2.5rem 0.6rem 1rem;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 1rem;
          background-color: #f8f9fa;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          background-color: white;
          box-shadow: 0 0 0 0.2rem rgba(73, 174, 162, 0.25);
        }

        .search-icon-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6c757d;
          padding: 0;
          cursor: pointer;
          z-index: 2;
        }

        .search-icon-btn:hover {
          color: var(--primary-color);
        }

        /* Search Results Dropdown */
        .search-results-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          background: white;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 1050;
          max-height: 400px;
          overflow-y: auto;
        }

        /* Mobile Search Container */
        .mobile-search-container {
          background-color: white;
          border-bottom: 1px solid #e9ecef;
          padding: 0.75rem 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .mobile-search-wrapper {
          position: relative;
        }

        .mobile-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .mobile-search-input {
          width: 100%;
          padding: 0.75rem 3rem 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 1rem;
          background-color: #f8f9fa;
          transition: all 0.3s;
        }

        .mobile-search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          background-color: white;
          box-shadow: 0 0 0 0.2rem rgba(73, 174, 162, 0.25);
        }

        .mobile-search-icon-btn {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6c757d;
          padding: 0;
          cursor: pointer;
          z-index: 2;
        }

        .mobile-search-close-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6c757d;
          padding: 0;
          cursor: pointer;
          z-index: 2;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .mobile-search-close-btn:hover {
          background-color: #f8f9fa;
          color: #495057;
        }

        .mobile-search-results-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 1050;
          max-height: 300px;
          overflow-y: auto;
          margin-top: 5px;
        }

        .search-result-item {
          border: none;
          border-bottom: 1px solid #f0f0f0;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .search-result-item:hover {
          background-color: rgba(73, 174, 162, 0.1);
          border-color: var(--primary-color);
        }

        /* Header Icons */
        .header-icons-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .icon-link, .icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          color: #495057;
          text-decoration: none;
          font-size: 0.75rem;
          transition: all 0.3s;
          padding: 0.5rem;
          border-radius: 4px;
          min-width: 50px;
          min-height: 50px;
          justify-content: center;
        }

        .icon-link:hover, .icon-btn:hover {
          color: var(--primary-color);
          background-color: #f8f9fa;
        }

        .icon-label {
          margin-top: 0.25rem;
          font-size: 0.7rem;
        }

        .cart-icon {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }

        /* Menu Sidebar */
        .menu-sidebar {
          width: 280px;
        }

        .menu-item {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .menu-item:hover {
          background-color: rgba(73, 174, 162, 0.1);
          color: var(--primary-color);
        }

        .logout-item {
          color: #dc3545 !important;
        }

        .logout-item:hover {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545 !important;
        }

        /* Responsive Styles */
        
        /* Tablet (768px - 991px) */
        @media (max-width: 991.98px) {
          .header-container {
            padding: 0 0.75rem;
            gap: 0.75rem;
          }
          
          .search-box-container {
            max-width: 400px;
          }
          
          .logo-text {
            font-size: 1.2rem;
          }
          
          .header-icons-container {
            gap: 0.75rem;
          }
        }

        /* Mobile (576px - 767px) */
        @media (max-width: 767.98px) {
          .custom-navbar {
            padding: 0.4rem 0;
            min-height: 56px;
          }
          
          .header-container {
            padding: 0 0.5rem;
            gap: 0.5rem;
          }
          
          .logo-text {
            font-size: 1.1rem;
          }
          
          .header-icons-container {
            gap: 0.5rem;
          }
          
          .icon-link, .icon-btn {
            padding: 0.4rem;
            min-width: 44px;
            min-height: 44px;
          }
          
          .cart-badge {
            width: 16px;
            height: 16px;
            font-size: 0.6rem;
            top: 3px;
            right: 3px;
          }

          .mobile-search-container {
            padding: 0.5rem;
          }

          .mobile-search-input {
            padding: 0.6rem 2.8rem 0.6rem 0.8rem;
            font-size: 0.9rem;
          }

          .mobile-search-icon-btn {
            right: 35px;
          }

          .mobile-search-close-btn {
            right: 8px;
          }
        }

        /* Small Mobile (480px and below) */
        @media (max-width: 480px) {
          .logo-text {
            font-size: 1rem;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .header-container {
            padding: 0 0.4rem;
            gap: 0.4rem;
          }
          
          .header-icons-container {
            gap: 0.3rem;
          }
          
          .icon-link, .icon-btn {
            padding: 0.3rem;
            min-width: 40px;
            min-height: 40px;
          }
          
          .icon-label {
            font-size: 0.65rem;
          }
        }

        /* Extra Small Mobile (360px and below) */
        @media (max-width: 360px) {
          .logo-text {
            font-size: 0.9rem;
            max-width: 120px;
          }
          
          .header-container {
            padding: 0 0.3rem;
          }
          
          .header-icons-container {
            gap: 0.2rem;
          }
          
          .icon-link, .icon-btn {
            padding: 0.25rem;
            min-width: 36px;
            min-height: 36px;
          }
          
          .icon-label {
            font-size: 0.6rem;
          }
          
          .menu-sidebar {
            width: 100%;
          }
        }

        /* Large Desktop (1200px and above) */
        @media (min-width: 1200px) {
          .logo-text {
            font-size: 1.4rem;
          }
          
          .search-box-container {
            max-width: 700px;
          }
          
          .header-icons-container {
            gap: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;