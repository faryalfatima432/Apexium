// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create order (user route)
router.post("/", protect, async (req, res) => {
  const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'Pending'
    });

    res.status(201).json({
      _id: order._id,
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get orders of logged-in user
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin routes
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;