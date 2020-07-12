import React from "react";
import "./product.css";

export default function ProductCategoryList(props) {
  const items = props.rcats;
  return (
    <div>
      <div className="scrollmenu">
        <p
          className={
            props.selected === 0
              ? "category-product-item cp-active"
              : "category-product-item"
          }
          onClick={props.handleReset}
        >
          All
        </p>
        {items.map((item) => (
          <p
            className={
              props.selected === item.id
                ? "category-product-item cp-active"
                : "category-product-item"
            }
            key={item.id}
            onClick={() => props.handleSelectItem(item.id)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}
