// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
         type: String,
          required: true,
            trim: true,
           unique: true
         },
    description: { type: String, 
        trim: true, 
        default: '' },
    image: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);