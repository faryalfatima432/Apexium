// CategoryPage.js - Simplified without banner and price range
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    gender: ''
  });

  // Initialize products when category changes
  useEffect(() => {
    const categoryMap = {
      'headphones': 'airbuds',
      'sunglasses': 'glasses'
    };
    
    const actualCategory = categoryMap[category.toLowerCase()] || category.toLowerCase();
    
    const initialProducts = products.filter(p => 
      p.category.toLowerCase() === actualCategory
    );
    
    setFilteredProducts(initialProducts);
    setFilters({
      category: actualCategory,
      gender: ''
    });
  }, [category]);

  const applyFilters = (newFilters) => {
    const categoryMap = {
      'headphones': 'airbuds',
      'sunglasses': 'glasses'
    };
    
    const actualCategory = categoryMap[category.toLowerCase()] || category.toLowerCase();
    
    let filtered = products.filter(p => 
      p.category.toLowerCase() === actualCategory
    );
    
    if (newFilters.gender) {
      filtered = filtered.filter(p => p.gender === newFilters.gender);
    }
    
    setFilteredProducts(filtered);
    setFilters(newFilters);
  };

  const getDisplayCategoryName = () => {
    const categoryMap = {
      'airbuds': 'Headphones',
      'glasses': 'Sunglasses',
      'sunglasses': 'Sunglasses',
      'headphones': 'Headphones'
    };
    
    const displayName = categoryMap[category.toLowerCase()] || category;
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col lg={3} className="mb-4">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={applyFilters} 
              isCategoryPage={true}
              key={category}
            />
          </Col>
          <Col lg={9}>
            <div className="products-grid-container">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <h4 className="text-muted">No products found matching your filters</h4>
                <p className="text-muted">Try adjusting your filters to see more results</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <style>{`
        .products-grid-container {
          display: grid;
          gap: 1.5rem;
          padding: 1rem 0;
        }

        /* Large Desktop - 4 cards per row */
        @media (min-width: 1200px) {
          .products-grid-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Desktop - 3 cards per row */
        @media (min-width: 992px) and (max-width: 1199.98px) {
          .products-grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Tablet - 3 cards per row */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .products-grid-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.2rem;
          }
        }

        /* Small Tablet - 2 cards per row */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .products-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        /* Mobile - 2 cards per row */
        @media (min-width: 480px) and (max-width: 575.98px) {
          .products-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
          }
        }

        /* Small Mobile - 2 cards per row with smaller gap */
        @media (max-width: 479.98px) {
          .products-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.7rem;
          }
        }

        /* Extra Small Mobile - 1 card per row for very small screens */
        @media (max-width: 359.98px) {
          .products-grid-container {
            grid-template-columns: 1fr;
            gap: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;