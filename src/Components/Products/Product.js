import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./img-14.jpg";
import * as actionCreators from "../../Store/actions/index";
import "./product.css";

function Product(props) {
  const product = { ...props.data };
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const sendProduct = () => {
    props.setCurProduct(product);
  };
  const handleCart = () => {
    setAdded(true);
    const payload = {
      ...props.data,
      quantity: quantity,
    };
    props.addToCart(payload);
  };
  return (
    <div className="col-lg-3 col-md-6">
      <div className="productitem mb-30 ">
        <Link
          to={{
            pathname: props.match.url + "/" + props.data.pid,
          }}
          onClick={sendProduct}
        >
          <Image src={image} className="p-image" fluid />
        </Link>
        <div className="product-text-dt">
          <p>
            {props.data.status === "available" ? "In Stock" : "Out of Stock"}
          </p>
          <h4>{props.data.name}</h4>
          <div className="product-price">
            ₹{props.data.aprice} <span> ₹{props.data.sprice}</span>
          </div>
          <div className="qtycart">
            <div className="quantity buttons_added">
              <input
                type="button"
                value="-"
                onClick={decrement}
                className="minus minus-btn"
              />
              <input
                type="number"
                step={1}
                name="quantity"
                value={quantity}
                className="input-text qty text"
              />
              <input
                type="button"
                value="+"
                onClick={increment}
                className="plus plus-btn"
              />
            </div>
          </div>
          {!added ? (
            <button className="add-cart-btn hover-btn" onClick={handleCart}>
              <i className="uil uil-shopping-cart-alt"></i>Add to Cart
            </button>
          ) : (
            <button className="added-cart-btn">
              <i className="uil uil-shopping-cart-alt"></i>Added (Go to Cart)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(actionCreators.addToCart(payload)),
    setCurProduct: (payload) => dispatch(actionCreators.setCurProduct(payload)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Product));
