import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as geolib from "geolib";
import { Toast, Image } from "react-bootstrap";
import "./Checkout.css";
import * as actionCreators from "../../Store/actions/index";
import { geolocated } from "react-geolocated";
import { useHistory } from "react-router-dom";
import noAddress from "../addressEmpty.svg";
import {fetchWithTimeout} from '../../api';
import { baseUrl } from "../../config";

function CheckoutAddress(props) {
  let addressList = props.address.addressList || [];
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const mapData = props.config.curBranch;
  const [isServicable, setIsServicable] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});

  const goToSummary = () => {
    if (selectedAddress.lat) {
      calculateService(selectedAddress.lat, selectedAddress.lon);
      if (isServicable) {
        if (props.cart.checkoutData.totalPrice > 0) {
          history.push("/checkout/summary");
        } else {
          setError("Cart is empty !");
          setShowToast(true);
        }
      } else {
        setError("We can't deliver to your location.");
        setShowToast(true);
      }
    } else {
      setError("Select an Address");
      setShowToast(true);
    }
  };
  const calculateService = (lat, lon) => {
    const pointsPolygon = [];
    mapData.points.map((point) =>
      pointsPolygon.push({ latitude: point[1], longitude: point[0] })
    );
    const isInPolygon = geolib.isPointInPolygon(
      { latitude: lat, longitude: lon },
      pointsPolygon
    );
    setIsServicable(isInPolygon);
  };

  useEffect(() => {
    if (selectedAddress) {
      props.setCurAddress(selectedAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNew, selectedAddress]);
  const handleAddAddress = () => {
    history.push("/addaddress");
  };

  const editAddress = (address) => {
    setAddNew(true);
    deleteAddress(address);
  };
  const deleteAddress = async (address) => {
    const apiUrl = baseUrl + "delete/address";
    const data = {
      address_id: address.id
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

    const res = await (await fetchWithTimeout(apiUrl, options, 3000)).json();

    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      props.setAddressList(res.address)
      return;
    }
    if (res) {
      setError(res.msg);
      setShowToast(true);
      return;
    }
  }

  const showAddress = (
    <div className="row" style={{ marginTop: "6vh" }}>
      <div className="col-lg-12 col-md-12">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>Select Delivery Address</h4>
          </div>
          <div className="address-body">
            <button className="next-btn16 hover-btn" onClick={handleAddAddress}>
              Add New Address
            </button>
            <div className="address-spacing">
              {addressList.length > 0 ? (
                addressList.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className="address-item"
                  >
                    <i
                      style={{
                        backgroundColor: "#2f4f4f",
                        border: "2px solid #2f4f4f",
                        borderRadius: "5px",
                        marginRight: "10px",
                        fontSize: "20px",
                        color: "white",
                      }}
                      className={
                        selectedAddress.id === address.id
                          ? "fa fa-check-square"
                          : "fa fa-square"
                      }
                    ></i>

                    <div className="address-dt-all">
                      <h4>
                        {address.name}{" "}
                        <i
                          style={{ color: "#d30013" }}
                          className={
                            address.type === 1
                              ? "fa fa-home"
                              : address.type === 2
                              ? "fa fa-briefcase"
                              : "fa fa-map"
                          }
                        ></i>
                      </h4>{" "}
                      <p>
                        {address.flat}, {address.area}
                      </p>
                      <ul className="action-btns">
                        <li>
                          <div
                            className="action-btn"
                            onClick={() => editAddress(address)}
                          >
                            <i className="uil uil-edit"></i>
                          </div>
                        </li>
                        <li>
                          <div className="action-btn" onClick={()=> deleteAddress(address)}>
                            <i className="uil uil-trash-alt"></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Image src={noAddress} fluid />
                  <p
                    style={{
                      color: "#d30013",
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Start adding your address
                  </p>
                </div>
              )}
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <div className="address-btns">
                  <div className="">
                    <button
                      onClick={() => history.push("/dashboard/cart")}
                      className="save-btn14 hover-btn"
                    >
                      Back
                    </button>
                  </div>
                  <div className="col">
                    <button
                      onClick={goToSummary}
                      className="next-btn16 hover-btn float-right"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
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
    <>
      {errorToast}
      <div>{showAddress}</div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
    config: state.config,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurAddress: (payload) => dispatch(actionCreators.setCurAddress(payload)),
    setAddressList: (payload) =>
      dispatch(actionCreators.setAddressList(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(CheckoutAddress)
);
