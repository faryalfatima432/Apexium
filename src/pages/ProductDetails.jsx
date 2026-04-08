
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { CartContext } from "../context/CartContext";
// import "./ProductDetails.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   const [product, setProduct] = useState(null);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [qty, setQty] = useState(1);

//   const backend_url =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [res1, res2] = await Promise.all([
//           fetch(`${backend_url}/api/products/${id}`),
//           fetch(`${backend_url}/api/products`)
//         ]);

//         const productData = await res1.json();
//         const allProducts = await res2.json();

//         setProduct(productData);

//         // ✅ SHOW ALL PRODUCTS (EXCEPT CURRENT)
//         const shuffled = allProducts
//           .filter((p) => p._id !== productData._id)
//           .sort(() => 0.5 - Math.random());

//         setSimilarProducts(shuffled.slice(0, 6));

//       } catch (err) {
//         console.log(err);
//       } finally {
//         setTimeout(() => setLoading(false), 400);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const finalPrice =
//     product?.salePrice && product.salePrice < product.price
//       ? product.salePrice
//       : product?.price;

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

//   if (loading) return <div className="loader">Loading...</div>;
//   if (!product) return <div className="loader">Product not found</div>;

//   return (
//     <div className="container mt-4">

//       {/* MAIN SECTION */}
//       <div className="row g-4 bg-white p-3 rounded shadow-sm main-product-section">

//         {/* IMAGE */}
//         <div className="col-lg-5 col-md-6 col-12">
//           <div className="product-image-container">
//             <img
//               src={
//                 product.imageUrl
//                   ? `${backend_url}${product.imageUrl}`
//                   : "/images/shopping.png"
//               }
//               className="img-fluid rounded"
//               alt={product.name}
//             />
//           </div>
//         </div>

//         {/* DETAILS */}
//         <div className="col-lg-7 col-md-6 col-12 d-flex flex-column product-details-section">

//           <h3 className="fw-bold product-title">{product.name}</h3>

//           {/* RATING */}
//           <div className="d-flex align-items-center gap-2 my-2">
//             {[1,2,3,4,5].map(i => (
//               <FaStar
//                 key={i}
//                 className={i <= Math.round(product.rating || 0)
//                   ? "text-warning"
//                   : "text-muted"}
//               />
//             ))}
//             <span className="text-muted">({product.rating || 0})</span>
//           </div>

//           {/* PRICE */}
//           <div className="mb-3 price-section">
//             {product.salePrice ? (
//               <>
//                 <span className="text-danger fs-4 fw-bold me-2 sale-price">
//                   Rs {product.salePrice}
//                 </span>
//                 <span className="text-muted text-decoration-line-through original-price">
//                   Rs {product.price}
//                 </span>
//               </>
//             ) : (
//               <span className="fs-4 fw-bold text-dark regular-price">
//                 Rs {product.price}
//               </span>
//             )}
//           </div>

//           {/* STOCK */}
//           <p className={`stock-status ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
//             {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
//           </p>

//           {/* DESCRIPTION - MOBILE ONLY */}
//           <div className="product-description-mobile">
//             <h6 className="fw-bold mb-2">Description</h6>
//             <p className="text-muted">
//               {product.description || "No description available"}
//             </p>
//           </div>

//           {/* QUANTITY */}
//           <div className="d-flex align-items-center gap-2 my-3 quantity-section">
//             <button
//               className="btn btn-outline-dark qty-btn"
//               onClick={() => setQty(q => (q > 1 ? q - 1 : 1))}
//               disabled={product.stock <= 0}
//             >-</button>
//             <span className="px-3 qty-display">{qty}</span>
//             <button
//               className="btn btn-outline-dark qty-btn"
//               onClick={() => setQty(q => q + 1)}
//               disabled={product.stock <= 0 || qty >= product.stock}
//             >+</button>
//           </div>

//           {/* BUTTONS - DESKTOP */}
//           <div className="action-buttons-desktop d-flex gap-3">
//             <button
//               className="btn-action btn-add-to-cart flex-fill"
//               onClick={handleAddToCart}
//               disabled={product.stock <= 0}
//             >
//               <i className="fas fa-shopping-cart me-2"></i>Add to Cart
//             </button>
//             <button className="btn-action btn-buy-now flex-fill">
//               <i className="fas fa-bolt me-2"></i>Buy Now
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* DESCRIPTION - DESKTOP ONLY */}
//       <div className="description-desktop mt-4 bg-white p-4 rounded shadow-sm">
//         <h5 className="fw-bold mb-3">Product Description</h5>
//         <p className="text-muted description-text">
//           {product.description || "No description available"}
//         </p>
//       </div>

