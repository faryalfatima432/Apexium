

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [qty, setQty] = useState(1);
  // ✅ FETCH SINGLE PRODUCT (FIXED)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backend_url}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ SALE %
  const getSalePercentage = () => {
    if (product?.salePrice && product.salePrice < product.price) {
      return Math.round(
        ((product.price - product.salePrice) / product.price) * 100
      );
    }
    return 0;
  };

  const handleAddToCart = () => {
    addToCart({
      id: p._id,
      name: p.name,
      price: finalPrice,
      originalPrice: p.price,
      image: p.imageUrl
        ? `${backend_url}${p.imageUrl}`
        : "/images/shopping.png",
      quantity: 1,
    });

    // ✅ Navigate to cart
    navigate("/cart");
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!product) return <h2 style={{ textAlign: "center" }}>Product not found</h2>;

  return (
    <div className="container product-details mt-4">
      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6">
          <div className="image-box">
            <img
              src={
                product.imageUrl
                  ? `${backend_url}${product.imageUrl}`
                  : "/images/shopping.png"
              }
              alt={product.name}
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h2 className="title">{product.name}</h2>

          {/* RATING */}
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 4 ? "filled" : ""} />
            ))}
          </div>

          {/* PRICE */}
          <div className="price-box">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="sale">Rs {product.salePrice}</span>
                <span className="old">Rs {product.price}</span>
                <span className="discount">
                  {getSalePercentage()}% OFF
                </span>
              </>
            ) : (
              <span className="normal">Rs {product.price}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="desc">
            {product.description || "No description available"}
          </p>

          {/* STOCK */}
          <p className="stock">
            Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
          </p>

          {/* QUANTITY */}
          <div className="qty-box">
            <button onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            {/* <button
              className="cart-btn"
              onClick={() => addToCart({
  id: product._id || product.id,   // 🔥 MUST be unique
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: qty
})}
            >
              Add to Cart
            </button> */}
            <button
  className="cart-btn"
  onClick={() => {
    const finalPrice =
      product.salePrice && product.salePrice < product.price
        ? product.salePrice
        : product.price;

    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: finalPrice,              // ✅ SALE PRICE FIXED
      originalPrice: product.price,   // ✅ OPTIONAL (for UI)
      image: product.imageUrl
        ? `${backend_url}${product.imageUrl}`
        : "/images/shopping.png",     // ✅ IMAGE FIXED
      quantity: qty,                 // ✅ QUANTITY FIXED
    });
  }}
>
  Add to Cart
</button>

            <button
              className="buy-btn"
              onClick={() => buyNow(product, qty)}
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;