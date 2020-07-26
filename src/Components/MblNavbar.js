import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function MblNavbar(props) {
  const cartCount = props.cartCount;
  const navStyle = {
    position: "fixed",
    padding: "0.5rem 1rem",
    top: "0",
    width: "100%",
    backgroundColor: "#2F4F4F",
    zIndex: "10",
  };

  return (
    <div className="fixed-top align-middle" style={navStyle}>
      <div
        style={{
          paddingTop: "4vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          onClick={props.back}
          style={{ fontSize: "20px", color: "white", marginLeft: "10px" }}
        >
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <span
          style={{
            fontSize: "18px",
            color: "white",
            marginLeft: "20px",
          }}
        >
          <name>{props.heading}</name>
        </span>
        <Link to="/dashboard/cart" className="option_links ml-auto mr-3">
          <i className="uil uil-shopping-cart-alt icon_wishlist"></i>
          <span className="noti_count1">{cartCount}</span>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    cartCount: state.cart.cartItems.length,
  };
};
export default connect(mapStateToProps)(withRouter(MblNavbar));
