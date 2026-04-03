// Updated CategoryManagement.js - Add localStorage integration
import React, { useState, useEffect } from 'react';
import './CategoryManagement.css';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    
    useEffect(() => {
        const savedCategories = getFromLocalStorage('categories', []);
        setCategories(savedCategories);
    }, []);

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        image: null,
        imageUrl: ''
    });

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            id: Date.now(),
            name: categoryForm.name,
            imageUrl: categoryForm.imageUrl,
            createdAt: new Date().toISOString()
        };
        
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        saveToLocalStorage('categories', updatedCategories);
        setShowCategoryForm(false);
        setCategoryForm({ name: '', image: null, imageUrl: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCategoryForm(prev => ({
                    ...prev,
                    image: file,
                    imageUrl: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteCategory = (id) => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        saveToLocalStorage('categories', updatedCategories);
    };

    return (
        <div className="category-management">
            <div className="management-header">
                <h1>Categories</h1>
                <div className="header-buttons">
                    <button 
                        className="btn-primary"
                        onClick={() => setShowCategoryForm(true)}
                    >
                        Add Category
                    </button>
                </div>
            </div>

            {showCategoryForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New Category</h2>
                            <button onClick={() => setShowCategoryForm(false)}>×</button>
                        </div>
                        <form onSubmit={handleCategorySubmit}>
                            <div className="form-group">
                                <label>Category Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {categoryForm.imageUrl && (
                                    <div style={{marginTop: '10px'}}>
                                        <img src={categoryForm.imageUrl} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">Add Category</button>
                                <button type="button" onClick={() => setShowCategoryForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="categories-section">
                <div className="categories-list">
                  
                    <div className="categories-grid">
                        {categories.length === 0 ? (
                            <p className="no-data">No categories added yet</p>
                        ) : (
                            categories.map(category => (
                                <div key={category.id} className="category-card">
                                    <div className="category-image">
                                        {category.imageUrl ? (
                                            <img src={category.imageUrl} alt={category.name} />
                                        ) : (
                                            <div className="image-placeholder">No Image</div>
                                        )}
                                    </div>
                                    <div className="category-info">
                                        <h3>{category.name}</h3>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => deleteCategory(category.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;