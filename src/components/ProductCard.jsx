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
            alt={product.name}
          />
          {discount > 0 && (
            <Badge bg="danger" className="discount-badge">
              -{discount}%
            </Badge>
          )}
          <div className="product-overlay">
            <button className="view-details-btn">View Details</button>
          </div>
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
          <div className="d-flex align-items-center gap-2">
            <span className="product-price">Rs. {product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-original-price">
                <del>Rs. {product.originalPrice.toLocaleString('en-IN')}</del>
              </span>
            )}
          </div>
        </div>
      </Card.Body>

      <style>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }
        
        .product-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          overflow: hidden;
          height: 100%;
          margin-bottom: 1.5rem;
          flex: 0 0 auto;
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 16px 32px rgba(73, 174, 162, 0.15);
          border-color: var(--primary-color);
        }
        
        .product-image-container {
          position: relative;
          overflow: hidden;
          height: 240px;
          background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .view-details-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .view-details-btn:hover {
          background: var(--primary-dark);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(73, 174, 162, 0.4);
        }
        
        .product-image-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .discount-badge {
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f) !important;
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 0.85rem;
          z-index: 10;
          padding: 0.35rem 0.65rem;
          font-weight: 700;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
        }
        
        .product-title-link {
          text-decoration: none;
          color: inherit;
        }
        
        .product-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
          transition: color 0.3s;
          height: 2.3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.15;
        }

        .product-title:hover {
          color: var(--primary-color);
        }
        
        .product-description {
          font-size: 0.85rem;
          color: #7f8c8d;
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 0.75rem !important;
        }

        .product-price {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 1.2rem;
        }
        
        .product-original-price {
          color: #95a5a6;
          font-size: 0.85rem;
        }
        
        .price-section {
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid #f0f0f0;
        }

        /* Tablet View (768px - 1024px) */
        @media (max-width: 1024px) {
          .product-image-container {
            height: 200px;
          }
          
          .product-title {
            font-size: 0.9rem;
            height: 2.2rem;
          }
          
          .product-price {
            font-size: 1.1rem;
          }
        }

        /* Mobile View (768px and below) */
        @media (max-width: 767.98px) {
          .product-card {
            margin-bottom: 1rem;
            border-radius: 10px;
          }
          
          .product-image-container {
            height: 200px;
          }

          .card-body {
            padding: 12px;
          }
          
          .product-title {
            font-size: 0.85rem;
            height: 2rem;
            -webkit-line-clamp: 2;
          }

          .product-description {
            font-size: 0.8rem;
          }
          
          .product-price {
            font-size: 1rem;
          }
          
          .product-original-price {
            font-size: 0.8rem;
          }

          .view-details-btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
        }

        /* Small Mobile View (480px and below) */
        @media (max-width: 480px) {
          .product-image-container {
            height: 160px;
          }

          .card-body {
            padding: 10px;
          }
          
          .product-title {
            font-size: 0.8rem;
            height: 1.8rem;
            margin-bottom: 0.4rem;
          }

          .product-description {
            font-size: 0.75rem;
            margin-bottom: 0.5rem !important;
            -webkit-line-clamp: 1;
          }
          
          .product-price {
            font-size: 0.9rem;
          }
          
          .discount-badge {
            font-size: 0.75rem;
            padding: 0.2rem 0.5rem;
          }
        }

        /* Extra Small Mobile View (360px and below) */
        @media (max-width: 360px) {
          .product-image-container {
            height: 140px;
          }

          .card-body {
            padding: 8px;
          }

          .product-title {
            font-size: 0.75rem;
            margin-bottom: 0.3rem;
          }

          .product-description {
            display: none;
          }

          .product-price {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;