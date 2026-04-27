// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./CategoryCard.css";

// const CategoryCard = ({ category, products, backend_url }) => {

//   const navigate = useNavigate();

//   // 🔥 GET PRODUCT IMAGE OF CATEGORY
//   const product = products.find((p) => {
//     const catId =
//       typeof p.category === "object" ? p.category._id : p.category;

//     return catId === category._id;
//   });

//   const image =
//     product?.imageUrl
//       ? `${backend_url}${product.imageUrl}`
//       : category.image
//       ? `${backend_url}${category.image}`
//       : "/images/shopping.png";

//   return (
//     <div
//       className="category-card"
//       onClick={() => navigate(`/category/${category._id}`)}
//     >
//       <div className="category-img">
//         <img src={image} alt={category.name} />
//       </div>

//       <p className="category-name">{category.name}</p>
//     </div>
//   );
// };

// export default CategoryCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category, products, backend_url }) => {

  const navigate = useNavigate();

  // FIND PRODUCT OF THIS CATEGORY (FIXED)
  const product = products.find((p) => {
    const catId =
      typeof p.category === "object" ? p.category._id : p.category;
    return catId === category._id;
  });

  const image = product?.imageUrl
    ? `${backend_url}${product.imageUrl}`
    : "/images/shopping.png";

  return (
    <div
      className="category-card"
      onClick={() => navigate(`/category/${category._id}`)}
    >
      <img src={image} alt={category.name} />
      <h4>{category.name}</h4>
    </div>
  );
};

export default CategoryCard;