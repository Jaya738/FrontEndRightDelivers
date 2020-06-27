import React from "react";

function CheckoutAddress(props) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <form className="">
            <div className="form-group">
              <div className="product-radio">
                <ul className="product-now">
                  <li>
                    <input type="radio" id="ad1" name="address1" checked />
                    <label for="ad1">Home</label>
                  </li>
                  <li>
                    <input type="radio" id="ad2" name="address1" />
                    <label for="ad2">Office</label>
                  </li>
                  <li>
                    <input type="radio" id="ad3" name="address1" />
                    <label for="ad3">Other</label>
                  </li>
                </ul>
              </div>
            </div>
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
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label className="control-label">Email Address*</label>
                    <input
                      id="email1"
                      name="email1"
                      type="text"
                      placeholder="Email Address"
                      className="form-control input-md"
                      required=""
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
                      className="form-control input-md"
                      required=""
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
                      className="form-control input-md"
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
                      className="form-control input-md"
                      required=""
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
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <div className="address-btns">
                      <button className="save-btn14 hover-btn">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutAddress;
