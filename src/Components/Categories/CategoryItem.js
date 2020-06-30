import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Image } from "react-bootstrap";
import "./ribbon.css";
import * as actionCreators from "../../Store/actions/index";

function CategoryItem(props) {
  const curLocation = props.config.curLocation;
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    setIsAvailable(props.config.curBranch.services.includes(props.category.id));
  }, [curLocation]);

  const handleError = () => {
    if (curLocation) {
      setError("");
    } else {
      setError("Choose your location first");
    }
    props.setNotification(error);
  };
  return (
    <div
      className="col col-xs-12 col-sm-6 col-md-3 item"
      style={{ display: "tableCell" }}
    >
      <Link
        to={
          curLocation && isAvailable
            ? "/" + curLocation + "/" + props.category.id
            : "/"
        }
        onClick={handleError}
        className="category-item m-3 pt-5"
      >
        <div className="cate-img">
          <Image
            fluid
            className="mx-auto d-block"
            src={props.category.image}
            alt=""
          />
        </div>
        <h4> {props.category.name} </h4>
      </Link>
      {!isAvailable && curLocation && (
        <div class="ribbon ribbon-top-left">
          <span>coming soon</span>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (payload) =>
      dispatch(actionCreators.setNotification(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
