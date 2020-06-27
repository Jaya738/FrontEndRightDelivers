import React from "react";
import { connect } from "react-redux";

function CheckoutItems(props) {
  return (
    <div>
      <div className="pdpt-bg mt-0">
        <div className="pdpt-title">
          <h4>Order Summary</h4>
        </div>
        <div className="right-cart-dt-body">
          <div className="cart-item border_radius">
            <div className="cart-product-img">
              <img src="images/product/img-11.jpg" alt="" />
              <div className="offer-badge">4% OFF</div>
            </div>
            <div className="cart-text">
              <h4>Product Title Here</h4>
              <div className="cart-item-price">
                $15 <span>$18</span>
              </div>
              <button type="button" className="cart-close-btn">
                <i className="uil uil-multiply"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="total-checkout-group">
          <div className="cart-total-dil">
            <h4>Gambo Super Market</h4>
            <span>$15</span>
          </div>
          <div className="cart-total-dil pt-3">
            <h4>Delivery Charges</h4>
            <span>$1</span>
          </div>
        </div>
        <div className="cart-total-dil saving-total ">
          <h4>Total Saving</h4>
          <span>$3</span>
        </div>
        <div className="main-total-cart">
          <h2>Total</h2>
          <span>$16</span>
        </div>
        <div className="payment-secure">
          <i className="uil uil-padlock"></i>Secure checkout
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
export default connect(mapStateToProps)(CheckoutItems);