//       {/* SIMILAR PRODUCTS */}
//       <div className="similar-products-section mt-5">
//         <h4 className="fw-bold mb-4 text-center">Similar Products</h4>

//         <div className="row g-3">
//           {similarProducts.map((p) => (
//             <div key={p._id} className="col-xl-2 col-lg-3 col-md-4 col-6">
//               <div
//                 className="similar-product-card"
//                 onClick={() => navigate(`/product/${p._id}`)}
//               >
//                 {/* IMAGE */}
//                 <div className="similar-card-img-box">
//                   <img
//                     src={
//                       p.imageUrl
//                         ? `${backend_url}${p.imageUrl}`
//                         : "/images/shopping.png"
//                     }
//                     alt={p.name}
//                   />

//                   {/* SALE BADGE */}
//                   {p.salePrice && (
//                     <span className="sale-badge">SALE</span>
//                   )}
//                 </div>

//                 {/* INFO */}
//                 <div className="similar-card-info">
//                   <h6 className="similar-product-name">{p.name}</h6>

//                   <div className="similar-price">
//                     {p.salePrice ? (
//                       <>
//                         <span className="sale-price-small">Rs {p.salePrice}</span>
//                         <span className="old-price-small">Rs {p.price}</span>
//                       </>
//                     ) : (
//                       <span className="normal-price-small">Rs {p.price}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* STICKY BUTTONS - MOBILE ONLY */}
//       <div className="sticky-buttons-mobile">
//         <div className="d-flex gap-2 p-3">
//           <button
//             className="btn-action btn-add-to-cart flex-fill"
//             onClick={handleAddToCart}
//             disabled={product.stock <= 0}
//           >
//             <i className="fas fa-shopping-cart me-2"></i>Add to Cart
//           </button>
//           <button className="btn-action btn-buy-now flex-fill">
//             <i className="fas fa-bolt me-2"></i>Buy Now
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

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

        const filtered = allProducts
          .filter(p => p._id !== productData._id)
          .sort(() => 0.5 - Math.random());

        setSimilarProducts(filtered.slice(0, 6));

      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();
  }, [id]);

  const finalPrice =
    product?.salePrice && product.salePrice < product.price
      ? product.salePrice
      : product?.price;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.imageUrl
        ? `${backend_url}${product.imageUrl}`
        : "/images/shopping.png",
      quantity: qty,
    });

    navigate("/cart");
  };

  if (loading) return <div className="loader">Loading product...</div>;
  if (!product) return <div className="loader">Product not found</div>;

  return (
    <div className="container product-page">

      {/* MAIN */}
      <div className="row main-box">

        {/* IMAGE */}
        <div className="col-lg-5">
          <div className="img-box">
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
        <div className="col-lg-7 details-box">

          <h2>{product.name}</h2>

          {/* RATING */}
          <div className="rating">
            {[1,2,3,4,5].map(i => (
              <FaStar
                key={i}
                className={i <= Math.round(product.rating || 4)
                  ? "active"
                  : ""}
              />
            ))}
            <span>({product.rating || 4})</span>
          </div>

          {/* PRICE */}
          <div className="price">
            {product.salePrice ? (
              <>
                <span className="sale">Rs {product.salePrice}</span>
                <span className="old">Rs {product.price}</span>
              </>
            ) : (
              <span className="normal">Rs {product.price}</span>
            )}
          </div>

          {/* STOCK */}
          <p className={product.stock > 0 ? "stock ok" : "stock out"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* DESCRIPTION (MOBILE FIRST) */}
          <div className="desc mobile">
            {product.description}
          </div>

          {/* QTY */}
          <div className="qty">
            <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          {/* BUTTONS */}
          <div className="buttons desktop">
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION DESKTOP */}
      <div className="desc desktop">
        <h4>Description</h4>
        <p>{product.description}</p>
      </div>

      {/* SIMILAR */}
      <div className="similar">
        <h3>Similar Products</h3>

        <div className="row">
          {similarProducts.map(p => (
            <div key={p._id} className="col-md-3 col-6">
              <div
                className="card-sim"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={
                    p.imageUrl
                      ? `${backend_url}${p.imageUrl}`
                      : "/images/shopping.png"
                  }
                  alt={p.name}
                />

                <h6>{p.name}</h6>

                <div className="price-small">
                  {p.salePrice ? (
                    <>
                      <span className="sale">Rs {p.salePrice}</span>
                      <span className="old">Rs {p.price}</span>
                    </>
                  ) : (
                    <span className="normal">Rs {p.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE FIXED BUTTONS */}
      <div className="mobile-bar">
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="buy-btn">Buy</button>
      </div>

    </div>
  );
};

export default ProductDetails;
