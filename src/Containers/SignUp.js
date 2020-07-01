import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
export default function SignUp(props) {
  const history = useHistory();
  const emptyLoginData = {
    fullname: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
    errors: { phone: "", password: "", email: "", fullname: "" },
  };
  const [loginData, setLoginData] = useState(emptyLoginData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(name + "changes");
  };
  const validateForm = () => {
    let errors = loginData.errors;
    let formIsValid = true;

    if (!loginData["fullname"]) {
      formIsValid = false;
      errors["fullname"] = "*Please enter your Full Name";
    } else if (typeof loginData["fullname"] !== "undefined") {
      if (!loginData["fullname"].match(/^[A-Za-z]+$/)) {
        formIsValid = false;
        errors["fullname"] = "*Please enter only alphabets";
      } else if (
        !(loginData["fullname"].length > 5 && loginData.fullname.length < 15)
      ) {
        formIsValid = false;
        errors.fullname = "*Please choose a user name between 5-15 characters";
      }
    } else {
      errors["fullname"] = "";
    }

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

    if (!loginData["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your EmailID.";
    } else if (typeof loginData["email"] !== "undefined") {
      if (
        !loginData["email"].match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ) {
        formIsValid = false;
        errors["email"] = "*Please enter a valid email";
      }
    } else {
      errors["password"] = "";
    }

    if (!loginData["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    } else if (typeof loginData["password"] !== "undefined") {
      if (
        !loginData["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(loginData);
      history.push("/home");
      setLoginData(emptyLoginData);
    }
  };

  return (
    <div className="sign-inup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="sign-form">
              <div className="sign-inner">
                <div className="sign-logo" id="logo">
                  <Link to="/home">
                    <img src="images/logo.svg" alt="" />
                  </Link>
                  <Link to="/home">
                    <img
                      className="logo-inverse"
                      src="images/dark-logo.svg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="form-dt">
                  <div className="form-inpts checout-address-step">
                    <form onSubmit={handleSubmit}>
                      <div className="form-title">
                        <h6>Sign Up</h6>
                      </div>
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
                      <p style={{ color: "red" }}>
                        {loginData.errors.fullname}
                      </p>
                      <div className="form-group pos_rel">
                        <input
                          id="email[address]"
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={loginData.email}
                          onChange={handleChange}
                          className="form-control lgn_input"
                          required
                        />
                        <i className="uil uil-envelope lgn_icon"></i>
                      </div>
                      <p style={{ color: "red" }}>{loginData.errors.email}</p>
                      <div className="form-group pos_rel">
                        <input
                          id="phone[number]"
                          name="phone"
                          type="text"
                          value={loginData.phone}
                          placeholder="Enter Phone Number"
                          onChange={handleChange}
                          className="form-control lgn_input"
                          required=""
                        />
                        <i className="uil uil-mobile-android-alt lgn_icon"></i>
                      </div>
                      <p style={{ color: "red" }}>{loginData.errors.phone}</p>
                      <div className="form-group pos_rel">
                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={loginData.otp}
                          onChange={handleChange}
                          className="form-control lgn_input"
                        />
                        <button>Send OTP</button>
                      </div>

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
                      <p style={{ color: "red" }}>
                        {loginData.errors.password}
                      </p>

                      <button className="login-btn hover-btn" type="submit">
                        Sign Up Now
                      </button>
                    </form>
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
