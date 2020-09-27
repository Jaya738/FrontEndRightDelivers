import React from "react";
import { connect } from "react-redux";
import prodImg from "../Products/img-14.jpg";
import * as actionCreators from "../../Store/actions/index";
import { imgUrl } from "../../config";

function CartItem(props) {
  const quantity = props.product.quantity;
  const derivedAprice = props.product.quantity * props.product.itemPrice;
  const derivedSprice = props.product.quantity * props.product.sprice;
  const extraPrice = props.product.extraPrice;
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
                ? imgUrl + "restaurants/items/" + props.product.img
                : prodImg
            }
            alt="ProductImage"
          />
          {/* <div className="offer-badge">6% OFF</div> */}
        </div>
        <div className="cart-text">
          <div className="d-flex">
            <h4>{props.product.name}</h4>
            {props.product.custmz === 1 && (
              <span style={{ fontSize: "10px", margin: "-2px 5px" }}>
                ( {props.product.options} )
              </span>
            )}
            <button
              type="button"
              onClick={removeItem}
              className="cart-close-btn align-self-start"
            >
              <i className="uil uil-multiply"></i>
            </button>
          </div>
          <div className="d-flex">
            {props.product.custmz === 1 &&
              props.product.extras.map((extra, index) => (
                <label
                  key={index}
                  style={{
                    padding: "2px 4px",
                    backgroundColor: "#2f4f4f",
                    color: "white",
                    borderRadius: "3px",
                    fontWeight: "600",
                    fontSize: "10px",
                    marginRight: "3px",
                    marginTop: "5px",
                  }}
                >
                  {extra.n}
                </label>
              ))}
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
              ₹{derivedAprice}{" "}
              {props.product.custmz === 1 && props.product.extras.length > 0 && (
                <div
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "grey",
                  }}
                >
                  {" "}
                  + ₹{extraPrice}
                </div>
              )}
            </div>
          </div>
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
