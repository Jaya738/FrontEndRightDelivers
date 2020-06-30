import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Checkout.css";
import * as actionCreators from "../../Store/actions/index";

function CheckoutAddress(props) {
  const addressList = [props.address.curAddress];
  useEffect(() => {
    console.log(props.address.addressList);
  }, [addressList]);
  const emptyLoginData = {
    name: "",
    email: "",
    flat: "",
    street: "",
    pincode: "",
    locality: "",
  };
  const [loginData, setLoginData] = useState(emptyLoginData);
  const [addNew, setAddNew] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAddNew(false);
      props.setCurAddress(loginData);
      props.addNewAddress("added");
      setLoginData(emptyLoginData);
    }
  };

  const validateForm = () => {
    return true;
  };
  const handleAddAddress = () => {
    setAddNew(true);
  };
  const handleBack = () => {
    setAddNew(false);
  };
  const showAddress = (
    <div class="row">
      <div class="col-md-12">
        <div class="main-title-tab">
          <h4>
            <i class="uil uil-location-point"></i>My Address
          </h4>
        </div>
      </div>
      <div class="col-lg-12 col-md-12">
        <div class="pdpt-bg">
          <div class="pdpt-title">
            <h4>Select Delivery Address</h4>
          </div>
          <div class="address-body">
            <button class="next-btn16 hover-btn" onClick={handleAddAddress}>
              Add New Address
            </button>
            {addressList &&
              addressList.map((address) => (
                <div class="address-item">
                  <div class="address-icon1">
                    <i class="uil uil-home-alt"></i>
                  </div>
                  <div class="address-dt-all">
                    <h4>{address.name}</h4>
                    <p>
                      {address.flat}, {address.street}
                      <br />
                      {address.locality}, {address.pincode}
                    </p>
                    <ul class="action-btns">
                      <li>
                        <a href="#" class="action-btn">
                          <i class="uil uil-edit"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="action-btn">
                          <i class="uil uil-trash-alt"></i>
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
  );

  const addAddress = (
    <div className="row">
      <div class="col-md-12">
        <div class="main-title-tab">
          <h4>
            <i class="uil uil-location-point"></i>Add new Address
          </h4>
        </div>
      </div>
      <div className="col-lg-12 pdpt-bg address-body">
        <form className="" onSubmit={handleSubmit}>
          <div className="address-fieldset">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Name*</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={loginData.name}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Email Address*</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="control-label">
                    Flat / House / Office No.*
                  </label>
                  <input
                    id="flat"
                    name="flat"
                    type="text"
                    placeholder="Address"
                    value={loginData.flat}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label className="control-label">
                    Street / Society / Office Name*
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    value={loginData.street}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Pincode*</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    value={loginData.pincode}
                    onChange={handleChange}
                    className="form-control input-md"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group">
                  <label className="control-label">Locality*</label>
                  <input
                    id="Locality"
                    name="locality"
                    type="text"
                    placeholder="Enter City"
                    value={loginData.locality}
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
