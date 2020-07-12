import React from "react";
import { connect } from "react-redux";
import prodImg from "../Products/img-14.jpg";
import * as actionCreators from "../../Store/actions/index";

function CartItem(props) {
  const quantity = props.product.quantity;
  const derivedAprice = props.product.quantity * props.product.aprice;
  const derivedSprice = props.product.quantity * props.product.sprice;
  const increment = () => {
    const payload = {
      pid: props.product.pid,
      quantity: quantity + 1,
    };
    props.setQuantity(payload);
  };
  const decrement = () => {
    if (quantity === 1) {
      props.deleteCartItem(props.product.pid);
      return;
    }
    const payload = {
      pid: props.product.pid,
      quantity: quantity > 0 ? quantity - 1 : quantity,
    };
    props.setQuantity(payload);
  };
  const removeItem = () => {
    props.deleteCartItem(props.product.pid);
  };
  return (
    <div>
      <div className="cart-item">
        <div className="cart-product-img">
          <img
            src={
              props.product.img
                ? "https://rightdelivers.in/uploads/restaurants/items/" +
                  props.product.img
                : prodImg
            }
            alt="image"
          />
          {/*<div className="offer-badge">6% OFF</div>*/}
        </div>
        <div className="cart-text">
          <h4>{props.product.name}</h4>
          <div className="cart-radio">
            <ul className="kggrm-now">
              <li>
                <input type="radio" id="a1" name="cart1" />
                <label for="a1">0.50</label>
              </li>
              <li>
                <input type="radio" id="a2" name="cart1" />
                <label for="a2">1kg</label>
              </li>
            </ul>
          </div>
          <div className="qty-group">
            <div className="quantity buttons_added">
              <input
                type="button"
                value="-"
                onClick={decrement}
                className="minus minus-btn"
              />
              <input
                type="text"
                name="quantity"
                disabled
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
            <div className="cart-item-price">
              ₹{derivedAprice} <span> ₹{derivedSprice}</span>
            </div>
          </div>

          <button type="button" onClick={removeItem} className="cart-close-btn">
            <i className="uil uil-multiply"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    state: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setQuantity: (payload) => dispatch(actionCreators.setQuantity(payload)),
    deleteCartItem: (pid) => dispatch(actionCreators.deleteCartItem(pid)),
    getDerivedPrice: (pid) => dispatch(actionCreators.getDerivedPrice(pid)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
