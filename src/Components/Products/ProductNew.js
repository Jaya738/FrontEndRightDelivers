import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./img-14.jpg";
import * as actionCreators from "../../Store/actions/index";
import "./product.css";

function ProductNew(props) {
  const product = { ...props.data };
  const [canAdd, setCanAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity(quantity + 1);
    const payload = {
      pid: product.pid,
      quantity: quantity + 1,
    };
    props.setQuantity(payload);
  };
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const payload = {
        pid: product.pid,
        quantity: quantity - 1,
      };
      props.setQuantity(payload);
    }
  };
  const sendProduct = () => {
    props.setCurProduct(product);
  };
  const handleCart = () => {
    const payload = {
      ...props.data,
      quantity: quantity,
    };
    if (props.cart.cartItems.length > 0) {
      if (props.cart.cartItems[0].rid === props.data.rid) {
        setAdded(true);
        props.addToCart(payload);
      } else {
        setShow(true);
      }
    } else {
      setAdded(true);
      props.addToCart(payload);
    }
  };

  const handleClose = () => {
    setAdded(false);
    setShow(false);
  };
  const handleClearAndAdd = () => {
    setAdded(true);
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
    <div className="col col-12 d-block d-sm-none">
      {notifModal}

      <div className="row product-item-mbl mb-2 align-items-center no-gutters">
        <div className="col col-3">
          <Link
            to={{
              pathname: props.match.url + "/" + props.data.pid,
            }}
            onClick={sendProduct}
          >
            <Image src={image} className="image-mbl" fluid />
          </Link>
        </div>
        <div className="col col-6">
          <div className="product-text-dt-mbl">
            <p>{props.data.status === "available" ? "In Stock" : " "}</p>
            <h5>{props.data.name}</h5>
            <div className="product-price-mbl">
              ₹{props.data.aprice} <span> ₹{props.data.sprice}</span>
            </div>
          </div>
        </div>
        <div className="col col-3">
          {!added ? (
            <button className="add-cart-btn-mbl" onClick={handleCart}>
              <span>+ ADD</span>
            </button>
          ) : (
            <div className="quantity">
              <input
                type="button"
                value="-"
                onClick={decrement}
                className="btns-qty"
              />
              <input
                type="text"
                disabled
                name="quantity"
                value={quantity}
                className="text-qty"
              />
              <input
                type="button"
                value="+"
                onClick={increment}
                className="btns-qty"
              />
            </div>
          )}
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
    setQuantity: (payload) => dispatch(actionCreators.setQuantity(payload)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductNew)
);
