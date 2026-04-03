// SearchPanel.js - Updated with new color scheme #49aea2
import React, { useState } from 'react';
import { Offcanvas, Form, ListGroup } from 'react-bootstrap';
import { products } from '../data/products';

const SearchPanel = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search Products</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </Form>
        
        <ListGroup className="mt-3">
          {results.map(product => (
            <ListGroup.Item 
              key={product.id} 
              action 
              href={`/product/${product.id}`}
              onClick={handleClose}
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
      </Offcanvas.Body>

      <style jsx>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }
        
        .offcanvas-header {
          border-bottom: 1px solid #e9ecef;
        }
        
        .offcanvas-title {
          color: var(--primary-color);
          font-weight: 600;
        }
        
        .search-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(73, 174, 162, 0.25);
        }
        
        .list-group-item-action {
          transition: all 0.3s;
        }
        
        .list-group-item-action:hover {
          background-color: rgba(73, 174, 162, 0.1);
          border-color: var(--primary-color);
        }
        
        .list-group-item.active {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
      `}</style>
    </Offcanvas>
  );
};

export default SearchPanel;