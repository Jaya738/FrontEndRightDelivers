import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import "./cart.css";

function StickyCart(props) {
  const cartCount = props.cartCount;
  const dummyPrice = {
    totalPrice: 0,
    subTotal: 0,
    deliveryCharge: 0,
    savings: 0,
  };
  const [price, setPrice] = useState(dummyPrice);
  useEffect(() => {
    let amountA = 0;
    let amountS = 0;
    props.state.cartItems.map((item) => {
      amountA += item.aprice * item.quantity;
      amountS += item.sprice * item.quantity;
      return amountA;
    });
    let delivery = 0;
    if (amountA > 500 || amountA === 0) {
      delivery = 0;
    }
    setPrice({
      ...price,
      subTotal: amountA,
      savings: amountS - amountA,
      totalPrice: amountA + delivery,
      deliveryCharge: delivery,
    });
    return () => {
      const payload = {
        ...price,
        subTotal: amountA,
        savings: amountS - amountA,
        totalPrice: amountA + delivery,
        deliveryCharge: delivery,
      };
      props.setCheckoutData(payload);
      setPrice(dummyPrice);
    };
  }, [
    props.state.cartItems,
    ...props.state.cartItems.map((item) => item.quantity),
  ]);
  return (
    <div className="d-block d-sm-none mobileShow ">
      <Link to="/checkout" className="optionLinks">
        <i className="fa fa-shopping-basket iconWishlist"></i>
        <span className="checkout-text">Checkout</span>
        {/* <span className="notiCount1">{cartCount}</span> */}
      </Link>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cart.cartItems.length,
    state: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setQuantity: (quantity) => dispatch(actionCreators.setQuantity(quantity)),
    setCheckoutData: (payload) =>
      dispatch(actionCreators.setCheckoutData(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StickyCart));
