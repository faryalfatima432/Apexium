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

//         const filtered = allProducts
//           .filter(p => p._id !== productData._id)
//           .sort(() => 0.5 - Math.random());

//         setSimilarProducts(filtered.slice(0, 6));

//       } catch (err) {
//         console.log(err);
//       } finally {
//         setTimeout(() => setLoading(false), 300);
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

//   if (loading) return <div className="loader">Loading product...</div>;
//   if (!product) return <div className="loader">Product not found</div>;

//   return (
//     <div className="container product-page">

//       {/* MAIN */}
//       <div className="row main-box">

//         {/* IMAGE */}
//         <div className="col-lg-5">
//           <div className="img-box">
//             <img
//               src={
//                 product.imageUrl
//                   ? `${backend_url}${product.imageUrl}`
//                   : "/images/shopping.png"
//               }
//               alt={product.name}
//             />
//           </div>
//         </div>

//         {/* DETAILS */}
//         <div className="col-lg-7 details-box">

//           <h2>{product.name}</h2>

//           {/* RATING */}
//           <div className="rating">
//             {[1,2,3,4,5].map(i => (
//               <FaStar
//                 key={i}
//                 className={i <= Math.round(product.rating || 4)
//                   ? "active"
//                   : ""}
//               />
//             ))}
//             <span>({product.rating || 4})</span>
//           </div>

//           {/* PRICE */}
//           <div className="price">
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

//           {/* DESCRIPTION (MOBILE FIRST) */}
//           <div className="desc mobile">
//             {product.description}
//           </div>

//           {/* QTY */}
//           <div className="qty">
//             <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)}>-</button>
//             <span>{qty}</span>
//             <button onClick={() => setQty(q => q + 1)}>+</button>
//           </div>

//           {/* BUTTONS */}
//           <div className="buttons desktop">
//             <button className="cart-btn" onClick={handleAddToCart}>
//               Add to Cart
//             </button>
//             <button className="buy-btn">Buy Now</button>
//           </div>
//         </div>
//       </div>

//       {/* DESCRIPTION DESKTOP */}
//       <div className="desc desktop">
//         <h4>Description</h4>
//         <p>{product.description}</p>
//       </div>

//       {/* SIMILAR */}
//       <div className="similar">
//         <h3>Similar Products</h3>

//         <div className="row">
//           {similarProducts.map(p => (
//             <div key={p._id} className="col-md-3 col-6">
//               <div
//                 className="card-sim"
//                 onClick={() => navigate(`/product/${p._id}`)}
//               >
//                 <img
//                   src={
//                     p.imageUrl
//                       ? `${backend_url}${p.imageUrl}`
//                       : "/images/shopping.png"
//                   }
//                   alt={p.name}
//                 />

//                 <h6>{p.name}</h6>

//                 <div className="price-small">
//                   {p.salePrice ? (
//                     <>
//                       <span className="sale">Rs {p.salePrice}</span>
//                       <span className="old">Rs {p.price}</span>
//                     </>
//                   ) : (
//                     <span className="normal">Rs {p.price}</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MOBILE FIXED BUTTONS */}
//       <div className="mobile-bar">
//         <button className="cart-btn" onClick={handleAddToCart}>
//           Add to Cart
//         </button>
//         <button className="buy-btn">Buy</button>
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
  const [sameProducts, setSameProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setSimilarLoading(true);

      try {

        const [res1, res2] = await Promise.all([
          fetch(`${backend_url}/api/products/${id}`),
          fetch(`${backend_url}/api/products`)
        ]);

        const productData = await res1.json();
        const allProducts = await res2.json();

        setProduct(productData);

        /* SIMILAR PRODUCTS - like Cart page */
        const similar = allProducts
          .filter((p) => p._id !== productData._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

        setSameProducts(similar);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setSimilarLoading(false);
      }
    };

    fetchData();

    window.scrollTo(0, 0);

  }, [id]);

  const finalPrice =
    product?.salePrice && product.salePrice < product.price
      ? product.salePrice
      : product?.price;

  /* ADD TO CART */
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

  /* BUY NOW */
  const handleBuyNow = () => {

    addToCart({
      id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.imageUrl
        ? `${backend_url}${product.imageUrl}`
        : "/images/shopping.png",
      quantity: qty,
    });

    navigate("/checkout");
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!product) return <div className="loader">Product not found</div>;

  return (
    <div className="product-page">

      {/* TOP SECTION */}
      <div className="product-main">

        {/* IMAGE */}
        <div className="product-image">
          <img className="w-100"
            src={
              product.imageUrl
                ? `${backend_url}${product.imageUrl}`
                : "/images/shopping.png"
            }
            alt={product.name}
          />
        </div>

        {/* INFO */}
        <div className="product-info">

          <h2>{product.name}</h2>

          {/* RATING */}
          <div className="rating">
            {[1,2,3,4,5].map(i => (
              <FaStar
                key={i}
                className={i <= (product.rating || 4) ? "active" : ""}
              />
            ))}
            <span>({product.rating || 4})</span>
          </div>

          {/* PRICE */}
          <div className="price-box">

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

          {/* QTY */}
          <div className="qty-box">

            <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)}>
              -
            </button>

            <span>{qty}</span>

            <button onClick={() => setQty(q => q + 1)}>
              +
            </button>

          </div>

          {/* BUTTONS */}
          <div className="product-buttons">

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

        <h3>Product Description</h3>

        <p>{product.description}</p>

      </div>

      {/* SIMILAR PRODUCTS - like Cart page */}
      {similarLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        sameProducts.length > 0 && (
          <div className="similar-products-section">
            <h3>You Might Also Like</h3>
            <div className="similar-products-grid">
              {sameProducts.map((p) => (
                <div
                  key={p._id}
                  className="similar-product-card"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <div className="similar-img">
                    <img
                      src={
                        p.imageUrl
                          ? `${backend_url}${p.imageUrl}`
                          : "/images/shopping.png"
                      }
                      alt={p.name}
                    />
                  </div>
                  <div className="similar-info">
                    <p>{p.name}</p>
                    {p.salePrice ? (
                      <div className="price-row">
                        <span className="sale">Rs {p.salePrice}</span>
                        <span className="old">Rs {p.price}</span>
                      </div>
                    ) : (
                      <span className="sale">Rs {p.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* MOBILE BUTTON BAR */}
      <div className="mobile-buy-bar">

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button onClick={handleBuyNow}>
          Buy Now
        </button>

      </div>

    </div>
  );
};

export default ProductDetails;