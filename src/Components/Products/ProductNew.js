import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./img-14.jpg";
import * as actionCreators from "../../Store/actions/index";
import "./product.css";

function ProductNew(props) {
  const product = { ...props.data };
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const found = props.cart.cartItems.filter((el) => el.pid === product.pid);
    if (found.length > 0) {
      console.log(found[0]);
      setAdded(true);
      setQuantity(found[0].quantity);
    }
  }, [props.cart.cartItems]);
  const increment = () => {
    setQuantity(quantity + 1);
    const payload = {
      pid: product.pid,
      quantity: quantity + 1,
    };
    props.setQuantity(payload);
  };
  const decrement = () => {
    if (quantity === 1) {
      props.deleteCartItem(product.pid);
      setAdded(false);
      return;
    }
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

      <div className="row product-item-mbl mb-3 pt-3 pb-3 align-items-center no-gutters"  style={{boxShadow: "0px 3px 4px 2px rgba(0, 0, 0, .14)"}}>
        <div className="col col-3">
          <Link
            to={{
              pathname: props.match.url + "/" + props.data.pid,
            }}
            onClick={sendProduct}
            className=""
          >

           {/* <span
              class="notify-badge"
              style={{
                backgroundColor:
                  props.data.type === 1
                    ? "lightgreen"
                    : props.data.type === 2
                    ? "brown"
                    : "red",
              }}
            >
              props.data.type === 1
                ? "Veg"
                : props.data.type === 2
                ? "Egg"
              : "Non-veg"
            </span>
*/}
           <span className="notify-badge"><span style={{border:"2px solid black",padding:"0px 2px",height:"8px",borderRadius:"3px",marginRight:"5px"}}><i class="fas fa-circle x c3 dot" style={{	
		fontSize:"8px",
                color:
                  props.data.type === 1
                    ? "lightgreen"
                    : props.data.type === 2
                    ? "brown"
                    : "red",
              }}></i></span>
		</span>
            <Image
              src={
                props.data.img
                  ? "https://rightdelivers.in/uploads/restaurants/items/" +
                    props.data.img
                  : image
              }
		style={{padding:"9px"}}
            fluid
              
            />
          </Link>
        </div>
        <div className="col col-6">
          <div className="product-text-dt-mbl">

            <span style={{fontSize:"14px"}}>{props.data.name}</span>

	<br /><span  style={{color:"grey"}}>{props.data.sdesc}</span>
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
    deleteCartItem: (pid) => dispatch(actionCreators.deleteCartItem(pid)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductNew)
);
