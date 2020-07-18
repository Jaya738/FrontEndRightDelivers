import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import CheckoutItems from "./CheckoutItems.js";
import CheckOutAddress from "./CheckoutAddress";
import * as actionCreators from "../../Store/actions/index";

function Summary(props) {
  const backUrl = props.location.pathname;
  const isAuth = props.config.isAuth;
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = () => {
    props.setBackUrl(backUrl);
    let checkoutCart = [];
    props.cart.cartItems.forEach((citem) => {
      checkoutCart.push({ pid: citem.pid, quantity: citem.quantity });
    });
    const payload = {
      cart: checkoutCart,
      address: props.address.curAddress,
      rKey: props.config.authData.rKey,
      dKey: props.config.authData.dKey,
    };
    if (!checkoutCart.length > 0) {
      setError("Your Cart is empty!");
      setShow(true);
    } else if (Object.keys(props.address.curAddress).length === 0) {
      setError("Select a delivery address!");
      setShow(true);
    } else {
      postCheckoutData(payload);
    }
  };
  const apiUrl =
    "https://api.rightdelivers.in/user/api/v1/restaurants/placeorder";
  const postCheckoutData = async (payload) => {
    const data = {
      account: "8466061231",
      bid: props.config.curBranch.bid,
      rid: props.cart.cartItems[0].rid,
      total: props.cart.checkoutData.subTotal,
      fees: 0,
      method: 1,
      note: "",
      address_id: payload.address.id, // if alrdy added address exists then send address_id or else send address which is in bottom in this
      name: "Jay",
      mobile: "8466061231",
      items: payload.cart,
      address: { ...payload.address, type: 1 },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rkey: payload.rKey,
        dkey: payload.dKey,
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl, options)).json();

    if (res && res.status === 1) {
      setError(res.msg);
      setShow(true);
      console.log(res);
      return;
    }
    if (res) {
      setError(res.msg);
      console.log(res);
      setShow(true);
      return;
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const notifModal = (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>{error}</Modal.Header>
    </Modal>
  );
  return (
    <div className="all-product-grid" style={{ marginTop: "70px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <CheckOutAddress />
            {notifModal}
            <div className="pdpt-bg p-4 mb-4">
              <div className="pdpt-title">
                <h4>Select Payment Option</h4>
              </div>
              <div class="rpt100 mt-3">
                <ul class="radio--group-inline-container_1">
                  <li>
                    <div class="radio-item_1">
                      <input
                        id="cashondelivery1"
                        value="cashondelivery"
                        name="paymentmethod"
                        type="radio"
                        checked
                        data-minimum="50.0"
                      />
                      <label for="cashondelivery1" className="radio-label_1">
                        Cash on Delivery
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="radio-item_1">
                      <input
                        id="card1"
                        value="card"
                        name="paymentmethod"
                        type="radio"
                        disabled
                        data-minimum="50.0"
                      />
                      <label for="card1" className="radio-label_1">
                        Credit / Debit Card
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="d-none d-sm-block">
                <Link
                  to={
                    isAuth
                      ? { pathname: `${props.match.url}` }
                      : { pathname: "/login", state: { backUrl } }
                  }
                  className="next-btn16 hover-btn"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <CheckoutItems />
          </div>
          <div className="container d-block d-sm-none">
            <div className="d-flex justify-content-center m-3">
              <Link
                to={
                  isAuth
                    ? { pathname: `${props.match.url}` }
                    : { pathname: "/login", state: { backUrl } }
                }
                className="next-btn16 hover-btn w-100 text-center"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
    address: state.address,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Summary));
