import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ p, backend_url }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const finalPrice =
    p.salePrice && p.salePrice < p.price ? p.salePrice : p.price;

  const salePercent =
    p.salePrice && p.salePrice < p.price
      ? Math.round(((p.price - p.salePrice) / p.price) * 100)
      : 0;

  const imageUrl = p.imageUrl
    ? `${backend_url}${p.imageUrl}`
    : "/images/shopping.png";

  const handleAddToCart = () => {
    addToCart({
      id: p._id,
      name: p.name,
      price: finalPrice,
      originalPrice: p.price,
      image: imageUrl,
      quantity: 1,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/cart");
  };

  const handleDetails = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${p._id}`);
  };

  return (
    <div className="product-card">

      {/* IMAGE */}
      <div className="similar-img">
        <img  src={imageUrl} alt={p.name}  />

        {salePercent > 0 && (
          <span className="product-badge">-{salePercent}%</span>
        )}
      </div>

      {/* CONTENT */}
      <div className="product-body">

        {/* TITLE */}
        <h4 className="product-title">{p.name}</h4>

        {/* RATING */}
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < 4 ? "star active" : "star"} />
          ))}
        </div>

        {/* PRICE */}
        <div className="product-price">
          {p.salePrice ? (
            <>
              <span className="sale">Rs {p.salePrice}</span>
              <span className="old">Rs {p.price}</span>
            </>
          ) : (
            <span className="normal">Rs {p.price}</span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="product-buttons">
          <button className="add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="details-btn" onClick={handleDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;