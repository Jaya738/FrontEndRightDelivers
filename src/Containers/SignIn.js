import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../Assets/NegativeSVG.svg";
import * as actionCreators from "../Store/actions/index";
import { Toast } from "react-bootstrap";

function SignIn(props) {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const ftoken = localStorage.getItem("ftoken") || "";
  const [showForgotPswd, setShowForgotPswd] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [seconds, setSeconds] = useState(30);
  const [enableResend, setEnableResend] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPswd, setShowPswd] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const toggleShowPassword = () => {
    setShowPswd(!showPswd);
  };
  const emptyLoginData = {
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    errors: { phone: "", password: "", newPassword: "", confirmPassword: "" },
  };
  const [loginData, setLoginData] = useState(emptyLoginData);

  useEffect(() => {
    let interval = null;
    if (!enableResend & (seconds > 0)) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setEnableResend(true);
    }
    return () => clearInterval(interval);
  }, [enableResend, seconds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const apiUrl = "https://api.rightdelivers.in/user/api/v1/login";
  const handleAuth = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      ftoken: ftoken,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 0) {
      console.log(res.msg);
      setError(res.msg);
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      const payload = {
        phone: loginData.phone,
        ...res,
      };
      console.log(res);
      props.authenticate(payload);
      history.push("/");
      return;
    }
  };
  const handleForgotPassword = () => {
    setShowForgotPswd(true);
  };
  const apiUrl1 = "https://api.rightdelivers.in/user/api/v1/reset/sendotp";
  const sendOTP = async () => {
    const data = {
      mobile: loginData.phone,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl1, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      setShowOTP(true);
      setError(res.msg);
      setShowToast(true);
      setOtpData(res);
      setEnableResend(false);
      setSeconds(30);
      return;
    }
  };
  const apiUrl2 = "https://api.rightdelivers.in/user/api/v1/reset/resendotp";
  const resendOTP = async () => {
    const data = {
      mobile: loginData.phone,
      id: otpData.id,
      key: otpData.key,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };
    const res = await (await fetch(apiUrl2, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);
      setShowToast(true);
      console.log(res);
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      setOtpData(res);
      return;
    }
  };
  const apiUrl3 = "https://api.rightdelivers.in/user/api/v1/reset/submit";
  const submitOTP = async () => {
    const data = {
      mobile: loginData.phone,
      new: loginData.newPassword,
      id: otpData.id,
      key: otpData.key,
      otp: otp,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl3, options)).json();
    console.log(res);
    if (res && res.status === 0) {
      setError(res.msg);
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      setShowForgotPswd(false);
      setError(res.msg);
      setShowToast(true);
      setLoginData(emptyLoginData);
      return;
    }
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    if (validateReset()) {
      submitOTP();
    }
  };
  const editNumber = () => {
    setOtp("");
    setShowOTP(false);
  };
  const handleOTPChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const handleResend = () => {
    setSeconds(30);
    console.log("Clicked Resend");
    console.log(otpData);
    if (otpData) {
      resendOTP();
    }
    setEnableResend(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoginData(emptyLoginData);
      handleAuth();
    }
  };

  const validateForm = () => {
    let errors = { phone: "", password: "" };
    let formIsValid = true;

    if (!loginData["phone"]) {
      formIsValid = false;
      errors["phone"] = "*Please enter your mobile no.";
    } else if (typeof loginData["phone"] !== "undefined") {
      if (!loginData["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phone"] = "*Please enter valid mobile no.";
      }
    } else {
      errors["phone"] = "";
    }

    if (!loginData["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    } else if (typeof loginData["password"] !== "undefined") {
      if (!loginData["password"].length > 8) {
        formIsValid = false;
        errors["password"] = "*Please enter atleast 8 characters";
      }
    } else {
      errors["password"] = "";
    }

    setLoginData({
      ...loginData,
      errors: errors,
    });
    return formIsValid;
  };

  const validateReset = () => {
    let errors = {
      phone: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
    let formIsValid = true;

    if (!loginData["newPassword"]) {
      formIsValid = false;
      errors["newPassword"] = "*Please enter your password";
    } else if (loginData["newPassword"].length < 8) {
      formIsValid = false;
      errors["newPassword"] = "*Please enter atleast 8 characters";
    } else {
      errors["newPassword"] = "";
    }

    if (!loginData["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please re-enter your password";
    } else if (loginData["confirmPassword"] !== loginData["newPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "*Passwords doesn't match";
    }

    setLoginData({
      ...loginData,
      errors: errors,
    });
    return formIsValid;
  };

  const chooseMobile = (
    <div style={{ paddingBottom: "5vh" }}>
      <div class="form-row form-group">
        <div class="col-12 col-sm-8">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Mobile"
            value={loginData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <p style={{ color: "red" }}>{loginData.errors.phone}</p>
        <div class="col-5 col-sm-4 pt-2 ml-auto">
          <button onClick={sendOTP} class="otp-btn">
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
  const OTPSubmit = (
    <>
      <div style={{ padding: "5px" }}>
        <span>Sending OTP to {loginData.phone}</span>
        <span onClick={editNumber} className="action-btn">
          <i className="uil uil-edit"></i>
        </span>
      </div>
      <div class="form-row form-group">
        <div class="col">
          <input
            id="otp"
            name="otp"
            type="tel"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            className="form-control"
          />
        </div>
        <div class="col">
          {!enableResend ? (
            <button disabled class="otp-wait-btn">
              wait {seconds} s
            </button>
          ) : (
            <button onClick={handleResend} class="otp-btn">
              Resend OTP
            </button>
          )}
        </div>
      </div>
      <div className="form-group pos_rel">
        <input
          id="password1"
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={loginData.newPassword}
          onChange={handleChange}
          className="form-control lgn_input"
          required
        />
        <i className="uil uil-padlock lgn_icon"></i>
      </div>
      <p style={{ color: "red" }}>{loginData.errors.newPassword}</p>
      <div className="form-group pos_rel">
        <input
          id="password2"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={loginData.confirmPassword}
          onChange={handleChange}
          className="form-control lgn_input"
          required
        />
        <i className="uil uil-padlock lgn_icon"></i>
      </div>
      <p style={{ color: "red" }}>{loginData.errors.confirmPassword}</p>
      <div className="form-group">
        <button onClick={verifyOTP} class="otp-btn">
          Verify
        </button>
      </div>
    </>
  );
  const loginForm = (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <h6>Login</h6>
        </div>
        <div className="form-group pos_rel">
          <input
            id="phone[number]"
            name="phone"
            type="tel"
            value={loginData.phone}
            placeholder="Enter Phone Number"
            onChange={handleChange}
            className="form-control lgn_input"
            autocomplete="off"
            required
          />
          <i className="uil uil-mobile-android-alt lgn_icon"></i>
        </div>
        <p style={{ color: "red" }}>{loginData.errors.phone}</p>
        <div className="form-group pos_rel">
          <input
            id="password1"
            name="password"
            type={showPswd ? "text" : "password"}
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            autocomplete="off"
            className="form-control lgn_input"
            required
          />
          <i className="uil uil-padlock lgn_icon"></i>
          <span
            onClick={toggleShowPassword}
            className={
              showPswd
                ? "fa fa-fw fa-eye field-icon"
                : "fa fa-fw fa-eye-slash field-icon"
            }
          ></span>
        </div>
        <p style={{ color: "red" }}>{loginData.errors.password}</p>

        <button className="login-btn hover-btn" type="submit">
          Sign In Now
        </button>
      </form>
      <div className="password-forgor pb-3" onClick={handleForgotPassword}>
        Forgot Password ?
      </div>
    </>
  );
  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        top: "6vh",
        margin: "10px",
        width: "100%",
        zIndex: "999",
      }}
    >
      <Toast.Header>
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Header>
    </Toast>
  );
  return (
    <div className="sign-inup">
      <div class="ColorBg"></div>
      {errorToast}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="sign-form">
              <div className="sign-inner">
                <div className="sign-logo" id="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="form-dt">
                  <div className="form-inpts checout-address-step">
                    {!showForgotPswd
                      ? loginForm
                      : !showOTP
                      ? chooseMobile
                      : OTPSubmit}
                  </div>

                  <div className="ColorBgDown signup-link">
                    <p>
                      Don't have an account ?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (payload) => dispatch(actionCreators.authenticate(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
