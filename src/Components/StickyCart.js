import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./cart.css";

function StickyCart(props) {
  const cartCount = props.cartCount;
  return (
    <div className="d-block d-sm-none mobileShow ">
      <Link to="/checkout" className="optionLinks">
        <i className="fa fa-shopping-basket iconWishlist"></i>
        {/* <span className="notiCount1">{cartCount}</span> */}
      </Link>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cart.cartItems.length,
  };
};
export default connect(mapStateToProps)(StickyCart);
