
// Home.js - Updated with themed sale banner below main banner
import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

// Correct Bootstrap Icons
import { 
  BsBag, 
  BsBook, 
  BsHeadphones, 
  BsWatch,
  BsSunglasses
} from 'react-icons/bs';

// Alternative icons for missing ones
import { 
  FaShoePrints, 
  FaSprayCan,
  FaTshirt 
} from 'react-icons/fa';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    priceRange: [500, 40000],
    category: '',
    gender: ''
  });


  const navigate = useNavigate();
  const categorySliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Updated categories with correct icons
  const homeCategories = [
    { id: 'shoes', name: 'Shoes', icon: <FaShoePrints /> },
    { id: 'perfumes', name: 'Perfumes', icon: <FaSprayCan /> },
    { id: 'clothes', name: 'Clothes', icon: <FaTshirt /> },
    { id: 'books', name: 'Books', icon: <BsBook /> },
    { id: 'headphones', name: 'Headphones', icon: <BsHeadphones /> },
    { id: 'watches', name: 'Watches', icon: <BsWatch /> },
    { id: 'glasses', name: 'Glasses', icon: <BsSunglasses /> }
  ];

  // Banner images using category images
  const bannerImages = [
    { id: 'shoes', image: '/images/shoes.jpg'},
    { id: 'perfumes', image: '/images/perfume.jpg'},
    { id: 'clothes', image: '/images/clothes.jpg' },
    { id: 'books', image: '/images/books.jpg'},
    { id: 'headphones', image: '/images/headphones.jpg' },
    { id: 'watches', image: '/images/watch.jpg' },
    { id: 'glasses', image: '/images/Glasses.jpg' }
  ];

  // Fetch random summer sale image from Unsplash


  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - categorySliderRef.current.offsetLeft;
    scrollLeft.current = categorySliderRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - categorySliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    categorySliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - categorySliderRef.current.offsetLeft;
    scrollLeft.current = categorySliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - categorySliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    categorySliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const applyFilters = (newFilters) => {
    let filtered = products;
    
    const categoryMap = {
      'headphones': 'airbuds',
      'sunglasses': 'glasses'
    };
    
    const actualCategory = categoryMap[newFilters.category?.toLowerCase()] || newFilters.category?.toLowerCase();
    
    if (actualCategory) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === actualCategory
      );
    }
    
    if (newFilters.gender) {
      filtered = filtered.filter(p => p.gender === newFilters.gender);
    }
    
    filtered = filtered.filter(p => 
      p.price >= newFilters.priceRange[0] && p.price <= newFilters.priceRange[1]
    );
    
    setFilteredProducts(filtered);
    setFilters(newFilters);
  };

  useEffect(() => {
    if (!showAllProducts) {
      setFilteredProducts(products);
    }
  }, [showAllProducts]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  return (
    <div className="home-page">
      {/* Banner Carousel with 5-second interval - Simplified without overlay */}
      <div className="banner-carousel">
        <Carousel 
          indicators={!isMobile} 
          controls={!isMobile}
          interval={5000}
          pause={false}
        >
          {bannerImages.map((banner) => (
            <Carousel.Item key={banner.id}>
              <div className="banner">
                <img 
                  src={banner.image} 
                  alt={banner.id} 
                  className="img-fluid w-100 banner-image"
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      
      {/* Categories Section */}
      <Container className="my-4">
        <div className="categories-section mb-4">
          {/* Fixed: Properly centered heading */}
          <div className="section-header-wrapper w-100 text-center mb-3">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          
          {/* Single slider for both mobile and desktop */}
          <div className="category-slider-wrapper">
            <div className="category-slider-container">
              <div 
                className="category-slider" 
                ref={categorySliderRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {homeCategories.map((category, index) => (
                  <div 
                    key={`${category.id}-${index}`} 
                    className="category-slide"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="category-icon-container">
                      {category.icon}
                    </div>
                    <div className="category-name">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section - Removed View All/View Less buttons */}
        <div className="products-section">
          <div className="section-header d-flex justify-content-between align-items-center mb-3">
            <h2 className="section-title mb-0">
              Featured Products
            </h2>
          </div>
          
          <div className="products-grid-container">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-4">
              <h4 className="text-muted">No products found matching your filters</h4>
              <p className="text-muted">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </Container>

      <style>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
          --primary-light: #6abeb4;
          --sale-color: #e74c3c;
          --sale-dark: #c0392b;
        }
        
        .home-page {
          padding-top: 0.5rem;
        }
        
        /* Banner Carousel Styles - INCREASED HEIGHT FOR WEBSITE VIEW */
        .banner-carousel {
          margin-bottom: 2rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          height: 500px; /* Increased from 300px for website view */
        }
        
        .banner-image {
          height: 500px; /* Increased from 300px for website view */
          width: 100%;
          object-fit: cover;
        }

        /* Sale Banner Styles - Updated with theme colors */
        .sale-banner-section {
          margin-bottom: 2rem;
        }

        .sale-banner {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          border-radius: 12px;
          padding: 2rem;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .sale-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        .sale-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .sale-text {
          flex: 1;
        }

        .sale-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .sale-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffeb3b;
        }

        .sale-description {
          font-size: 1.1rem;
          margin-bottom: 0;
          opacity: 0.9;
          max-width: 500px;
        }

        .sale-image {
          position: relative;
          width: 180px;
          height: 180px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid rgba(255,255,255,0.3);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        .sale-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .sale-percent {
          font-size: 2.5rem;
          font-weight: 900;
          color: #ffeb3b;
          line-height: 1;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .sale-off {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin-top: 5px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        /* Section Title - FIXED CENTERING */
        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--primary-color);
          text-align: center;
          width: 100%;
          display: block;
          margin: 0 auto;
        }

        .section-header-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Categories Section */
        .categories-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .category-slider-wrapper {
          width: 100%;
        }

        .category-slider-container {
          overflow: hidden;
          padding: 0.5rem 0;
          width: 100%;
          max-width: 100vw;
          cursor: grab;
        }

        .category-slider-container:active {
          cursor: grabbing;
        }
        
        .category-slider {
          display: flex;
          gap: 0.8rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          width: 100%;
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          padding: 0.5rem 0;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }
        .category-slider::-webkit-scrollbar { display: none; }
        
        .category-slide {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem;
          min-width: 0;
          box-sizing: border-box;
          transition: transform 0.2s ease;
          user-select: none;
          scroll-snap-align: start;
        }

        .category-slide:hover {
          transform: translateY(-2px);
        }
        
        .category-icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          border: 2px solid var(--primary-color);
          background-color: white;
          color: var(--primary-color);
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .category-slide:active .category-icon-container {
          transform: scale(0.95);
        }
        
        .category-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
          text-align: center;
          line-height: 1.2;
        }

        /* Products Grid - FIXED MOBILE DISPLAY ISSUE */
        .products-grid-container {
          display: grid;
          gap: 1rem;
          padding: 0.5rem 0;
          align-items: start;
          min-height: 200px;
        }

        /* Responsive adjustments - ONLY WEBSITE VIEW BANNER HEIGHT CHANGED */
        @media (min-width: 1200px) {
          .products-grid-container { 
            grid-template-columns: repeat(6, 1fr); 
          }
          .category-slide { 
            flex: 0 0 calc(100% / 7 - 0.8rem); /* 7 categories per row on large desktop */
          }
          .category-icon-container {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
          }
          /* Website view banner height increased */
          .banner-carousel { height: 500px; }
          .banner-image { height: 500px; }
        }
        
        @media (min-width: 992px) and (max-width: 1199.98px) {
          .products-grid-container { 
            grid-template-columns: repeat(4, 1fr); 
          }
          .category-slide { 
            flex: 0 0 calc(100% / 6 - 0.8rem); /* 6 categories per row */
          }
          .category-icon-container {
            width: 55px;
            height: 55px;
            font-size: 1.6rem;
          }
          /* Website view banner height increased */
          .banner-carousel { height: 500px; }
          .banner-image { height: 500px; }
        }
        
        @media (min-width: 768px) and (max-width: 991.98px) {
          .products-grid-container { 
            grid-template-columns: repeat(4, 1fr); 
          }
          .category-slide { 
            flex: 0 0 calc(100% / 5 - 0.8rem); /* 5 categories per row on tablet */
          }
          .category-icon-container {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
          /* Website view banner height increased */
          .banner-carousel { height: 500px; }
          .banner-image { height: 500px; }
        }
        
        /* Mobile View - 4 CATEGORIES PER ROW (FIXED SCROLL POSITION) */
        /* MOBILE VIEW BANNER HEIGHT INCREASED */
        @media (max-width: 767.98px) {
          .banner-carousel { height: 300px; } /* Mobile view INCREASED from 200px to 300px */
          .banner-image { height: 300px; } /* Mobile view INCREASED from 200px to 300px */
          
          /* Sale Banner Mobile Styles */
          .sale-banner {
            padding: 1.5rem;
          }
          
          .sale-content {
            flex-direction: column;
            text-align: center;
          }
          
          .sale-text {
            margin-bottom: 1.5rem;
          }
          
          .sale-title {
            font-size: 2rem;
          }
          
          .sale-subtitle {
            font-size: 1.5rem;
          }
          
          .sale-description {
            font-size: 1rem;
          }
          
          .sale-image {
            width: 140px;
            height: 140px;
          }
          
          .sale-percent {
            font-size: 2rem;
          }
          
          .sale-off {
            font-size: 1.1rem;
          }
          
          .products-grid-container { 
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
          }
          
          /* Ensure product cards have consistent height */
          .product-card {
            min-height: 280px;
          }
          
          /* FIXED: Exactly 4 categories per row on mobile with stable scroll */
          .category-slide { 
            flex: 0 0 calc(25% - 0.8rem); /* 25% for 4 items per row with gap */
            padding: 0.4rem;
            min-width: calc(25% - 0.8rem);
          }
          .category-icon-container { 
            width: 45px; 
            height: 45px; 
            font-size: 1.3rem;
          }
          .category-name { 
            font-size: 0.75rem; 
            line-height: 1.1;
          }
          .category-slider {
            gap: 0.8rem;
            scroll-snap-type: x mandatory;
          }
        }
        
        /* Small Mobile View - BANNER HEIGHT INCREASED */
        @media (max-width: 480px) {
          .products-grid-container { 
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          .banner-carousel { height: 250px; } /* Small mobile view INCREASED from 150px to 250px */
          .banner-image { height: 250px; } /* Small mobile view INCREASED from 150px to 250px */
          
          /* Sale Banner Small Mobile Styles */
          .sale-banner {
            padding: 1rem;
          }
          
          .sale-title {
            font-size: 1.8rem;
          }
          
          .sale-subtitle {
            font-size: 1.3rem;
          }
          
          .sale-description {
            font-size: 0.9rem;
          }
          
          .sale-image {
            width: 120px;
            height: 120px;
          }
          
          .sale-percent {
            font-size: 1.8rem;
          }
          
          .sale-off {
            font-size: 1rem;
          }
          
          /* Product card adjustments for small screens */
          .product-card {
            min-height: 260px;
          }
          
          /* Ensure 4 categories per row even on very small screens */
          .category-slide { 
            flex: 0 0 calc(25% - 0.8rem);
            padding: 0.3rem;
            min-width: calc(25% - 0.8rem);
          }
          .category-icon-container { 
            width: 40px; 
            height: 40px; 
            font-size: 1.2rem;
          }
          .category-name { 
            font-size: 0.7rem; 
          }
        }
        
        /* Extra Small Mobile View - BANNER HEIGHT INCREASED */
        @media (max-width: 360px) {
          .products-grid-container { 
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .category-slide { 
            flex: 0 0 calc(25% - 0.8rem);
            padding: 0.2rem;
            min-width: calc(25% - 0.8rem);
          }
          .category-name { 
            font-size: 0.65rem; 
            line-height: 1.1; 
          }
          .section-title { font-size: 1.3rem; }
          .category-icon-container { 
            width: 35px; 
            height: 35px; 
            font-size: 1.1rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 320px) {
          .category-slide { 
            flex: 0 0 calc(25% - 0.8rem);
            padding: 0.15rem;
            min-width: calc(25% - 0.8rem);
          }
          .category-name { 
            font-size: 0.6rem; 
          }
          .category-icon-container {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
        }

        /* Ensure section header is properly centered */
        .section-header {
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 480px) {
          .section-header {
            flex-direction: column;
            gap: 0.5rem;
          }
          .section-title {
            margin-bottom: 0.5rem;
          }
        }

        /* Disable text selection on slider for better UX */
        .category-slider {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Prevent elastic scrolling on iOS */
        .category-slider-container {
          -webkit-overflow-scrolling: touch;
        }

        /* Improved scroll behavior */
        .category-slider {
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .category-slide {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
};

export default Home;
