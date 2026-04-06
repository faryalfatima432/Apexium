import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

// Routes

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
//  app.use("/uploads", express.static("uploads"));

//app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use('/api/auth', authRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});