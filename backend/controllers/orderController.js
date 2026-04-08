// controllers/orderController.js
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

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
        res.status(400).json({ message: err.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};