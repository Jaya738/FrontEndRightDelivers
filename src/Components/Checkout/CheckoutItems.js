import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import SingleItem from "./SingleItem";
import Spinner from "../Common/Spinner";
import { baseUrl } from "../../config";

function CheckoutItems(props) {
  const [loading, setLoading] = useState(true);
  const dummyPrice = {
    totalPrice: 0,
    subTotal: 0,
    deliveryCharge: 0,
    savings: 0,
  };
  const [price, setPrice] = useState(props.cart.checkoutData);
  useEffect(() => {
    getDeliveryCharge();
    updatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const chargeApi = baseUrl + "restaurants/charges";
  const getDeliveryCharge = async () => {
    const data = {
      lat: props.address.curAddress ? props.address.curAddress.lat : "",
      lon: props.address.curAddress ? props.address.curAddress.lon : "",
      rid: props.cart.cartItems.length > 0 ? props.cart.cartItems[0].rid : "",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      },
      body: JSON.stringify(data),
    };
    const res = await (await fetch(chargeApi, options)).json();

    if (res && res.status === 0) {
      setLoading(false);
      return;
    }
    if (res && res.status === 1) {
      //setFees(res.charges);
      setPrice({ ...price, deliveryCharge: parseFloat(res.charges) });
      props.setCheckoutData({
        ...props.cart.checkoutData,
        deliveryCharge: parseFloat(res.charges),
        token: res.token,
        distance: res.kms,
      });
      setLoading(false);
      return;
    }
  };
  const updatePrice = () => {
    let amountA = 0;
    let amountS = 0;
    props.cart.cartItems.map((item) => {
      amountA +=
        (parseInt(item.itemPrice) + parseInt(item.extraPrice)) * item.quantity;
      amountS += item.sprice * item.quantity;
      return amountA;
    });

    setPrice({
      ...price,
      subTotal: amountA,
      savings: amountS - amountA,
      totalPrice: parseFloat(price.deliveryCharge) + amountA,
    });

    return () => {
      setPrice(dummyPrice);
    };
  };
  useEffect(() => {
    updatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.cart.cartItems,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...props.cart.cartItems.map((item) => item.quantity),
    props.cart.checkoutData,
  ]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="pdpt-bg mt-0">
            <div className="pdpt-title">
              <h4>Order Summary</h4>
            </div>
            <div className="right-cart-dt-body">
              {props.cart.cartItems.map((product) => (
                <SingleItem product={product} key={product.pid} />
              ))}
            </div>
            <div className="total-checkout-group">
              <div className="cart-total-dil">
                <h4>Cart Total</h4>
                <span>₹{price.subTotal}</span>
              </div>
              <div className="cart-total-dil pt-3">
                <h4>Fees</h4>
                <span>₹{price.deliveryCharge}</span>
              </div>
            </div>
            {/* <div className="cart-total-dil saving-total ">
              <h4>Total Saving</h4>
              <span>₹{price.savings}</span>
            </div> */}
            <div className="main-total-cart mb-5">
              <h2>Total</h2>
              <span>₹{price.totalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
    address: state.address,
    cart: state.cart,
    restaurant: state.restaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCheckoutData: (payload) =>
      dispatch(actionCreators.setCheckoutData(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItems);
