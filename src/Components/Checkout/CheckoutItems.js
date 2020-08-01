import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import SingleItem from "./SingleItem";

function CheckoutItems(props) {
  const dummyPrice = {
    totalPrice: 0,
    subTotal: 0,
    deliveryCharge: 0,
    savings: 0,
  };
  const [price, setPrice] = useState(props.cart.checkoutData);
  useEffect(() => {
    let amountA = 0;
    let amountS = 0;
    props.cart.cartItems.map((item) => {
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
      setPrice(dummyPrice);
    };
  }, [
    props.cart.cartItems,
    ...props.cart.cartItems.map((item) => item.quantity),
  ]);
  return (
    <div>
      <div className="pdpt-bg mt-0">
        <div className="pdpt-title">
          <h4>Order Summary</h4>
        </div>
        <div className="right-cart-dt-body">
          {props.cart.cartItems.map((product) => (
            <SingleItem product={product} />
          ))}
        </div>
        <div className="total-checkout-group">
          <div className="cart-total-dil">
            <h4>Right Delivers</h4>
            <span>₹{price.totalPrice}</span>
          </div>
          <div className="cart-total-dil pt-3">
            <h4>Fees</h4>
            <span>₹{price.deliveryCharge}</span>
          </div>
        </div>
        <div className="cart-total-dil saving-total ">
          <h4>Total Saving</h4>
          <span>₹{price.savings}</span>
        </div>
        <div className="main-total-cart">
          <h2>Total</h2>
          <span>₹{price.totalPrice}</span>
        </div>
        <div className="payment-secure">
          <i className="uil uil-padlock"></i>Secure checkout
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(CheckoutItems);
