import React, { useState } from "react";

function CheckoutAddress(props) {
  const [saved, setSaved] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const emptyLoginData = {
    name: "",
    email: "",
    flat: "",
    street: "",
    pincode: "",
    locality: "",
  };
  const [loginData, setLoginData] = useState(emptyLoginData);

  const handleChange = (e) => {
    setEnableSave(true);
    setSaved(false);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(loginData);
      setSaved(true);
      setLoginData(emptyLoginData);
    }
  };

  const validateForm = () => {
    return true;
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
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
                      <button
                        type="submit"
                        className="save-btn14 hover-btn"
                        disabled={!enableSave}
                      >
                        {saved ? "Saved" : "Save"}
                      </button>
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
