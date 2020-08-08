import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import Map from "../Maps/Map";
import { Toast } from "react-bootstrap";
import * as geolib from "geolib";
import "./Checkout.css";
import * as actionCreators from "../../Store/actions/index";
import { geolocated } from "react-geolocated";
import { useHistory } from "react-router-dom";

function CheckoutAddress(props) {
  let addressList = props.address.addressList || [];
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const mapData = props.config.curBranch;
  const [distanceR, setDistanceR] = useState(0);
  const [isServicable, setIsServicable] = useState(true);
  const [cords, setCords] = useState({
    lat: mapData.lat,
    lng: mapData.long,
  });

  const emptyLoginData = {
    id: "",
    name: props.config.authData.user.name,
    type: 1,
    phone: props.config.authData.phone,
    flat: "",
    street: "",
    // address: "",
    area: "",
    city: "",
    lat: mapData.lat,
    lng: mapData.long,
  };
  const [addressMap, setAddressMap] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [loginData, setLoginData] = useState(emptyLoginData);
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
    const dist = geolib.getDistance(
      { latitude: mapData.lat, longitude: mapData.long }, //Restaurant location
      { latitude: lat, longitude: lon } //restaurant location
    );
    setDistanceR((dist / 1000).toFixed(2));
    setIsServicable(isInPolygon);
    console.log("live cords " + lat + " , " + lon);
    console.log("Restaurant cords " + mapData.lat + " , " + mapData.long);
    console.log((dist / 1000).toFixed(1));
    console.log(isInPolygon);
    // if (!isInPolygon) {
    //   setError("We can't deliver to your location.");
    //   setShowToast(true);
    // } else {
    //   setError("Service Available");
    //   setShowToast(true);
    // }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    if (isServicable) {
      e.preventDefault();
      if (validateForm()) {
        setAddNew(false);
        props.addNewAddress(loginData);
      }
    } else {
      e.preventDefault();
      setError("We can't deliver to your location.");
      setShowToast(true);
    }
  };

  const validateForm = () => {
    return true;
  };
  useEffect(() => {
    if (addNew) {
      const sid = shortid.generate();
      setLoginData({ ...loginData, id: sid });
    }
    if (selectedAddress) {
      props.setCurAddress(selectedAddress);
    }
  }, [addNew, selectedAddress]);
  const handleAddAddress = () => {
    // setCords({ lat: props.coords.latitude, lng: props.coords.longitude });
    setLoginData(emptyLoginData);
    console.log(props);
    props.coords
      ? setCords({ lat: props.coords.latitude, lng: props.coords.longitude })
      : console.log("no location");
    setAddNew(true);
  };
  const handleBack = () => {
    setAddNew(false);
  };
  const editAddress = (address) => {
    setLoginData(address);
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
  const handleAddressFromMap = (data) => {
    setLoginData({
      ...loginData,
      area: data.address,
      // street: data.area,
      city: data.area,
      lat: data.mapPosition.lat,
      lon: data.mapPosition.lng,
    });
    console.log(loginData);
    calculateService(data.mapPosition.lat, data.mapPosition.lng);
  };
  const showAddress = (
    <div className="row">
      {/* <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-location-point"></i>My Address
          </h4>
        </div>
      </div> */}
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
              {addressList &&
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
                          <div className="action-btn" onClick={deleteAddress}>
                            <i className="uil uil-trash-alt"></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <div className="address-btns">
                  <div className="">
                    <button
                      onClick={() => history.goBack()}
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
  const addAddress = (
    <div className="row">
      {/* <div className="col-md-12">
        <div className="main-title-tab">
          
        </div>
      </div> */}

      <div className="col-lg-12 container checout-address-step">
        <form className="" onSubmit={handleSubmit}>
          <div className="address-fieldset">
            <div className="row">
              <div
                className="col col-12 form-group"
                style={{
                  width: "100%",
                  height: "60vh",
                  overflow: "none",
                  position: "relative",
                  borderRadius: "10px",
                  marginBottom: "10vh",
                }}
              >
                <Map
                  google={props.google}
                  center={cords}
                  height="50vh"
                  zoom={15}
                  handleAddressFromMap={handleAddressFromMap}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <div class="form-group">
                  <div class="product-radio">
                    <ul class="product-now">
                      <li>
                        <input
                          type="radio"
                          name="address1"
                          id="ad1"
                          checked={loginData.type === 1}
                          onClick={() =>
                            setLoginData({ ...loginData, type: 1 })
                          }
                        />
                        <label for="ad1">Home</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="address2"
                          id="ad2"
                          checked={loginData.type === 2}
                          onClick={() =>
                            setLoginData({ ...loginData, type: 2 })
                          }
                        />
                        <label for="ad2">Office</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="address3"
                          id="ad3"
                          checked={loginData.type === 3}
                          onClick={() =>
                            setLoginData({ ...loginData, type: 3 })
                          }
                        />
                        <label for="ad3">Other</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {loginData.area && (
                <div className="address-item">
                  <div className="address-dt-all">
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Selected Address
                    </p>
                    <p>{loginData.area}</p>
                  </div>
                </div>
              )}
              <div
                className="col-lg-6 col-md-12"
                style={{ marginBottom: "20px" }}
              >
                <div className="form-group">
                  <label className="control-label">
                    Flat / House / Office No.*
                  </label>
                  <input
                    id="flat"
                    name="flat"
                    type="text"
                    placeholder="Flat No."
                    value={loginData.flat}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <div className="address-btns">
                    <div className="">
                      <button type="submit" className="save-btn14 hover-btn">
                        Add Address
                      </button>
                    </div>
                    <div className="col">
                      <button
                        onClick={handleBack}
                        className="next-btn16 hover-btn float-right"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={80000}
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
      <div>{addNew ? addAddress : showAddress}</div>
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
    addNewAddress: (payload) => dispatch(actionCreators.addNewAddress(payload)),
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
