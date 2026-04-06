// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    salePrice: {
  type: Number,
  default: 0
},
    imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);