import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";
import Location from "../DropDown/Location";
import logo from "../../Assets/NegativeSVG.svg";

function Header(props) {
  // const backUrl = props.location.pathname;
  // const isAuth = props.config.isAuth;
  const curLocation = props.config.curLocation;
  
  return (
    <nav
      className="navbar header clearfix"
      style={{
        backgroundColor: "#2F4F4F",
        zIndex: "10",
      }}
    >
      <div className="top-header-group" style={{ marginTop: "4vh" }}>
        <div className="float-left">
          <div className="res_main_logo" id="logo">
            <Link to={"/" + curLocation}>
              <img src={logo} alt="Right Delivers" />
            </Link>
          </div>

        </div>
        <div className="select_location float-right align-middle mt-2">
          <Location />
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
    cartCount: state.cart.cartItems.length,
  };
};
export default connect(mapStateToProps)(withRouter(Header));
