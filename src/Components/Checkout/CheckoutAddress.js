import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import shortid from "shortid";

import "./Checkout.css";
import * as actionCreators from "../../Store/actions/index";

function CheckoutAddress(props) {
  const addressList = props.address.addressList;

  const emptyLoginData = {
    id: "",
    name: "",
    email: "",
    flat: "",
    street: "",
    pincode: "",
    locality: "",
  };
  const [addNew, setAddNew] = useState(false);
  const [loginData, setLoginData] = useState(emptyLoginData);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAddNew(false);
      props.addNewAddress(loginData);
      setLoginData(emptyLoginData);
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
    props.setCurAddress(selectedAddress);
    console.log(selectedAddress);
  }, [addNew, selectedAddress]);
  const handleAddAddress = () => {
    setAddNew(true);
  };
  const handleBack = () => {
    setAddNew(false);
  };
  const showAddress = (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-location-point"></i>My Address
          </h4>
        </div>
      </div>
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
                    className={
                      selectedAddress.id === address.id
                        ? "address-item activeAddress"
                        : "address-item"
                    }
                  >
                    <div className="address-icon1">
                      <i className="uil uil-home-alt"></i>
                    </div>
                    <div className="address-dt-all">
                      <h4>{address.name}</h4>
                      <p>
                        {address.flat}, {address.street}
                        <br />
                        {address.locality}, {address.pincode}
                      </p>
                      <ul className="action-btns">
                        <li>
                          <a href="#" className="action-btn">
                            <i className="uil uil-edit"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="action-btn">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const addAddress = (
    <div classNameName="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-location-point"></i>Add new Address
          </h4>
        </div>
      </div>
      <div classNameName="col-lg-12 pdpt-bg address-body">
        <form classNameName="" onSubmit={handleSubmit}>
          <div classNameName="address-fieldset">
            <div classNameName="row">
              <div classNameName="col-lg-6 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">Name*</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={loginData.name}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-6 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">Email Address*</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-12 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">
                    Flat / House / Office No.*
                  </label>
                  <input
                    id="flat"
                    name="flat"
                    type="text"
                    placeholder="Address"
                    value={loginData.flat}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-12 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">
                    Street / Society / Office Name*
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    value={loginData.street}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-6 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">Pincode*</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    value={loginData.pincode}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-6 col-md-12">
                <div classNameName="form-group">
                  <label classNameName="control-label">Locality*</label>
                  <input
                    id="Locality"
                    name="locality"
                    type="text"
                    placeholder="Enter City"
                    value={loginData.locality}
                    onChange={handleChange}
                    classNameName="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div classNameName="col-lg-12 col-md-12">
                <div classNameName="form-group">
                  <div classNameName="address-btns">
                    <div classNameName="">
                      <button
                        type="submit"
                        classNameName="save-btn14 hover-btn"
                      >
                        Add Address
                      </button>
                    </div>
                    <div classNameName="col">
                      <button
                        onClick={handleBack}
                        classNameName="next-btn16 hover-btn float-right"
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
  return <div>{addNew ? addAddress : showAddress}</div>;
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurAddress: (payload) => dispatch(actionCreators.setCurAddress(payload)),
    addNewAddress: (payload) => dispatch(actionCreators.addNewAddress(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddress);
