// Updated StockManagement.js - Integrate with products and orders
import React, { useState, useEffect } from 'react';
import './StockManagement.css';
import { getFromLocalStorage } from '../../utils/storage';

const StockManagement = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedProducts = getFromLocalStorage('products', []);
        const savedOrders = getFromLocalStorage('orders', []);
        setProducts(savedProducts);
        setOrders(savedOrders);
    }, []);

    const calculateAvailableStock = (product) => {
        const activeOrders = orders.filter(order => 
            order.status !== 'cancelled' && 
            order.items.some(item => item.id === product.id)
        );
        
        const reservedStock = activeOrders.reduce((total, order) => {
            const orderItem = order.items.find(item => item.id === product.id);
            return total + (orderItem ? orderItem.quantity : 0);
        }, 0);

        return product.stock - reservedStock;
    };

    const updateStock = (productId, newStock) => {
        const updatedProducts = products.map(product =>
            product.id === productId
                ? { ...product, stock: parseInt(newStock) }
                : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const lowStockProducts = products.filter(product => 
        calculateAvailableStock(product) <= (product.lowStockThreshold || 5)
    );

    return (
        <div className="stock-management">
            <div className="management-header">
                <h1>Stock</h1>
                {lowStockProducts.length > 0 && (
                    <div className="alert-badge">
                        <i className="fas fa-exclamation-triangle"></i>
                        {lowStockProducts.length} items low in stock
                    </div>
                )}
            </div>

            {lowStockProducts.length > 0 && (
                <div className="low-stock-alert">
                    <h3>
                        <i className="fas fa-exclamation-circle"></i>
                        Low Stock Alert
                    </h3>
                    <div className="alert-products">
                        {lowStockProducts.map(product => (
                            <div key={product.id} className="alert-item">
                                <span className="product-name">{product.name}</span>
                                <span className="stock-info">
                                    Available: {calculateAvailableStock(product)} | Threshold: {product.lowStockThreshold || 5}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="stock-table">
                {products.length === 0 ? (
                    <p className="no-data">No products available for stock management</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Total Stock</th>
                                <th>Reserved in Orders</th>
                                <th>Available Stock</th>
                                <th>Status</th>
                                <th>Update Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                const availableStock = calculateAvailableStock(product);
                                const reservedStock = product.stock - availableStock;
                                const isLowStock = availableStock <= (product.lowStockThreshold || 5);

                                return (
                                    <tr key={product.id} className={isLowStock ? 'low-stock' : ''}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>{reservedStock}</td>
                                        <td>{availableStock}</td>
                                        <td>
                                            <span className={`stock-status ${isLowStock ? 'low' : 'adequate'}`}>
                                                {isLowStock ? 'Low Stock' : 'Adequate'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="stock-update">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={product.stock}
                                                    onChange={(e) => updateStock(product.id, e.target.value)}
                                                />
                                                <button 
                                                    className="btn-update"
                                                    onClick={() => {/* Stock is updated on change */}}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StockManagement;