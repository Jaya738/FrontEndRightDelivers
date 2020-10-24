import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import MblNavbar from "../Common/MblNavbar";
import * as actionCreators from "../../Store/actions/index";
import { baseUrl } from "../../config";
import {fetchWithTimeout} from '../../api';
import Slots from '../Slots/Slots';
import './Package.css';

function CheckoutPackage(props) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("1");
  const [selectedDay, setSelectedDay] = useState("Today");
  const [scheduled,setScheduled] = useState(false)
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const history = useHistory();
  const isAuth = props.config.isAuth;
  const [showNote, setShowNote] = useState(false);
  const [enablePlaceOrder, setEnablePlaceOrder] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMode, setPaymentMode] = useState("pickup")
  const [chargeData, setChargeData] = useState({});

  const handlePayment = (mode) => {
    setPaymentMode(mode)
  }
  const getCharges = async () => {
    const chargesUrl = baseUrl + "packages/charges";
    const data = {
        start: {
            lat: props.pickAddress?.lat || "",
            lon: props.pickAddress?.lon || ""
        },
        end: {
            lat: props.dropAddress?.lat || "",
            lon: props.dropAddress?.lon || ""
        },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rkey: props.config.authData.rKey,
        dkey: props.config.authData.dKey,
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetchWithTimeout(chargesUrl, options)).json();

    if (res && res.status === 1) {
      setChargeData(res)
      return;
    }
    if (res) {
      props.setError(res.msg);
      props.setShowToast(true);
      // setEnablePlaceOrder(true);
      setTimeout(() => {
        props.hideCheckout()
        props.setShowToast(false)
      }, 1000);
      return;
    }
  }
  useEffect(()=>{
    getCharges()
  },[])

   const postCheckoutData = async (payload) => {
    const checkoutUrl= baseUrl + "packages/placeorder";
    const data = {
      name: props.config.authData.user.name,
      mobile: props.config.authData.user.mbl,
      bid: props.config.curBranch ? props.config.curBranch.bid : "",
      token: chargeData.token,
      type: props.selectedCategory,
      method: 1,
      single: chargeData.single,
      round: chargeData.round,
      ride: props.isOneWay ? "1": "2",
      start: props.pickAddress,
      drop: props.dropAddress,
      scheduled: scheduled,
      slot: selectedTimeSlot,
      scheduledDay: selectedDay === "Today" ? 1 : 2,
      note: savedNote,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rkey: props.config.authData.rKey,
        dkey: props.config.authData.dKey,
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetchWithTimeout(checkoutUrl, options)).json();

    if (res && res.status === 1) {
      props.setError(res.msg);
      props.setShowToast(true);
      setOrderPlaced(true);
      props.addNewOrder(res.order);
      setTimeout(() => {
        props.setShowToast(false);
        props.clearCart();
        setOrderPlaced(false);
        setEnablePlaceOrder(true);
        history.push("/");
      }, 1000);
      return;
    }
    if (res) {
      props.setError(res.msg);
      props.setShowToast(true);
      setEnablePlaceOrder(true);
      setTimeout(() => props.setShowToast(false), 1000);
      return;
    }
  };
  const handlePlaceOrder = () => {
    if (enablePlaceOrder) {
      setEnablePlaceOrder(false);
      if (props.pickAddress === null || props.dropAddress === null) {
        props.setError("Please add pickup address and drop address to deliver your package");
        props.setShowToast(true);
        setTimeout(() => props.hideCheckout(), 1500);
      }
      else if (props.selectedCategory === null){
        props.setError("Please pick the package category");
        props.setShowToast(true);
        setTimeout(() => props.hideCheckout(), 1500);
      }
      else {
        postCheckoutData();
      }
    } else {
      props.setError("Processing your order. Please wait...");
      props.setShowToast(true);
    }
  };

  
  return (
    <div className="package-checkout-section">
      <div className="all-product-grid mar-15 container mb-5">
      <div className="package-delivery-charge-outer">
        <div className="package-delivery-type">
          *{props.isOneWay ? "One Way" : "Round Trip"}
        </div>
        <div className="package-delivery-charge">
          <div className="package-delivery-charge-head">
            Delivery charges
          </div>
          <div className="package-delivery-charge-amount">
          ₹ {props.isOneWay ? chargeData?.single || "0" : chargeData?.round || "0" }
          </div>
        </div>
      </div>
      
      {/* Slots */}
      <Slots 
        handleDayChange={(day) => setSelectedDay(day)} 
        handleSlotChange={(slot)=> setSelectedTimeSlot(slot)} 
        scheduled={scheduled} 
        setScheduled={(foo)=>setScheduled(foo)} 
      />

      {/* Note Section */}
      <div
        className="d-flex"
        style={{ justifyContent: "space-evenly", paddingTop: "15px" }}
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
      {/* Payment Options */}
        <div className="pdpt-bg p-4 mb-4">
          <div className="pdpt-title">
            <h4>Payment mode</h4>
          </div>
          <div className="rpt100 mt-3">
            <ul className="radio--group-inline-container_1">
              <li>
                <div className="radio-item_1" onClick={() => handlePayment("pickup")}>
                  <input
                    id="pickupCustomer"
                    value="pickup"
                    name="paymentPickup"
                    type="radio"
                    checked= {paymentMode === "pickup"}
                  />
                  <label htmlFor="pickupCustomer" className="radio-label_1">
                    Pick Up
                  </label>
                </div>
              </li>
              <li>
                <div className="radio-item_1" onClick={() => handlePayment("drop")}>
                  <input
                    id="dropCustomer"
                    value="drop"
                    name="paymentDrop"
                    type="radio"
                    checked = {paymentMode === "drop"}
                  />
                  <label htmlFor="dropCustomer" className="radio-label_1">
                    Drop
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      

      {/* Place Order Btn   */}
        <div className="container d-block">
          <div
            className="justify-content-center w-100"
            style={{ position: "fixed", bottom: "0px", left: "0px" }}
          >
            <Link
              to={
                isAuth
                  ? { pathname: `${props.match.url}` }
                  : { pathname: "/login" }
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
)(withRouter(CheckoutPackage));
