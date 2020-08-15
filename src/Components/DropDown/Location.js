import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Menu.css";
import * as actionCreators from "../../Store/actions/index";

function Location(props) {
  const history = useHistory();
  const handleClose = () => {
    setShow(false);
  };
  const branches = props.branches;
  const [show, setShow] = useState(false);
  const curLocation = props.curLocation;
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
    <>
      {notifModal}
      <div className="header-color">
        <span
          className="btn"
          style={{ color: "white" }}
          onClick={() => setShow(true)}
        >
          <i className="uil uil-location-point"></i>
          {curLocation ? curLocation : "Pick Your Location"}
        </span>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    curLocation: state.config.curLocation,
    branches: state.config.branches,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLocation: (payload) => dispatch(actionCreators.setLocation(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);
