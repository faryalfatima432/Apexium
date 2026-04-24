// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { CartContext } from "../context/CartContext";
// import ProductCard from "../components/ProductCard";
// import "./ProductDetails.css";

// const ProductDetails = () => {

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   const [product, setProduct] = useState(null);
//   const [sameProducts, setSameProducts] = useState([]);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [similarLoading, setSimilarLoading] = useState(false);

//   const backend_url =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {

//     const fetchData = async () => {
//       setLoading(true);
//       setSimilarLoading(true);

//       try {

//         const [res1, res2] = await Promise.all([
//           fetch(`${backend_url}/api/products/${id}`),
//           fetch(`${backend_url}/api/products`)
//         ]);

//         const productData = await res1.json();
//         const allProducts = await res2.json();

//         setProduct(productData);

//         /* SIMILAR PRODUCTS - like Cart page */
//         const similar = allProducts
//           .filter((p) => p._id !== productData._id)
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 8);

//         setSameProducts(similar);

//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//         setSimilarLoading(false);
//       }
//     };

//     fetchData();

//     window.scrollTo(0, 0);

//   }, [id]);

//   const finalPrice =
//     product?.salePrice && product.salePrice < product.price
//       ? product.salePrice
//       : product?.price;

//   /* ADD TO CART */
//   const handleAddToCart = () => {

//     addToCart({
//       id: product._id,
//       name: product.name,
//       price: finalPrice,
//       image: product.imageUrl
//         ? `${backend_url}${product.imageUrl}`
//         : "/images/shopping.png",
//       quantity: qty,
//     });

//     navigate("/cart");
//   };

//   /* BUY NOW */
//   const handleBuyNow = () => {

//     addToCart({
//       id: product._id,
//       name: product.name,
//       price: finalPrice,
//       image: product.imageUrl
//         ? `${backend_url}${product.imageUrl}`
//         : "/images/shopping.png",
//       quantity: qty,
//     });

//     navigate("/checkout");
//   };

//   if (loading) return <div className="loader">Loading...</div>;
//   if (!product) return <div className="loader">Product not found</div>;

//   return (
//     <div className="product-page">

//       {/* TOP SECTION */}
//       <div className="product-main">

//         {/* IMAGE */}
//         <div className="product_image">
//           <img 
//             src={
//               product.imageUrl
//                 ? `${backend_url}${product.imageUrl}`
//                 : "/images/shopping.png"
//             }
//             alt={product.name}
//           />
//         </div>

//         {/* INFO */}
//         <div className="product-info">

//           <h2>{product.name}</h2>

//           {/* RATING */}
//           <div className="rating">
//             {[1,2,3,4,5].map(i => (
//               <FaStar
//                 key={i}
//                 className={i <= (product.rating || 4) ? "active" : ""}
//               />
//             ))}
//             <span>({product.rating || 4})</span>
//           </div>

//           {/* PRICE */}
//           <div className="price-box">

//             {product.salePrice ? (
//               <>
//                 <span className="sale">Rs {product.salePrice}</span>
//                 <span className="old">Rs {product.price}</span>
//               </>
//             ) : (
//               <span className="normal">Rs {product.price}</span>
//             )}

//           </div>

//           {/* STOCK */}
//           <p className={product.stock > 0 ? "stock ok" : "stock out"}>
//             {product.stock > 0 ? "In Stock" : "Out of Stock"}
//           </p>

//           {/* QTY */}
//           <div className="qty-box">

//             <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)}>
//               -
//             </button>

//             <span>{qty}</span>

//             <button onClick={() => setQty(q => q + 1)}>
//               +
//             </button>

//           </div>

//           {/* BUTTONS */}
//           <div className="product-buttons">

//             <button className="cart-btn" onClick={handleAddToCart}>
//               Add to Cart
//             </button>

//             <button className="buy-btn" onClick={handleBuyNow}>
//               Buy Now
//             </button>

//           </div>

//         </div>
//       </div>

//       {/* DESCRIPTION */}
//       <div className="description-box">

//         <h3>Product Description</h3>

//         <p>{product.description}</p>

//       </div>

//       {/* SIMILAR PRODUCTS - like Cart page */}
//       {similarLoading ? (
//         <p className="loading">Loading...</p>
//       ) : (
//         sameProducts.length > 0 && (
//           <div className="similar-products-section">
//             <h3>You Might Also Like</h3>
//             <div className="similar-products-grid">
//               {sameProducts.map((p) => (
//                 <ProductCard key={p._id} p={p} backend_url={backend_url} />
//               ))}
//             </div>
//           </div>
//         )
//       )}

//       {/* MOBILE BUTTON BAR */}
//       <div className="mobile-buy-bar">

//         <button onClick={handleAddToCart}>
//           Add to Cart
//         </button>

//         <button onClick={handleBuyNow}>
//           Buy Now
//         </button>

//       </div>

//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [sameProducts, setSameProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${backend_url}/api/products/${id}`),
          fetch(`${backend_url}/api/products`)
        ]);

        const productData = await res1.json();
        const allProducts = await res2.json();

        setProduct(productData);

        const similar = allProducts
          .filter((p) => p._id !== productData._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

        setSameProducts(similar);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);

  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!product) return <div className="loader">Product not found</div>;

  const finalPrice =
    product.salePrice && product.salePrice < product.price
      ? product.salePrice
      : product.price;

  const salePercent =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const imageUrl = product.imageUrl
    ? `${backend_url}${product.imageUrl}`
    : "/images/shopping.png";

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: finalPrice,
      image: imageUrl,
      quantity: qty,
    });
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: finalPrice,
      image: imageUrl,
      quantity: qty,
    });
    navigate("/checkout");
  };

  return (
    <div className="product-page">

      <div className="product-main">

        {/* IMAGE */}
        <div className="product-image-box">
          <img src={imageUrl} alt={product.name} />

          {salePercent > 0 && (
            <span className="sale-badge">-{salePercent}%</span>
          )}
        </div>

        {/* INFO */}
        <div className="product-info">

          <h2>{product.name}</h2>

          <div className="rating">
            {[1,2,3,4,5].map(i => (
              <FaStar key={i}
                className={i <= (product.rating || 4) ? "active" : ""}
              />
            ))}
            <span>({product.rating || 4})</span>
          </div>

          <div className="price-box">
            {salePercent > 0 ? (
              <>
                <span className="sale">Rs {product.salePrice}</span>
                <span className="old">Rs {product.price}</span>
              </>
            ) : (
              <span className="normal">Rs {product.price}</span>
            )}
          </div>

          <p className={product.stock > 0 ? "stock ok" : "stock out"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* QTY */}
          <div className="qty-box">
            <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="product-buttons desktop-buttons">
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="description-box">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {/* SIMILAR PRODUCTS */}
      {sameProducts.length > 0 && (
        <div className="similar-products-section">
          <h3>You Might Also Like</h3>

          <div className="similar-products-grid">
            {sameProducts.map((p) => (
              <ProductCard key={p._id} p={p} backend_url={backend_url} />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE BAR ONLY */}
      <div className="mobile-buy-bar">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>

    </div>
  );
};

export default ProductDetails;