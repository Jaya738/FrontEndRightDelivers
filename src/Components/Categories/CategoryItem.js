import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import "./ribbon.css";
import * as actionCreators from "../../Store/actions/index";
import {imgUrl} from "../../config";

function CategoryItem(props) {
  const history = useHistory();
  const branches = props.config.branches;
  const curLocation = props.config.curLocation;
  const imageUrl = imgUrl + "services/";
  // const backUrl = props.location.pathname;
  // const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    setIsAvailable(props.config.curBranch.services.includes(props.category.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curLocation]);

  const handleError = () => {
    if (curLocation) {
      return;
    } else {
      setShow(true);
      //setTimeout(() => setShow(false), 1000);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const updateLocation = (loc) => {
    setShow(false);
    history.push("/" + loc);
    const payload = branches.find((branch) => branch.name === loc);
    props.changeLocation(payload);
  };
  const notifModal = (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <h5 style={{ fontWeight: "bold", padding: "0px 15px" }}>
          Select your Location
        </h5>
        {branches.map((branch) => (
          <div
            key={branch.name}
            className="myLoc item drop-item"
            style={{ alignContent: "left" }}
            onClick={() => updateLocation(branch.name)}
          >
            <i className="uil uil-location-point"></i>
            {branch.name}
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="col col-4 col-xs-4 col-sm-4 col-md-3 item">
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
        <div>
          <Image
            fluid
            className="mx-auto d-block"
            src={imageUrl + props.category.appimage}
            alt=""
          />
        </div>
      </Link>
      {!isAvailable && curLocation && (
        <div className="ribbon ribbon-top-left">
          <span className="badge badge-danger">Coming Soon</span>
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
    changeLocation: (payload) => dispatch(actionCreators.setLocation(payload)),
    setNotification: (payload) =>
      dispatch(actionCreators.setNotification(payload)),
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CategoryItem));
