import React, { useState } from "react";
import image from "./img-14.jpg";
import { connect } from "react-redux";
import "./product.css";
import { Image } from "react-bootstrap";
import * as actionCreators from "../../Store/actions/index";

import Header from "../Header/Header";

function ProductDetail(props) {
  const product = props.product.curProduct;
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleCart = () => {
    const payload = {
      ...product,
      quantity: quantity,
    };
    setAdded(true);
    props.addToCart(payload);
  };
  return (
    <>
      <Header />
      <div className="all-product-grid">
        <div className="row">
          <div className="col-lg-12">
            <div className="product-dt-view">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div id="sync1" className="">
                    <div className="item">
                      <Image src={image} className="p-image" fluid alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8">
                  <div className="product-dt-right">
                    <h2>{product.name}</h2>
                    <div className="no-stock">
                      <p className="pd-no">
                        Product No.<span>{product.pid}</span>
                      </p>
                      <p className="stock-qty">
                        Available<span>(Instock)</span>
                      </p>
                    </div>
                    <div className="product-radio">
                      <ul className="product-now">
                        <li>
                          <input type="radio" id="p1" name="product1" />
                          <label for="p1">half</label>
                        </li>
                        <li>
                          <input type="radio" id="p2" name="product1" />
                          <label for="p2">full</label>
                        </li>
                      </ul>
                    </div>
                    <p className="pp-descp">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam vulputate, purus at tempor blandit, nulla felis
                      dictum eros, sed volutpat odio sapien id lectus. Cras
                      mollis massa ac congue posuere. Fusce viverra mauris vel
                      magna pretium aliquet. Nunc tincidunt, velit id tempus
                      tristique, velit dolor hendrerit nibh, at scelerisque
                      neque mauris sed ex.
                    </p>
                    <div className="product-group-dt">
                      <ul>
                        <li>
                          <div className="main-price color-discount">
                            Discount Price
                            <span>₹{product.aprice * quantity}</span>
                          </div>
                        </li>
                        <li>
                          <div className="main-price mrp-price">
                            MRP Price<span>₹{product.sprice * quantity}</span>
                          </div>
                        </li>
                      </ul>
                      <div className="row gty-wish-share">
                        <div classname="col">
                          <ul>
                            <li>
                              <div className="qtycart">
                                <div className="quantity buttons_added">
                                  <input
                                    type="button"
                                    value="-"
                                    onClick={decrement}
                                    className="minus minus-btn"
                                  />
                                  <input
                                    type="text"
                                    name="quantity"
                                    value={quantity}
                                    className="input-text qty text"
                                  />
                                  <input
                                    type="button"
                                    value="+"
                                    onClick={increment}
                                    className="plus plus-btn"
                                  />
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col">
                          {!added ? (
                            <button
                              className="add-cart-btn hover-btn"
                              onClick={handleCart}
                            >
                              <i className="uil uil-shopping-cart-alt"></i>Add
                              to Cart
                            </button>
                          ) : (
                            <button className="added-cart-btn">
                              <i className="uil uil-shopping-cart-alt"></i>Added
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(actionCreators.addToCart(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
