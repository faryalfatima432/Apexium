import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const data = await Product.find();
  res.json(data);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};