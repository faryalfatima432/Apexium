// ProductCard.js - Updated to match the image design
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Calculate discount percentage if not provided
  const calculateDiscount = () => {
    if (product.discount) return product.discount;
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <Card.Img 
            variant="top" 
            src={product.image} 
            className="product-image"
          />
          {discount > 0 && (
            <Badge bg="danger" className="discount-badge">
              -{discount}%
            </Badge>
          )}
        </div>
      </Link>
      
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        {product.description && (
    <Card.Text className="product-description mt-1">
      {product.description}
    </Card.Text>
  )}
        <div className="price-section mb-2">
          <div className="d-flex align-items-center">
            <span className="product-price">Rs. {product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-original-price ms-2">
                <del>Rs. {product.originalPrice.toLocaleString('en-IN')}</del>
              </span>
            )}
          </div>
        </div>
   
        
        {/* Add to Cart button removed as shown in the image */}
      </Card.Body>

      <style>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }
        
        .product-card {
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #eee;
          overflow: hidden;
          height: 100%;
          margin-bottom: 1.5rem;
          flex: 0 0 auto;
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .product-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        
        .product-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .product-image-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .discount-badge {
          background-color: #dc3545 !important;
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.8rem;
          z-index: 10;
          padding: 0.25rem 0.5rem;
        }
        
        .product-title-link {
          text-decoration: none;
          color: inherit;
        }
        
        .product-title {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #333;
          transition: color 0.3s;
          height: 2.5rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .product-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  margin-bottom: 0.5rem;
}

@media (max-width: 767.98px) {
  .product-description {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
}
        .product-title:hover {
          color: var(--primary-color);
        }
        
        .product-price {
          font-weight: bold;
          color: #333;
          font-size: 1.2rem;
        }
        
        .product-original-price {
          color: #6c757d;
          font-size: 0.95rem;
        }
        
        .product-category {
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }
        
        .price-section {
          margin-top: auto;
        }

        /* Tablet View (768px - 1024px) */
        @media (max-width: 1024px) {
          .product-image-container {
            height: 180px;
          }
          
          .product-title {
            font-size: 0.95rem;
            height: 2.3rem;
          }
          
          .product-price {
            font-size: 1.1rem;
          }
        }

        /* Mobile View (768px and below) */
        @media (max-width: 767.98px) {
          .product-card {
            margin-bottom: 1rem;
          }
          
          .product-image-container {
            height: 160px;
          }
          
          .product-title {
            font-size: 0.9rem;
            height: 2.2rem;
            -webkit-line-clamp: 2;
          }
          
          .product-price {
            font-size: 1.05rem;
          }
          
          .product-original-price {
            font-size: 0.85rem;
          }
          
          .product-category {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
          }
        }

        /* Small Mobile View (480px and below) */
        @media (max-width: 480px) {
          .product-image-container {
            height: 140px;
          }
          
          .product-title {
            font-size: 0.85rem;
            height: 2rem;
            margin-bottom: 0.25rem;
          }
          
          .product-price {
            font-size: 1rem;
          }
          
          .product-category {
            font-size: 0.75rem;
          }
        }

        /* Extra Small Mobile View (360px and below) */
        @media (max-width: 360px) {
          .product-image-container {
            height: 120px;
          }
          
          .product-title {
            font-size: 0.8rem;
            height: 1.8rem;
          }
          
          .product-price {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;