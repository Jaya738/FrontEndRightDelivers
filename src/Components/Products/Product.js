import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./img-14.jpg";
import * as actionCreators from "../../Store/actions/index";
import "./product.css";

function Product(props) {
  const product = { ...props.data };
  const [show, setShow] = useState(false);
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
    if (props.cart.cartItems.length > 0) {
      if (props.cart.cartItems[0].rid === props.data.rid) {
        props.addToCart(payload);
      } else {
        console.log("diff rest");
        setShow(true);
      }
    } else {
      props.addToCart(payload);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleClearAndAdd = () => {
    const payload = {
      ...props.data,
      quantity: quantity,
    };
    props.clearAndAdd(payload);
    setShow(false);
  };
  const notifModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Body>
        You have chosen item from different Restaurant. Click Update cart to
        clear the cart and add item from current restaurant.
      </Modal.Body>
      <Modal.Footer>
        <button className="added-cart-btn" onClick={handleClose}>
          Close
        </button>
        <button className="add-cart-btn hover-btn" onClick={handleClearAndAdd}>
          Update Cart
        </button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <div className="col col-6 col-lg-3 col-md-4 col-sm-4 d-none d-sm-block">
      {notifModal}
      <div className="productitem mb-30 ">
        <Link
          to={{
            pathname: props.match.url + "/" + props.data.pid,
          }}
          onClick={sendProduct}
        >
          <Image
            src={
              props.data.img
                ? "https://rightdelivers.in/uploads/restaurants/items/" +
                  props.data.img
                : image
            }
            className="image-item-desk"
            fluid
          />
        </Link>
        <div className="product-text-dt">
          <p>{props.data.status === "available" ? "In Stock" : " "}</p>
          <h4>{props.data.name}</h4>
          <div className="product-price">
            ₹{props.data.aprice} <span> ₹{props.data.sprice}</span>
          </div>
          <div className="row" style={{ display: "flex" }}>
            <div className="col col-sm-5 col-7">
              <div className="qtycart">
                <div className="quantity buttons_added">
                  <input
                    type="button"
                    value="-"
                    onClick={decrement}
                    className="minus minus-btn"
                  />
                  <input
                    type="text"
                    disabled
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
            </div>
            <div className="col col-sm-7 col-5">
              {!added ? (
                <button className="add-cart-btn hover-btn" onClick={handleCart}>
                  <i className="uil uil-shopping-cart-alt"></i>
                  <span>Add to cart</span>
                </button>
              ) : (
                <button className="added-cart-btn">
                  <i className="uil uil-check-circle"></i>
                  <span>Added</span>
                </button>
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
    product: state.product,
    config: state.config,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(actionCreators.addToCart(payload)),
    clearAndAdd: (payload) => dispatch(actionCreators.clearAndAdd(payload)),
    setCurProduct: (payload) => dispatch(actionCreators.setCurProduct(payload)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
