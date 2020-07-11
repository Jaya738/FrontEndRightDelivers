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
    <div className="col col-12 col-sm-6 col-md-4 rest-item">
      <Link
        to={{
          pathname: props.match.url + "/" + props.data.id,
        }}
        onClick={selectRestaurant}
      >
        <div className="row align-items-center no-gutters">
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
  };
};
export default withRouter(connect(null, mapDispatchToProps)(RestaurantItem));
