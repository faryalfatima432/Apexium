// CartPanel.js - Updated with authentication check
import React, { useContext } from 'react';
import { Offcanvas, Button, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

const CartPanel = ({ show, handleClose, cartItems, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    handleClose();
    
    // Check if user is logged in
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      // Redirect to login page with return URL
      navigate('/my-account', { state: { from: '/checkout' } });
    }
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="end" 
      className="cart-panel"
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="d-flex align-items-center">
          <i className="fas fa-shopping-cart me-2"></i>
          Shopping Cart
          {cartItems.length > 0 && (
            <Badge bg="primary" className="ms-2">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0 d-flex flex-column">
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center d-flex flex-column align-items-center justify-content-center flex-grow-1">
            <div className="empty-cart-icon mb-3">
              <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
            </div>
            <p className="empty-cart-text text-muted mb-4">Your cart is empty</p>
            <Button variant="primary" onClick={handleClose} className="px-4">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items-container flex-grow-1" style={{ overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="cart-item border-bottom p-3">
                    <Row className="align-items-center">
                      <Col xs={3} className="pe-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="cart-item-image img-fluid rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col xs={9} className="cart-item-details">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <div className="cart-item-title fw-medium" style={{ fontSize: '0.9rem' }}>
                            {item.name}
                          </div>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-danger p-0"
                            onClick={() => removeFromCart(item.id)}
                            style={{ minWidth: 'auto' }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </div>
                        
                        <div className="cart-item-price text-primary fw-medium mb-2">
                          RS {item.price.toLocaleString('en-IN')}
                        </div>
                        
                        <div className="quantity-controls d-flex align-items-center">
                          <Button 
                            size="sm" 
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-btn d-flex align-items-center justify-content-center"
                            style={{ width: '30px', height: '30px' }}
                          >
                            -
                          </Button>
                          <span className="quantity-display mx-2 fw-medium" style={{ minWidth: '20px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-btn d-flex align-items-center justify-content-center"
                            style={{ width: '30px', height: '30px' }}
                          >
                            +
                          </Button>
                          
                          <div className="ms-auto fw-medium">
                            RS {(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            
            <div className="cart-footer border-top p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h5 className="mb-0 cart-total text-primary">
                  RS {total.toLocaleString('en-IN')}
                </h5>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  onClick={handleCheckout}
                  className="checkout-btn"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outline-primary" 
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>

      {/* Responsive Styles */}
      <style jsx>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }
        
        /* Default styles for desktop/tablet */
        .cart-panel {
          width: 400px;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .btn-primary:hover {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
        }
        
        .btn-outline-primary {
          color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .btn-outline-primary:hover {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .text-primary {
          color: var(--primary-color) !important;
        }
        
        .badge.bg-primary {
          background-color: var(--primary-color) !important;
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .cart-panel {
            width: 85% !important;
            max-width: 85%;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
            margin-top: 10vh;
            height: 80vh;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          }
          
          .offcanvas-backdrop.show {
            opacity: 0.5;
          }
          
          .cart-item-image {
            width: 50px !important;
            height: 50px !important;
          }
          
          .cart-item-title {
            font-size: 0.85rem !important;
          }
          
          .quantity-btn {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.8rem;
          }
          
          .quantity-display {
            font-size: 0.9rem;
          }
          
          .cart-items-container {
            max-height: 60vh;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 480px) {
          .cart-panel {
            width: 90% !important;
            max-width: 90%;
          }
          
          .cart-item {
            padding: 12px !important;
          }
          
          .cart-item-image {
            width: 45px !important;
            height: 45px !important;
          }
        }
        
        /* Tablet styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .cart-panel {
            width: 350px;
          }
        }
        
        .cart-items-container {
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }
        
        .cart-items-container::-webkit-scrollbar {
          width: 4px;
        }
        
        .cart-items-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .cart-items-container::-webkit-scrollbar-thumb {
          background: var(--primary-color);
          border-radius: 2px;
        }
        
        .cart-items-container::-webkit-scrollbar-thumb:hover {
          background: var(--primary-dark);
        }
        
        .quantity-btn {
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .empty-cart {
          padding: 2rem 1rem;
        }
        
        .cart-item:hover {
          background-color: #f8f9fa;
        }
        
        /* Smooth animations */
        .cart-panel {
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </Offcanvas>
  );
};

export default CartPanel;