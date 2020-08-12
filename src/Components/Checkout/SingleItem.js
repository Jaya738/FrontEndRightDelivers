import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";

import image from "../Products/img-14.jpg";
function SingleItem(props) {
  const product = props.product;
  const removeItem = () => {
    props.deleteCartItem(props.product.pid);
  };
  return (
    <div>
      <div className="cart-item border_radius">
        <div className="cart-product-img">
          <img
            src={
              props.product.img
                ? "https://rightdelivers.in/uploads/restaurants/items/" +
                  props.product.img
                : image
            }
            alt=""
          />
        </div>
        <div className="cart-text">
          <h4>{product.name}  {product.quantity > 1 && "x " + product.quantity}</h4>
          <div className="cart-item-price">
            ₹{product.aprice} <span>₹{product.sprice}</span>
          </div>
          <button type="button" onClick={removeItem} className="cart-close-btn">
            <i className="uil uil-multiply"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartItem: (pid) => dispatch(actionCreators.deleteCartItem(pid)),
  };
};
export default connect(null, mapDispatchToProps)(SingleItem);
