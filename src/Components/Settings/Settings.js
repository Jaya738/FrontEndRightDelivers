import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory } from "react-router-dom";
import MblNavbar from "../Common/MblNavbar";
//import ProductQuantity from "../DropDown/ProductQuantity";
import { baseUrl } from "../../config";
import DashHead from "../Dashboard/DashHead";
import { Button } from "react-bootstrap";
import { Toast } from "react-bootstrap";

function Settings(props) {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  const apiUrl = baseUrl + "editname";

  const saveName = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 0) {
      setError(res.msg);
      setShowToast(true);
    }
    if (res && res.status === 1) {
      setError(res.msg);
      setShowToast(true);
      const payload = {
        name: name,
      };
      props.updateSettings(payload);
      setName("");
      setShowForm(false);
    }
  };

  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={2000}
      autohide
      style={{
        position: "fixed",
        bottom: "20vh",
        zIndex: "999",
        textAlign: "center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Toast.Body
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          borderBottom: "none",
          textAlign: "center",
          padding: "0.2rem 0.8rem",
        }}
      >
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Body>
    </Toast>
  );
  return (
    <div>
      <MblNavbar heading="Settings" back={() => history.goBack()} />
      <DashHead />
      {errorToast}
      <div
        style={{
          marginTop: "8vh",
          width: "100%",
          padding: "30px 15px 5px 15px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            color: "#2f4f4f",
            fontSize: "18px",
            padding: "5px",
            border: "1px solid #2f4f4f",
            borderRadius: "5px",
            textAlign: "center",
          }}
          onClick={() => setShowForm(true)}
        >
          Change Username <i className="uil uil-edit"></i>
        </div>
      </div>
      {showForm && (
        <form onSubmit={saveName}>
          <div className="form-group pos_rel m-3">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter new username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control lgn_input"
              style={{ backgroundColor: "transparent" }}
              autoComplete="off"
              required
            />
            <i className="uil uil-user-circle lgn_icon"></i>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              onClick={() => setShowForm(false)}
              style={{ width: "45%", backgroundColor: "rgb(47, 79, 79)" }}
              className="otp-wait-btn"
            >
              Cancel
            </div>
            <Button
              type="submit"
              disabled={name.length < 3 || name.length > 20}
              className="otp-btn"
              style={{
                width: "45%",
                backgroundColor:
                  name.length >= 3 && name.length < 20 ? "#d30013" : "grey",
              }}
            >
              Save
            </Button>
          </div>
        </form>
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
    updateSettings: (payload) =>
      dispatch(actionCreators.updateSettings(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
