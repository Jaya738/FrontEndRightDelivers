import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import MblNavbar from "../Common/MblNavbar";
import CheckoutItems from "./CheckoutItems.js";
import * as actionCreators from "../../Store/actions/index";
import { baseUrl } from "../../config";
import {fetchWithTimeout} from '../../api';
import Slots from '../Slots/Slots';

function Summary(props) {
  const scheduledServices = [2,3,4,5,6,7,8,9,10,11,12]
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("1");
  const [selectedDay, setSelectedDay] = useState("Today");
  const [scheduled,setScheduled] = useState(false)
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const history = useHistory();
  const backUrl = props.location.pathname;
  const isAuth = props.config.isAuth;
  const [show, setShowToast] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [enablePlaceOrder, setEnablePlaceOrder] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
    if(props.cart.cartItems.length === 0){
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.cart.cartItems])
  const handlePlaceOrder = () => {
    if (enablePlaceOrder) {
      setEnablePlaceOrder(false);
      props.setBackUrl(backUrl);
      let checkoutCart = [];
      props.cart.cartItems.forEach((citem) => {
        checkoutCart.push({
          pid: citem.pid,
          quantity: citem.quantity,
          itemPrice: citem.itemPrice,
          extras: citem.extras || [],
          option: citem.options || "",
        });
      });
      const payload = {
        cart: checkoutCart,
        address: props.address.curAddress,
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      };
      if (!checkoutCart.length > 0) {
        setError("Your Cart is empty!");
        setShowToast(true);
      } else if (Object.keys(props.address.curAddress).length === 0) {
        setError("Select a delivery address!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } else {
        postCheckoutData(payload);
      }
    } else {
      setError("Processing your order. Please wait...");
      setShowToast(true);
    }
  };
  const apiUrl = baseUrl + "restaurants/placeorder";
  const postCheckoutData = async (payload) => {
    const data = {
      account: props.config.authData.phone,
      bid: props.config.curBranch ? props.config.curBranch.bid : "",
      rid: props.cart.cartItems.length > 0 ? props.cart.cartItems[0].rid : "",
      total: props.cart.checkoutData.subTotal,
      fees: props.cart.checkoutData.deliveryCharge,
      token: props.cart.checkoutData.token,
      type: props.config.curService.type,
      method: 1,
      address_id: payload.address.id,
      scheduled: scheduled,
      slot: selectedTimeSlot,
      scheduledDay: selectedDay === "Today" ? 1 : 2,
      name: props.config.authData.user.name,
      mobile: props.config.authData.user.mbl,
      items: payload.cart,
      address: payload.address,
      note: savedNote,
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

    const res = await (await fetchWithTimeout(apiUrl, options)).json();

    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      //setEnablePlaceOrder(true);
      setOrderPlaced(true);
      props.addNewOrder(res.order);
      setTimeout(() => {
        setShowToast(false);
        props.clearCart();
        setOrderPlaced(false);
        setEnablePlaceOrder(true);
        history.push("/");
      }, 1000);
      return;
    }
    if (res) {
      setError(res.msg);
      setShowToast(true);
      setEnablePlaceOrder(true);
      setTimeout(() => setShowToast(false), 1000);
      return;
    }
  };

  const handlePayment = () => {
    return;
  };

  const notifModal = (
    <Toast
      onClose={() => setShowToast(false)}
      show={show}
      delay={2000}
      autohide
      style={{
        position: "fixed",
        bottom: "20vh",
        zIndex: "999",
        textAlign: "center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Toast.Body
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          borderBottom: "none",
          textAlign: "center",
          padding: "0.2rem 0.8rem",
        }}
      >
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Body>
    </Toast>
  );
  return (
    <div className="">
      <MblNavbar heading="Checkout" back={() => history.goBack()} />
      <div className="all-product-grid mar-15 container mb-5">
        {notifModal}

      {/* Payment Options */}
        <div className="pdpt-bg p-4 mb-4">
          <div className="pdpt-title">
            <h4>Select Payment Option</h4>
          </div>
          <div className="rpt100 mt-3">
            <ul className="radio--group-inline-container_1">
              <li>
                <div className="radio-item_1">
                  <input
                    id="cashondelivery1"
                    value="cashondelivery"
                    name="paymentmethod"
                    type="radio"
                    onChange={handlePayment}
                    checked
                    data-minimum="50.0"
                  />
                  <label htmlFor="cashondelivery1" className="radio-label_1">
                    Cash on Delivery
                  </label>
                </div>
              </li>
              <li>
                <div className="radio-item_1">
                  <input
                    id="card1"
                    value="card"
                    name="paymentmethod"
                    type="radio"
                    disabled
                    onChange={handlePayment}
                    data-minimum="50.0"
                  />
                  <label htmlFor="card1" className="radio-label_1">
                    Credit / Debit Card
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
       
      {/* Slots */}
      {/* Add Service ID here */}
      {props.cart?.cartItems.length > 0 && scheduledServices.includes(props.cart?.cartItems[0]?.stype || 0) && (
        <Slots 
          handleDayChange={(day) => setSelectedDay(day)} 
          handleSlotChange={(slot)=> setSelectedTimeSlot(slot)} 
          scheduled={scheduled} 
          setScheduled={(foo)=>setScheduled(foo)} 
        />
      )}

      {/* Note Section */}
      <div
        className="d-flex"
        style={{ justifyContent: "space-evenly", paddingBottom: "10px" }}
      >
        <div className="d-flex">
          <input
            id="note"
            name="note"
            type="text"
            placeholder="Leave a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoComplete="off"
            className="form-control"
          />
        </div>
        <div className="d-flex">
          <button
            onClick={() => {
              setShowNote(true);
              setSavedNote(note);
              setNote("");
            }}
            className="w-100 note-btn"
          >
            Add
          </button>
        </div>
      </div>
      {showNote && savedNote.length > 0 && (
        <div
          style={{
            margin: "15px",
            backgroundColor: "#2f4f4f",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          className="note"
        >
          Note: {savedNote}
        </div>
      )}

      {/* Checkout items */}
        <div className="col-lg-4 col-md-5">
          <CheckoutItems />
        </div>

      {/* Place Order Btn   */}
        <div className="container d-block d-sm-none">
          <div
            className="justify-content-center w-100"
            style={{ position: "fixed", bottom: "0px", left: "0px" }}
          >
            <Link
              to={
                isAuth
                  ? { pathname: `${props.match.url}` }
                  : { pathname: "/login", state: { backUrl } }
              }
              className="next-btn16 hover-btn w-100 text-center"
              style={{ backgroundColor: orderPlaced && "#5cb85c" }}
              onClick={handlePlaceOrder}
            >
              {enablePlaceOrder
                ? "Place Order"
                : orderPlaced
                ? "Order Placed"
                : "Processing..."}
            </Link>
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
    restaurant: state.restaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
    clearCart: () => dispatch(actionCreators.clearCart()),
    addNewOrder: (payload) => dispatch(actionCreators.addNewOrder(payload)),
    setCheckoutData: (payload) =>
      dispatch(actionCreators.setCheckoutData(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Summary));
