import Product from '../models/Product.js';
import Category from '../models/Category.js';
import path from 'path';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, salePrice, stock, lowStockThreshold, category } = req.body;

        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`; // Save relative path
        }
        const product = new Product({
            name,
            description,
            price,
            salePrice: salePrice || 0,
            stock,
            lowStockThreshold: lowStockThreshold || 5,
            category,
            imageUrl
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, salePrice, stock, lowStockThreshold, category } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.salePrice = salePrice || product.salePrice || 0;
        product.stock = stock || product.stock;
        product.lowStockThreshold = lowStockThreshold || product.lowStockThreshold || 5;
        product.category = category || product.category;

        if (req.file) {
            product.imageUrl = `/uploads/${req.file.filename}`;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};