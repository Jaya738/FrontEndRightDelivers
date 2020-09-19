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
  const [newUser, setNewUser] = useState(true);
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
    value.length <= 10 && setLoginData({ ...loginData, [name]: value });
  };
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleOTPChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const apiUrl2 = baseUrl + "register/v2/resendotp";
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
  const apiUrl = baseUrl + "register/v2/sendotp";
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
      if (res.isNewUser === 0) {
        setNewUser(false);
        setLoginData({ ...loginData, fullname: res.name });
      } else {
        setNewUser(true);
      }
      return;
    }
  };

  const validateForm = () => {
    let errors = { phone: "", password: "", email: "", fullname: "" };
    let formIsValid = true;

    // if (typeof loginData["fullname"] !== "undefined") {
    //   if (
    //     !(loginData["fullname"].length > 2 && loginData.fullname.length < 20)
    //   ) {
    //     formIsValid = false;
    //     errors = {
    //       ...errors,
    //       fullname: "*Please choose a user name between 3-20 characters",
    //     };
    //   }
    // } else {
    //   errors = {
    //     ...errors,
    //     fullname: "",
    //   };
    // }

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

    // if (!loginData["password"]) {
    //   formIsValid = false;
    //   errors["password"] = "*Please enter your password.";
    // } else if (typeof loginData["password"] !== "undefined") {
    //   if (!loginData["password"].length > 8) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter atleast 8 characters";
    //   }
    // } else {
    //   errors["password"] = "";
    // }

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
  const apiUrl3 = baseUrl + "register/v2/submit";
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
          name: res.name,
          mbl: loginData.phone,
        },
        rKey: res.rKey,
        dKey: res.dKey,
        ...res,
      };
      props.authenticate(payload);
      setError(res.msg);
      setShowToast(true);
      //setOtpData(res);
      setLoginData(emptyLoginData);
      history.push("/");
      // const usrid = res.user ? res.user.userid : ""
      // subscribeToSockets(usrid);
      // return;
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
      <div style={{ margin: "0px 0px 30px 0px", textAlign: "left" }}>
        <h5 style={{ textTransform: "uppercase", color: "#d30013" }}>Login</h5>
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
    <form onSubmit={verifyOTP}>
      <div style={{ padding: "40px 0px", textAlign: "left" }}>
        {!newUser && <h4 style={{ color: "#d30013" }}>Welcome back</h4>}
        <span>Sending OTP to {loginData.phone}</span>
        <span onClick={editNumber} className="action-btn">
          <i className="uil uil-edit"></i>
        </span>
      </div>
      {newUser && (
        <div className="form-group pos_rel">
          <input
            id="full[name]"
            name="fullname"
            type="text"
            placeholder="Name"
            value={loginData.fullname}
            onChange={handleNameChange}
            className="form-control lgn_input"
            autoComplete="off"
            required
          />
          <i className="uil uil-user-circle lgn_icon"></i>
        </div>
      )}
      <div className="form-row form-group">
        <div className="col d-flex">
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
            <div disabled style={{ width: "100%" }} className="otp-wait-btn">
              wait {seconds} s
            </div>
          ) : (
            <div
              onClick={handleResend}
              style={{ width: "100%" }}
              className="otp-btn"
            >
              Resend OTP
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          style={{
            backgroundColor:
              loginData.fullname.length >= 3 && otp.length === 6
                ? "#d30013"
                : "grey",
          }}
          disabled={!(loginData.fullname.length >= 3 && otp.length === 6)}
          className="w-100 otp-btn"
        >
          Verify
        </button>
      </div>
    </form>
  );
  return (
    <div className="sign-inup">
      {errorToast}
      <div className="ColorBg-login"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="sign-form">
              <div className="sign-inner">
                <div className="sign-logo mt-5" id="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="ColorBgDown signup-link">
                <div className="dims checout-address-step">
                  {!showOTP ? signUpForm : OTPSubmit}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
