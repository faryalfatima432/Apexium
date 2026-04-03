// ProductDetail.js - Updated with no boxes around quantity buttons
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { products } from '../data/products';
import { CartContext } from '../App';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart, isLoggedIn } = useContext(CartContext);

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/my-account', { state: { from: '/checkout' } });
    }
  };

  return (
    <Container className="product-detail-container py-4">
      {/* Toast Notification for Add to Cart */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#49aea2',
          color: 'white'
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>Product added to cart successfully!</Toast.Body>
      </Toast>

      <Row>
        {/* Image Column */}
        <Col md={6} lg={6} className="order-md-2 mb-4 mb-md-0">
          <div className="product-image-wrapper text-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-detail-image img-fluid rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </Col>
        
        {/* Product Info Column */}
        <Col md={6} lg={6} className="order-md-1">
          <div className="product-info-content">
            <h1 className="product-detail-title mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
              {product.name}
            </h1>
            
            <div className="price-section mb-3">
              <h2 className="product-detail-price mb-2" style={{ 
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                color: '#49aea2'
              }}>
                RS {product.price.toLocaleString('en-IN')}
              </h2>
              <p className="text-muted mb-0">Inclusive of all taxes</p>
            </div>
            
            <div className="description-section mb-4">
              <h5 className="mb-2" style={{ fontSize: '1.1rem', color: '#49aea2' }}>Description</h5>
              <p className="product-detail-description text-muted" style={{ lineHeight: '1.6' }}>
                {product.description}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="quantity-section mb-4">
              <h5 className="mb-3" style={{ fontSize: '1.1rem', color: '#49aea2' }}>Quantity</h5>
              <div className="d-flex align-items-center">
                <Button 
                  variant="link" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  style={{ 
                    width: '45px', 
                    height: '45px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#49aea2',
                    textDecoration: 'none'
                  }}
                >
                  −
                </Button>
                <span 
                  className="quantity-display mx-3"
                  style={{ 
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center',
                    color: '#49aea2'
                  }}
                >
                  {quantity}
                </span>
                <Button 
                  variant="link" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                  style={{ 
                    width: '45px', 
                    height: '45px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#49aea2',
                    textDecoration: 'none'
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="action-buttons-section">
              <div className="d-grid gap-2 d-md-flex">
                <Button 
                  variant="outline-primary" 
                  onClick={handleAddToCart} 
                  className="btn-add-to-cart flex-fill"
                  size="lg"
                  style={{ 
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    padding: '12px 20px',
                    backgroundColor: '#49aea2',
                    borderColor: '#49aea2',
                    color: 'white'
                  }}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="success" 
                  onClick={handleBuyNow}
                  className="btn-buy-now flex-fill"
                  size="lg"
                  style={{ 
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    padding: '12px 20px',
                    backgroundColor: '#49aea2',
                    borderColor: '#49aea2'
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
            
          
          </div>
        </Col>
      </Row>
      
      {/* Responsive CSS */}
      <style jsx>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
          --primary-light: #6abeb4;
        }
        
        @media (max-width: 768px) {
          .product-info-content {
            padding: 0 15px;
          }
          .action-buttons-section .d-md-flex {
            flex-direction: column;
          }
          .action-buttons-section .btn {
            margin-bottom: 10px;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .product-detail-image {
            max-height: 400px !important;
          }
        }
        
        .quantity-btn:hover {
          color: white !important;
          background-color: #49aea2 !important;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .product-detail-image {
          transition: transform 0.3s ease;
        }
        
        .product-detail-image:hover {
          transform: scale(1.02);
        }
        
        .btn-add-to-cart:hover,
        .btn-buy-now:hover {
          background-color: #3a8a80 !important;
          border-color: #3a8a80 !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        
        .border-top {
          border-color: #49aea2 !important;
        }
      `}</style>
    </Container>
  );
};

export default ProductDetail;