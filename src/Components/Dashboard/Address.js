import MblNavbar from "../Common/MblNavbar";
import { useHistory, withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import * as geolib from "geolib";
import { Toast } from "react-bootstrap";
import "../Checkout/Checkout.css";
import noAddress from "../addressEmpty.svg";
import * as actionCreators from "../../Store/actions/index";
import { geolocated } from "react-geolocated";

function CheckoutAddress(props) {
  let addressList = props.address.addressList || [];
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const mapData = props.config.curBranch;

  //const [distanceR, setDistanceR] = useState(0);
  const [isServicable, setIsServicable] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleAddAddress = () => {
    history.push("/addaddress");
  };

  const editAddress = (address) => {
    //setLoginData(address);
    setAddNew(true);
    deleteAddress(address);
  };
  const deleteAddress = (address) => {
    addressList.splice(
      addressList.findIndex(function (i) {
        return i.id === address.id;
      }),
      1
    );
  };

  const showAddress = (
    <div className="row" style={{ marginTop: "6vh" }}>
      <div className="col-lg-12 col-md-12">
        <div className="pdpt-bg">
          <div className="pdpt-title">
            <h4>Manage Your Address</h4>
          </div>
          <div className="address-body">
            <button className="next-btn16 hover-btn" onClick={handleAddAddress}>
              Add New Address
            </button>
            <div className="address-spacing">
              {addressList.length > 0 ? (
                addressList.map((address) => (
                  <div key={address.id} className="address-item">
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
                          <div className="action-btn" onClick={deleteAddress}>
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

function Address(props) {
  const history = useHistory();
  return (
    <div>
      <MblNavbar heading="Address" back={() => history.goBack()} />
      <CheckoutAddress {...props} />
    </div>
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
  })(Address)
);
