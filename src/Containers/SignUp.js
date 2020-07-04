import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import "./login.css";
import logo from "../Assets/logo.svg";

function SignUp(props) {
  const history = useHistory();
  const [otpData, setOtpData] = useState({});
  const [seconds, setSeconds] = useState(10);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [enableResend, setEnableResend] = useState(false);
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
    console.log(otp + "changed");
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
  const apiUrl = "https://api.rightdelivers.in/user/api/v1/register/sendotp";
  const handleAuth = async () => {
    const data = {
      mobile: loginData.phone,
      pwd: loginData.password,
      name: loginData.fullname,
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
      return;
    }
    if (res && res.status === 1) {
      console.log(res);
      setError(res.msg);
      setOtpData(res);
      setShowOTP(true);
      return;
    }

    console.log(res);
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
      handleAuth();
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
      console.log(res);
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
      console.log(res);
      setOtpData(res);

      setLoginData(emptyLoginData);
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
        <h6>Sign Up</h6>
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
          id="full[name]"
          name="fullname"
          type="text"
          placeholder="Full name"
          value={loginData.fullname}
          onChange={handleChange}
          className="form-control lgn_input"
          required
        />
        <i className="uil uil-user-circle lgn_icon"></i>
      </div>
      <p style={{ color: "red" }}>{loginData.errors.fullname}</p>

      <div className="form-group pos_rel">
        <input
          id="password1"
          name="password"
          type="password"
          placeholder="New Password"
          value={loginData.password}
          onChange={handleChange}
          className="form-control lgn_input"
          required
        />
        <i className="uil uil-padlock lgn_icon"></i>
      </div>
      <p style={{ color: "red" }}>{loginData.errors.password}</p>

      <button className="login-btn hover-btn" type="submit">
        Next
      </button>
    </form>
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
                    {!showOTP ? signUpForm : OTPSubmit}
                    <p style={{ color: "red" }}>{error}</p>
                  </div>

                  <div className="signup-link">
                    <p>
                      I have an account? -<Link to="login">Sign In Now</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
