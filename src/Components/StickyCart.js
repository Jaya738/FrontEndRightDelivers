import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import "./cart.css";
import "./More/More.css";

function StickyCart(props) {
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
      amountA +=
        (parseInt(item.itemPrice) + parseInt(item.extraPrice)) * item.quantity;
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
  return (
    <div className="d-block d-sm-none footer-more-area">
      <Link to="/checkout">
        <div
          style={{
            color: "white",
            padding: "2vh",
          }}
        >
          <span style={{ fontSize: "14px", float: "left", padding: "5px 5px" }}>
            ₹{price.totalPrice}{" "}
            <span style={{ fontSize: "14px", padding: "" }}>
              + Delivery Charges
            </span>
          </span>
          <span style={{ float: "right", padding: "5px" }}>
            <span style={{ fontSize: "14px" }}>
              Checkout
              <i
                className="fa fa-angle-right"
                style={{ fontSize: "15px", padding: "0px 8px" }}
              ></i>
            </span>
          </span>
        </div>
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
