import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./restaurant.svg";
import * as actionCreators from "../../Store/actions/index";
import "./restaurants.css";

function RestaurantItem(props) {
  const restaurant = { ...props.data };
  const sendProduct = () => {
    props.setCurProduct(restaurant);
  };
  const selectRestaurant = () => {
    const payload = {
      ...props.data,
    };
    props.setCurRestaurant(payload);
  };
  return (
    <div className="col-lg-4 col-xs-6 col-md-4 col-sm-4">
      <div className="row rest-item mb-30 ">
        <div className="col col-sm-6 left-item">
          <Link
            to={{
              pathname: props.match.url + "/" + props.data.rid,
            }}
            onClick={selectRestaurant}
          >
            <Image src={image} className="p-image" fluid />
          </Link>
        </div>
        <div className="col col-sm-6 side-text">
          <h5>{props.data.name}</h5>
          <p className="sub-text">Biryani</p>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurRestaurant: (payload) =>
      dispatch(actionCreators.setCurRestaurant(payload)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(RestaurantItem));
