// FilterSidebar.js - Simplified with only Categories filter
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FilterSidebar = ({ filters, onFilterChange, isCategoryPage = false }) => {
  const navigate = useNavigate();
  
  const handleCategoryChange = (category) => {
    if (isCategoryPage) {
      // Navigate to the selected category page
      navigate(`/category/${category}`);
    } else {
      // Just filter the current list
      onFilterChange({ ...filters, category: category });
    }
  };

  // Categories for filtering
  const categories = [
    'Shoes', 'Perfumes', 'Clothes', 'Books', 'Headphones', 'Sunglasses', 'Watches'
  ];

  return (
    <div className="filter-sidebar">
      {/* Header */}
     
      <Accordion defaultActiveKey="0" className="filter-accordion">
        {/* Category Filter */}
        <Accordion.Item eventKey="0">
          <Accordion.Header className="filter-header">
             Categories
          </Accordion.Header>
          <Accordion.Body className="filter-body">
            <div className="categories-list">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`category-item ${filters.category === category.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.toLowerCase())}
                >
                  {category}
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Responsive Styles */}
      <style jsx>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }
        
        .filter-sidebar {
          position: sticky;
          top: 20px;
          height: fit-content;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .accordion-button:not(.collapsed) {
          background-color: rgba(73, 174, 162, 0.1);
          color: var(--primary-color);
        }
        
        .accordion-button:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.25rem rgba(73, 174, 162, 0.25);
        }
        
        @media (max-width: 991.98px) {
          .filter-sidebar {
            position: relative;
            top: 0;
            max-height: none;
            margin-bottom: 20px;
          }
        }
        
        .filter-header {
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 15px;
          cursor: pointer;
        }
        
        .filter-body {
          padding: 15px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .category-item {
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
          font-size: 0.9rem;
        }
        
        .category-item:hover {
          background-color: rgba(73, 174, 162, 0.1);
          border-color: var(--primary-color);
        }
        
        .category-item.active {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        /* Custom scrollbar for filter body */
        .filter-body::-webkit-scrollbar {
          width: 4px;
        }
        
        .filter-body::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .filter-body::-webkit-scrollbar-thumb {
          background: var(--primary-color);
          border-radius: 2px;
        }
        
        .filter-body::-webkit-scrollbar-thumb:hover {
          background: var(--primary-dark);
        }
        
        /* Collapsed state styling */
        .accordion-button::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2349aea2'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
        }
        
        .accordion-button:not(.collapsed)::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2349aea2'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;