import React from "react";
import ProductCategoryItem from "./ProductCategoryItem";
import "./product.css";

export default function ProductCategoryList(props) {
  const items = [
    "Biryani",
    "Ice Cream",
    "Fried Piece",
    "Fish",
    "Prawns",
    "Starters",
    "Full Meal",
    "Mutton",
    "Chicken",
    "Grilled Chicken",
  ];
  return (
    <div>
      <div class="scrollmenu">
        {items.map((item) => (
          <p className="category-product-item">{item}</p>
        ))}
      </div>
    </div>
  );
}
