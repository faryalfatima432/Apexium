import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaThLarge, FaList, FaBars } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css"; // ✅ reuse same design

const SearchPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("q") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("newest");
  const [showSidebar, setShowSidebar] = useState(false);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${backend_url}/api/products`),
          fetch(`${backend_url}/api/categories`)
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        setProducts(pData || []);
        setCategories(cData || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 FILTER LOGIC (SEARCH + CATEGORY + SORT)
  useEffect(() => {
    let result = [...products];

    // 🔥 SEARCH FILTER
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // CATEGORY FILTER
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId =
          typeof p.category === "object" ? p.category._id : p.category;
        return catId === selectedCategory;
      });
    }

    // SORT
    if (sort === "price-low") {
      result.sort((a, b) => {
        const aPrice = a.salePrice > 0 ? a.salePrice : a.price;
        const bPrice = b.salePrice > 0 ? b.salePrice : b.price;
        return aPrice - bPrice;
      });
    } else if (sort === "price-high") {
      result.sort((a, b) => {
        const aPrice = a.salePrice > 0 ? a.salePrice : a.price;
        const bPrice = b.salePrice > 0 ? b.salePrice : b.price;
        return bPrice - aPrice;
      });
    }

    setFilteredProducts(result);

  }, [products, searchQuery, selectedCategory, sort]);

  return (
    <div className="category-page">

      {/* HEADER */}
      <div className="category-top">
        <div>
          <h2>Search results for "{searchQuery}"</h2>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="top-controls">

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Best Match</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
          </select>

          <div className="view-icons">
            <FaThLarge
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            />
            <FaList
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            />
          </div>

          <FaBars
            className="mobile-filter-btn"
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="category-container">

        {/* SIDEBAR */}
        <div className={`category-sidebar ${showSidebar ? "show" : ""}`}>
          <div className="sidebar-header">
            <h3>Categories</h3>
            <span onClick={() => setShowSidebar(false)}>×</span>
          </div>

          <div
            className={`cat-item ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory("all");
              setShowSidebar(false);
            }}
          >
            All Categories
          </div>

          {categories.map((c) => (
            <div
              key={c._id}
              className={`cat-item ${
                selectedCategory === c._id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(c._id);
                setShowSidebar(false);
              }}
            >
              {c.name}
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="category-products">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            <div className={`product-grid ${view}`}>
              {filteredProducts.map((p) => (
                <ProductCard key={p._id} p={p} backend_url={backend_url} />
              ))}
            </div>
          )}
        </div>

      </div>

      {showSidebar && (
        <div className="overlay" onClick={() => setShowSidebar(false)} />
      )}
    </div>
  );
};

export default SearchPage;