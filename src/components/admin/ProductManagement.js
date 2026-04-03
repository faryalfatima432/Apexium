// Updated ProductManagement.js - Remove stock field, add discount calculation, and localStorage integration
import React, { useState, useEffect } from 'react';
import './ProductManagement.css';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const savedProducts = getFromLocalStorage('products', []);
        const savedCategories = getFromLocalStorage('categories', []);
        setProducts(savedProducts);
        setCategories(savedCategories);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        salePrice: '',
        description: '',
        category: '',
        image: null,
        imageUrl: ''
    });

    const calculateDiscount = () => {
        if (formData.price && formData.salePrice) {
            const discount = ((formData.price - formData.salePrice) / formData.price * 100);
            return discount.toFixed(0);
        }
        return 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imageUrl: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            id: editingProduct ? editingProduct.id : Date.now(),
            discount: calculateDiscount(),
            createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
        };

        let updatedProducts;
        if (editingProduct) {
            updatedProducts = products.map(p => p.id === editingProduct.id ? productData : p);
        } else {
            updatedProducts = [...products, productData];
        }

        setProducts(updatedProducts);
        saveToLocalStorage('products', updatedProducts);
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            salePrice: '',
            description: '',
            category: '',
            image: null,
            imageUrl: ''
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            salePrice: product.salePrice || '',
            description: product.description,
            category: product.category,
            image: product.image,
            imageUrl: product.imageUrl || ''
        });
        setShowForm(true);
    };

    const handleDelete = (productId) => {
        const updatedProducts = products.filter(p => p.id !== productId);
        setProducts(updatedProducts);
        saveToLocalStorage('products', updatedProducts);
    };

    return (
        <div className="product-management">
            <div className="management-header">
                <h1>Products</h1>
                <button 
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Add New Product
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => { setShowForm(false); setEditingProduct(null); resetForm(); }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-group">
                                <label>Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {formData.imageUrl && (
                                    <div style={{marginTop: '10px'}}>
                                        <img src={formData.imageUrl} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price (Rs)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sale Price (Rs)</label>
                                    <input
                                        type="number"
                                        name="salePrice"
                                        value={formData.salePrice}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>

                            {formData.salePrice && formData.price && (
                                <div className="form-group">
                                    <label>Discount: {calculateDiscount()}%</label>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="products-table">
                {products.length === 0 ? (
                    <p className="no-data">No products added yet</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price (Rs)</th>
                                <th>Sale Price (Rs)</th>
                                <th>Discount</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-image">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.name} />
                                            ) : (
                                                <div className="image-placeholder">No Image</div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>Rs {parseFloat(product.price).toLocaleString()}</td>
                                    <td>{product.salePrice ? `Rs ${parseFloat(product.salePrice).toLocaleString()}` : '-'}</td>
                                    <td>{product.discount ? `${product.discount}%` : '-'}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="btn-edit"
                                                onClick={() => handleEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;