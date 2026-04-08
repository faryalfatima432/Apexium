import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ p, backend_url }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Sale %
  const getSalePercentage = () => {
    if (p.salePrice && p.salePrice < p.price) {
      return Math.round(((p.price - p.salePrice) / p.price) * 100);
    }
    return 0;
  };

  // ✅ Final price
  const finalPrice =
    p.salePrice && p.salePrice < p.price ? p.salePrice : p.price;

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

  return (
    <div className="product-card">

      {/* IMAGE */}
      <div className="product-img">
        <img
          src={
            p.imageUrl
              ? `${backend_url}${p.imageUrl}`
              : "/images/shopping.png"
          }
          alt={p.name}
        />
        {getSalePercentage() > 0 && (
          <span className="badge">-{getSalePercentage()}%</span>
        )}
      </div>

      {/* INFO */}
      <div className="product-info">
        <h4 className="font-weight-bold fs-5">{p.name}</h4>

        {/* DESCRIPTION (LIMITED) */}
        {/* <p className="product-desc">
          {p.description || "No description available"}
        </p> */}

        {/* RATING */}
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < 4 ? "active" : ""} />
          ))}
        </div>

        {/* PRICE */}
        <div className="price">
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
        <button className="add-btn btn btn-outline-dark" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button
          className="details-btn"
          onClick={() => navigate(`/product/${p._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;