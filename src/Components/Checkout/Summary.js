import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import CheckoutItems from "./CheckoutItems.js";
import CheckOutAddress from "./CheckoutAddress";
function Summary(props) {
  const backUrl = props.location.pathname;
  const isAuth = props.config.isAuth;
  return (
    <div className="all-product-grid">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <CheckOutAddress />
            <h2>Payment Options</h2>

            <Link
              to={
                isAuth
                  ? { pathname: `${props.match.url}/OrderStatus` }
                  : { pathname: "/login", state: { backUrl } }
              }
              className="next-btn16 hover-btn"
            >
              Place Order
            </Link>
          </div>
          <div className="col-lg-4 col-md-5">
            <CheckoutItems />
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
export default connect(mapStateToProps)(withRouter(Summary));
