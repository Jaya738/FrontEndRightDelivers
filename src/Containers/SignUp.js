import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import "./login.css";
import logo from "../Assets/NegativeSVG.svg";
import { Toast } from "react-bootstrap";
import { baseUrl } from "../config";
import { subscribeToSockets } from "../api";

function SignUp(props) {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [seconds, setSeconds] = useState(10);
  const ftoken = localStorage.getItem("ftoken") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showPswd, setShowPswd] = useState(false);
  const [enableResend, setEnableResend] = useState(false);
  const toggleShowPassword = () => {
    setShowPswd(!showPswd);
  };
  useEffect(() => {
    if (props.config.isAuth) {
      history.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableResend, seconds]);

  const emptyLoginData = {
    fullname: "",
    phone: "",
    password: "",
    errors: { phone: "", password: "", fullname: "", signup: "" },
  };
  const [loginData, setLoginData] = useState(emptyLoginData);
  const editNumber = () => {
    setOtp("");
    setShowOTP(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleOTPChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const apiUrl2 = baseUrl + "register/resendotp";
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
    const res = await (await fetch(apiUrl2, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      setOtpData(res);
      return;
    }
  };
  const apiUrl = baseUrl + "register/sendotp";
  const handleAuth = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      name: loginData.fullname,
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
      setError(res.msg);
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      setOtpData(res);
      setShowOTP(true);
      return;
    }
  };

  const validateForm = () => {
    let errors = { phone: "", password: "", email: "", fullname: "" };
    let formIsValid = true;

    if (typeof loginData["fullname"] !== "undefined") {
      if (
        !(loginData["fullname"].length > 2 && loginData.fullname.length < 20)
      ) {
        formIsValid = false;
        errors = {
          ...errors,
          fullname: "*Please choose a user name between 3-20 characters",
        };
      }
    } else {
      errors = {
        ...errors,
        fullname: "",
      };
    }

    if (!loginData["phone"]) {
      formIsValid = false;
      errors = {
        ...errors,
        phone: "*Please enter your mobile no.",
      };
    } else if (typeof loginData["phone"] !== "undefined") {
      if (!loginData["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors = {
          ...errors,
          phone: "*Please enter valid mobile no.",
        };
      }
    } else {
      errors = {
        ...errors,
        phone: "",
      };
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
  const handleResend = () => {
    setSeconds(10);
    if (otpData) {
      resendOTP();
    }
    setEnableResend(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAuth();
    }
  };
  const apiUrl3 = baseUrl + "register/submit";
  const submitOTP = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      name: loginData.fullname,
      otp: otp,
      ftoken: ftoken,
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
      setShowToast(true);
      return;
    }
    if (res && res.status === 1) {
      const payload = {
        phone: loginData.phone,
        user: {
          name: loginData.fullname,
          mbl: loginData.phone,
        },
        rKey: res.rKey,
        dKey: res.dKey,
        ...res,
      };
      props.authenticate(payload);
      history.push("/");
      setError(res.msg);
      setShowToast(true);
      setOtpData(res);
      setLoginData(emptyLoginData);
      const usrid = res.user ? res.user.userid : ""
      subscribeToSockets(usrid);
      return;
    }
  };
  const verifyOTP = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOTP(true);
      submitOTP();
    }
  };

  const signUpForm = (
    <form onSubmit={handleSubmit}>
      <div className="form-title">
        <h6>Register</h6>
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
      <p style={{ color: "red" }}>{loginData.errors.phone}</p>
      <div className="form-group pos_rel">
        <input
          id="full[name]"
          name="fullname"
          type="text"
          placeholder="Name"
          value={loginData.fullname}
          onChange={handleChange}
          className="form-control lgn_input"
          autoComplete="off"
          required
        />
        <i className="uil uil-user-circle lgn_icon"></i>
      </div>
      <p style={{ color: "red" }}>{loginData.errors.fullname}</p>

      <div className="form-group pos_rel">
        <input
          id="password1"
          name="password"
          type={showPswd ? "text" : "password"}
          placeholder="New Password"
          value={loginData.password}
          onChange={handleChange}
          autoComplete="off"
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
        Next
      </button>
    </form>
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

  const OTPSubmit = (
    <>
      <div style={{ padding: "5px 0px" }}>
        <span>Sending OTP to {loginData.phone}</span>
        <span onClick={editNumber} className="action-btn">
          <i className="uil uil-edit"></i>
        </span>
      </div>
      <div className="form-row form-group">
        <div className="col">
          <input
            id="otp"
            name="otp"
            type="tel"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            autoComplete="off"
            className="form-control "
          />
        </div>
        <div className="col">
          {!enableResend ? (
            <button disabled className="otp-wait-btn">
              wait {seconds} s
            </button>
          ) : (
            <button onClick={handleResend} className="otp-btn">
              Resend OTP
            </button>
          )}
        </div>
      </div>
      <div className="form-group">
        <button onClick={verifyOTP} className="otp-btn">
          Verify
        </button>
      </div>
    </>
  );
  return (
    <div className="sign-inup">
      {errorToast}
      <div className="ColorBg"></div>
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
                <div className="form-dt pb-3">
                  <div className="form-inpts checout-address-step">
                    {!showOTP ? signUpForm : OTPSubmit}
                  </div>
                </div>
              </div>
              <div className="ColorBgDown signup-link">
                <p>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
