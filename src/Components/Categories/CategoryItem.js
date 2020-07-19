import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import { Image } from "react-bootstrap";
import "./ribbon.css";
import * as actionCreators from "../../Store/actions/index";

function CategoryItem(props) {
  const curLocation = props.config.curLocation;
  const imgUrl = "https://rightdelivers.in/uploads/services/";
  const backUrl = props.location.pathname;
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    setIsAvailable(props.config.curBranch.services.includes(props.category.id));
  }, [curLocation]);

  const handleError = () => {
    if (curLocation) {
      setError("");
    } else {
      setError("Choose your location first");
      setShow(true);
      setTimeout(() => setShow(false), 1000);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const notifModal = (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>{error}</Modal.Header>
    </Modal>
  );
  return (
    <div className="col col-6 col-xs-6 col-sm-4 col-md-3 item">
      {notifModal}
      <Link
        to={
          curLocation && isAvailable
            ? "/" + curLocation + "/" + props.category.link
            : "/"
        }
        onClick={handleError}
        className="category-item"
      >
        <div className="">
          <Image
            fluid
            className="mx-auto d-block"
            src={imgUrl + props.category.appimage}
            alt=""
          />
        </div>
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
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CategoryItem));
