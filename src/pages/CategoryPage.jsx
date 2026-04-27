import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThLarge, FaList, FaBars } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
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

  // SYNC URL CATEGORY
  useEffect(() => {
    setSelectedCategory(category || "all");
  }, [category]);
//filter, search, sort
  useEffect(() => {
    let result = [...products];

    // CATEGORY
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId =
          typeof p.category === "object" ? p.category._id : p.category;
        return catId === selectedCategory;
      });
    }

    // SEARCH
    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT
    if (sort === "price-low") {
      result.sort((a, b) => {
        const priceA = a.salePrice > 0 ? a.salePrice : a.price;
        const priceB = b.salePrice > 0 ? b.salePrice : b.price;
        return priceA - priceB;
      });
    } else if (sort === "price-high") {
      result.sort((a, b) => {
        const priceA = a.salePrice > 0 ? a.salePrice : a.price;
        const priceB = b.salePrice > 0 ? b.salePrice : b.price;
        return priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, search, sort]);

  // ✅ CATEGORY NAME
  const categoryName =
    categories.find((c) => c._id === selectedCategory)?.name ||
    "All Products";

  return (
    <div className="category-page">

      {/* ===== TOP HEADER ===== */}
      <div className="category-top">
        <div>
          <h2>{categoryName} Price in Pakistan</h2>
          <p>Showing results for {categoryName.toLowerCase()}</p>
        </div>

        <div className="top-controls">

          {/* SORT */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Best Match</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
          </select>

          {/* VIEW */}
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

          {/* MOBILE FILTER BUTTON */}
          <FaBars
            className="mobile-filter-btn"
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="category-container">

        {/* ===== SIDEBAR ===== */}
        <div className={`category-sidebar ${showSidebar ? "show" : ""}`}>
          <div className="sidebar-header">
            <h3>Categories</h3>
            <span onClick={() => setShowSidebar(false)}>×</span>
          </div>

          <div
            className={`cat-item ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory("all");
              navigate("/category/all");
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
                navigate(`/category/${c._id}`);
                setShowSidebar(false);
              }}
            >
              {c.name}
            </div>
          ))}
        </div>

        {/* ===== PRODUCTS ===== */}
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

      {/* OVERLAY */}
      {showSidebar && (
        <div className="overlay" onClick={() => setShowSidebar(false)} />
      )}
    </div>
  );
};

export default CategoryPage;