import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../Assets/logo.svg";
import * as actionCreators from "../Store/actions/index";

function SignIn(props) {
  const history = useHistory();
  const [error, setError] = useState("");
  const [showForgotPswd, setShowForgotPswd] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [seconds, setSeconds] = useState(10);
  const [enableResend, setEnableResend] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
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
    console.log(apiUrl);
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
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
      return;
    }
    if (res && res.status === 1) {
      const payload = {
        phone: loginData.phone,
        rKey: res.rKey,
        dKey: res.dKey,
      };
      console.log(res);
      props.authenticate(payload);
      history.push("/");
      return;
    }

    console.log(res);
  };
  const handleForgotPassword = () => {
    setShowForgotPswd(true);
  };
  const apiUrl1 = "https://api.rightdelivers.in/user/api/v1/register/sendotp";
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
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setOtpData(res);
      setShowOTP(true);
      return;
    }
  };
  const apiUrl3 = "https://api.rightdelivers.in/user/api/v1/register/submit";
  const submitOTP = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      name: loginData.fullname,
      otp: otp,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rkey: otpData.rKey,
        dkey: otpData.dKey,
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl3, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);

      return;
    }
    if (res && res.status === 1) {
      const payload = {
        phone: loginData.phone,
        name: loginData.fullname,
        xKey: res.xKey,
        yKey: res.yKey,
      };
      props.authenticate(payload);
      history.push("/");
      setError(res.msg);
      setOtpData(res);

      setLoginData(emptyLoginData);
      return;
    }
  };
  const apiUrl2 = "https://api.rightdelivers.in/user/api/v1/register/resendotp";
  const resendOTP = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      name: loginData.fullname,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rkey: otpData.rKey,
        dkey: otpData.dKey,
      },
      body: JSON.stringify(data),
    };
    console.log("inside resendotp");

    const res = await (await fetch(apiUrl2, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);
      console.log(res);
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      console.log(res);
      setOtpData(res);
      return;
    }
  };
  const verifyOTP = (e) => {
    e.preventDefault();

    setVerified(true);
    submitOTP();
  };
  const editNumber = () => {
    setOtp("");
    setShowOTP(false);
  };
  const handleOTPChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
    console.log(otp + "changed");
  };
  const handleResend = () => {
    setSeconds(10);
    console.log("Clicked Resend");
    console.log(otpData);
    if (otpData) {
      resendOTP();
    }
    setEnableResend(false);
  };
  const resetPassword = () => {
    if (validateReset()) {
      console.log(loginData.newPassword);
      setLoginData(emptyLoginData);
    }
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
    <div class="form-row form-group">
      <div class="col col-sm-8">
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter mobile number"
          value={loginData.phone}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <p style={{ color: "red" }}>{loginData.errors.phone}</p>
      <div class="col col-sm-4">
        <button onClick={sendOTP} class="otp-btn">
          Send OTP
        </button>
      </div>
    </div>
  );
  const OTPSubmit = (
    <>
      <span>Sending OTP to {loginData.phone}</span>
      <span onClick={editNumber} className="action-btn">
        <i className="uil uil-edit"></i>
      </span>
      <div class="form-row form-group">
        <div class="col">
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            className="form-control "
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
          <h6>Sign In</h6>
        </div>
        <div className="form-group pos_rel">
          <input
            id="phone[number]"
            name="phone"
            type="text"
            value={loginData.phone}
            placeholder="Enter Phone Number"
            onChange={handleChange}
            className="form-control lgn_input"
            required
          />
          <i className="uil uil-mobile-android-alt lgn_icon"></i>
        </div>
        <p style={{ color: "red" }}>{loginData.errors.phone}</p>
        <div className="form-group pos_rel">
          <input
            id="password1"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            className="form-control lgn_input"
            required
          />
          <i className="uil uil-padlock lgn_icon"></i>
        </div>
        <p style={{ color: "red" }}>{loginData.errors.password}</p>
        <p style={{ color: "red" }}>{error}</p>
        <button className="login-btn hover-btn" type="submit">
          Sign In Now
        </button>
      </form>
      <div className="password-forgor" onClick={handleForgotPassword}>
        Forgot Password?
      </div>
    </>
  );
  const passwordReset = (
    <>
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
      <button className="login-btn hover-btn" onClick={resetPassword}>
        Submit
      </button>
    </>
  );
  return (
    <div className="sign-inup">
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
                    {showForgotPswd
                      ? chooseMobile
                      : showOTP
                      ? verified
                        ? passwordReset
                        : OTPSubmit
                      : loginForm}
                  </div>

                  <div className="signup-link">
                    <p>
                      Don't have an account? -{" "}
                      <Link to="register">Sign Up Now</Link>
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
