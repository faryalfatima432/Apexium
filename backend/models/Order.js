// // // models/Order.js
// // import mongoose from 'mongoose';

// // const orderSchema = new mongoose.Schema({
// //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //     products: [{
// //         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// //         quantity: { type: Number, default: 1 }
// //     }],
// //     totalAmount: { type: Number, required: true },
// //     status: { type: String,
// //          enum: ["Pending", "Processing", "Shipping", "Delivered"],
// //         default: 'Pending' },
// // }, { timestamps: true });

// // export default mongoose.model('Order', orderSchema);

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       name: String,
//       quantity: Number,
//       price: Number,
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["Pending", "Processing", "Shipping", "Delivered"],
//     default: "Pending",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Order", orderSchema);

// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: String,
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "bank"],
      default: "cod"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);