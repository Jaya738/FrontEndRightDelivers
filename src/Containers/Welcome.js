import React from "react";
import { Image } from "react-bootstrap";
import Deliveryimage from "./welcome.svg";
import { useHistory } from "react-router-dom";

function Welcome() {
  const history = useHistory();
  const emptyLoginData = {
    fullname: "",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAuth();
    }
  };

  return (
    <div>
      <div style={{ margin: "25% 5% 10% 5%", textAlign: "center" }}>
        <h4>Welcome to Right Delivers</h4>
      </div>
      <Image
        src={Deliveryimage}
        style={{ width: "80%", margin: "10%" }}
        fluid
        alt="Welcome"
      />
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "0px 0px 30px 0px", textAlign: "left" }}>
          <h5 style={{ textTransform: "uppercase", color: "#d30013" }}>
            Login
          </h5>
          <p style={{ fontSize: "12px", color: "#d30013" }}>
            Enter your mobile number to proceed
          </p>
        </div>
        <div className="form-group pos_rel">
          <input
            id="phone[number]"
            name="phone"
            type="tel"
            value={loginData.phone}
            placeholder="Mobile"
            onChange={handleChange}
            className="form-control lgn_input"
            autoComplete="off"
            required
          />
          <i className="uil uil-mobile-android-alt lgn_icon"></i>
        </div>
        <button
          className="login-btn hover-btn"
          style={{
            backgroundColor: loginData.phone.length === 10 ? "#d30013" : "grey",
          }}
          disabled={loginData.phone.length != 10}
          type="submit"
        >
          {loginData.phone.length === 10 ? "Send OTP" : "Enter phone number"}
        </button>
      </form>
    </div>
  );
}

export default Welcome;
