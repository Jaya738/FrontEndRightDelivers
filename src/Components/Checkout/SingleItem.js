import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import image from "../Products/img-14.jpg";
import { imgUrl } from "../../config";

function SingleItem(props) {
  const product = props.product;
  const removeItem = () => {
    props.deleteCartItem(props.product.pid);
  };
  return (
    <div>
      <div className="cart-item border_radius">
        <div className="cart-product-img">
          <img
            src={
              props.product.img
                ? imgUrl + "restaurants/items/" + props.product.img
                : image
            }
            alt=""
          />
        </div>
        <div className="cart-text">
          <div className="">
            <h4>
              {product.name} {product.quantity > 1 && "x " + product.quantity}
            </h4>
            {product.custmz === 1 && (
              <span style={{ fontSize: "10px", margin: "-2px 5px" }}>
                ( {product.options} )
              </span>
            )}
          </div>
          <div className="d-flex">
            {props.product.custmz === 1 &&
              props.product.extras.map((extra, index) => (
                <label
                  key={index}
                  style={{
                    padding: "2px 4px",
                    backgroundColor: "#2f4f4f",
                    color: "white",
                    borderRadius: "3px",
                    fontWeight: "600",
                    fontSize: "10px",
                    marginRight: "3px",
                    marginTop: "5px",
                  }}
                >
                  {extra.n}
                </label>
              ))}
          </div>

          <div className="cart-item-price">
            ₹{product.itemPrice}
            {props.product.custmz === 1 && props.product.extras.length > 0 && (
              <div
                style={{
                  marginLeft: "10px",
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                {" "}
                + ₹{props.product.extraPrice}
              </div>
            )}
          </div>
          <button type="button" onClick={removeItem} className="cart-close-btn">
            <i className="uil uil-multiply"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartItem: (pid) => dispatch(actionCreators.deleteCartItem(pid)),
  };
};
export default connect(null, mapDispatchToProps)(SingleItem);
