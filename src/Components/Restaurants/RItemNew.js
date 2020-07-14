import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./restaurant.svg";
import * as actionCreators from "../../Store/actions/index";
import "./restaurants.css";

function RestaurantItem(props) {
  const restaurant = { ...props.data };
  const backUrl = props.location.pathname;
  const sendProduct = () => {
    props.setCurProduct(restaurant);
  };
  const selectRestaurant = () => {
    props.setBackUrl(backUrl);
    const payload = {
      ...props.data,
    };
    props.setCurRestaurant(payload);
  };
  return (
    <div className="col col-12 col-sm-6 col-md-4 ">
      <Link
        to={{
          pathname: props.match.url + "/" + props.data.id,
        }}
        onClick={selectRestaurant}
      >
        <div className="row align-items-center rest-item">
          <div className="col col-3 col-sm-3">
            <Image
              src={
                props.data.pic
                  ? "https://rightdelivers.in/uploads/restaurants/shops/" +
                    props.data.pic
                  : image
              }
              className="p-image rest-image"
              fluid
            />
          </div>
          <div className="col col-9 col-sm-9">
            <p className="rest-name">{props.data.name}</p>
            <p className="sub-text">{props.data.disc}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurRestaurant: (payload) =>
      dispatch(actionCreators.setCurRestaurant(payload)),
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(RestaurantItem));
