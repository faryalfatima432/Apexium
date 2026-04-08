import React, { useState, useEffect } from "react";
import "./ProductManagement.css";
import API from "./api/api";
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const backend_url=import.meta.VITE_BACKEND_URL || "http://localhost:5000"

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
    lowStockThreshold: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      salePrice: "",
      stock: "",
      lowStockThreshold: "",
      category: "",
      image: null,
    });
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("salePrice", formData.salePrice || "");
      data.append("stock", formData.stock);
      data.append("lowStockThreshold", formData.lowStockThreshold || 5);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/products", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchProducts();
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      salePrice: product.salePrice || "",
      stock: product.stock || "",
      lowStockThreshold: product.lowStockThreshold || "",
      category: product.category?._id || product.category || "",
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await API.delete(`/products/${productId}`);
      await fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStockStatus = (product) => {
    if (product.stock <= (product.lowStockThreshold || 5)) {
      return { status: "Low Stock", class: "low-stock" };
    }
    if (product.stock === 0) {
      return { status: "Out of Stock", class: "out-of-stock" };
    }
    return { status: "In Stock", class: "in-stock" };
  };

  if (loading) {
    return (
      <div className="product-management">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="management-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-box"></i>
            Product Management
          </h1>
          <p>Manage your product inventory</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <i className="fas fa-plus"></i>
          Add New Product
        </button>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={() => setError(null)} className="close-error">
            ×
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product);
            return (
              <div key={product._id} className="product-card">

                  <div className="product-image w-100 h-50 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">

                   {product.imageUrl ? (

                    <img
                    src={`${backend_url}${product.imageUrl}`}
                    alt={product.name}
                    />

                    ):(

                  <div className="no-image">No Image</div>

                  )}

                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-details">
                    <div className="detail-item">
                      <span className="label">Price:</span>
                      <span className="value">
                        {product.salePrice && product.salePrice < product.price ? (
                          <div className="price-section">
                            <span className="original-price">{formatCurrency(product.price)}</span>
                            <span className="sale-price">{formatCurrency(product.salePrice)}</span>
                            <span className="discount-badge">
                              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                            </span>
                          </div>
                        ) : (
                          formatCurrency(product.price)
                        )}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Stock:</span>
                      <span className={`value stock-${stockStatus.class}`}>
                        {product.stock} ({stockStatus.status})
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Category:</span>
                      <span className="value">
                        {product.category?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="product-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(product)}
                    title="Edit Product"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product._id)}
                    title="Delete Product"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <h3>No products found</h3>
            <p>Try adjusting your search or add a new product.</p>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                <i
                  className={`fas ${editingProduct ? "fa-edit" : "fa-plus"}`}
                ></i>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                className="close-modal"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label>Sale Price ($)</label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                  {formData.price && formData.salePrice && (
                    <small className="discount-info">
                      {Math.round(((parseFloat(formData.price) - parseFloat(formData.salePrice)) / parseFloat(formData.price)) * 100)}% off
                    </small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />{" "}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {editingProduct ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <i
                        className={`fas ${editingProduct ? "fa-save" : "fa-plus"}`}
                      ></i>
                      {editingProduct ? "Update Product" : "Create Product"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
