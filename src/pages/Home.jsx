import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import './Home.css';
const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

   const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const heroImages = [
    '/images/clothes.jpg',
    'images/books.jpg',
    '/images/Glasses.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/6.jpg',
    '/images/5.jpg',
  ];
  

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backend_url}/api/products`);
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${backend_url}/api/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getSalePercentage = (p) => {
    if (p.salePrice && p.salePrice < p.price) {
      return Math.round(((p.price - p.salePrice) / p.price) * 100);
    }
    return 0;
  };

  return (
    <div className="home">

      {/* ===== HERO ===== */}
    
      <section className="hero-section">
  <div className="hero-slider">

    {heroImages.map((img, i) => (
      <div key={i} className={`hero-slide ${i === currentSlide ? "active" : ""}`}>
        <img src={img} alt={`Hero Slide ${i}`} loading="lazy" />
      </div>
    ))}

    <button
      className="hero-btn prev"
      onClick={() =>
        setCurrentSlide(
          (prev) => (prev - 1 + heroImages.length) % heroImages.length
        )
      }
    >
      <FaChevronLeft />
    </button>

    <button
      className="hero-btn next"
      onClick={() =>
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      }
    >
      <FaChevronRight />
    </button>

    <div className="hero-indicators">
      {heroImages.map((_, i) => (
        <button
          key={i}
          className={`indicator ${i === currentSlide ? "active" : ""}`}
          onClick={() => setCurrentSlide(i)}
        />
      ))}
    </div>

  </div>
      </section>

      {/* ===== PRODUCTS ===== */}
     <section className="products mt-0">
     <h2 style={{color: "#6b4423"}}>Featured Products</h2>

  <div className="product-grid">
    {products.map((p) => (
      <ProductCard key={p._id} p={p} backend_url={backend_url} />
    ))}
  </div>
     </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories-section">

  {/* <div className="section-header">
    <h2 style={{color: "#6b4423"}} className='algin-item-start'>Shop By Category</h2>
  
  </div> */}
   <h2 style={{color: "#6b4423"}} className='algin-item-start'>Shop By Category</h2>
  

  <div className="categories-grid">
    {categories.map((c) => (
      <CategoryCard
        key={c._id}
        category={c}
        products={products}
        backend_url={backend_url}
      />
    ))}
  </div>

</section>
    </div>
  );
};

export default Home;