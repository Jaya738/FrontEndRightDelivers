import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import cartIcon from "./noCart.svg";
import CartItem from "./CartItem";
import MblNavbar from "../Common/MblNavbar";
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
      amountA += (item.itemPrice + item.extraPrice) * item.quantity;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.state.cartItems,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...props.state.cartItems.map((item) => item.quantity),
  ]);
  const myCart = (
    <>
      <div className="mr-3 ml-3 pt-5 rounded">
        <div className="">
          {props.state.cartItems.map((product) => (
            <CartItem product={product} />
          ))}
        </div>
      </div>
      <div className="mr-3 ml-3 rounded">
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
    </>
  );
  const noItemsInCart = (
    <div className="mar-15 p-5">
      <Image className="mt-5" src={cartIcon} fluid />
      <p
        style={{
          color: "#2f4f4f",
          margin: "10%",
          paddingTop: "10%",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        {" "}
        No Items in Cart{" "}
      </p>
    </div>
  );
  return (
    <div>
      <MblNavbar heading="Cart" back={() => history.goBack()} />
      {props.state.cartItems.length > 0 ? myCart : noItemsInCart}
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
