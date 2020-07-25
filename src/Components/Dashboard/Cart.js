import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import MblNavbar from "../MblNavbar";
import * as actionCreators from "../../Store/actions/index";
import { withRouter } from "react-router-dom";

function Cart(props) {
  const history = useHistory();
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
    let delivery = 40;
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
    <div>
      <MblNavbar heading="Cart" back={() => history.goBack()} />
      <div className="side-cart-header p-3  mr-3 ml-3 rounded">
        <div className="main-cart-title">
          My Cart <span>({props.state.cartItems.length})</span>
        </div>
      </div>

      <div className="rounded">
        <div className="">
          {props.state.cartItems.map((product) => (
            <CartItem product={product} />
          ))}
        </div>
      </div>
      <div className="">
        <div className="cart-total-dil saving-total ">
          <h4>Total Saving</h4>
          <span>₹{price.savings}</span>
        </div>
        <div className="main-total-cart">
          <h2>Total</h2>
          <span>₹{price.totalPrice}</span>
        </div>
        <div className="checkout-cart">
          <Link to="/checkout" className="cart-checkout-btn hover-btn">
            Checkout
          </Link>
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
    setQuantity: (quantity) => dispatch(actionCreators.setQuantity(quantity)),
    setCheckoutData: (payload) =>
      dispatch(actionCreators.setCheckoutData(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
