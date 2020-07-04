import React from "react";
import ProductCategoryItem from "./ProductCategoryItem";
import "./product.css";

export default function ProductCategoryList(props) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="container horizontal-scrollable">
      <div className="row text-center">
        {items.map((item) => (
          <ProductCategoryItem data={item} />
        ))}
      </div>
    </div>
  );
}
