// // controllers/categoryController.js
// import Category from '../models/Category.js';

// export const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const getCategory = async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) return res.status(404).json({ message: 'Category not found' });
//         res.json(category);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const createCategory = async (req, res) => {
//     try {
//         const category = new Category(req.body);
//         await category.save();
//         res.status(201).json(category);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// export const updateCategory = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!category) return res.status(404).json({ message: 'Category not found' });
//         res.json(category);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// export const deleteCategory = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndDelete(req.params.id);
//         if (!category) return res.status(404).json({ message: 'Category not found' });
//         res.json({ message: 'Category deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    const data = await Category.find().sort({ createdAt: -1 });
    res.json(data);
};

export const createCategory = async (req, res) => {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
};

export const updateCategory = async (req, res) => {
    const updated = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
};

export const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};