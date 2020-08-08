import React from "react";
import DashHead from "./DashHead";
import SideBar from "./SideBar";
import MblNavbar from "../MblNavbar";
import orderIcon from "./noOrders.svg";
import { Image } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import ShowOrders from "./ShowOrders";

export default withRouter(function Profile(props) {
  const history = useHistory();
  const noOrders = (
    <div className="m-5" style={{ paddingTop: "35vh" }}>
      <Image src={orderIcon} fluid />
      <p
        style={{
          color: "#2f4f4f",
          margin: "10%",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {" "}
        You have no orders yet{" "}
      </p>
    </div>
  );
  return (
    <div>
      <MblNavbar heading="Profile" back={() => history.goBack()} />
      <DashHead />
      <div
        style={{
          marginTop: "30vh",
          position: "absolute",
        }}
      >
        <div className="col-md-12  m-3">
          <div className="main-title-tab">
            <h4>
              <i className="uil uil-box"></i>My Orders
            </h4>
          </div>
        </div>
        <div
          style={{
            height: "50vh",
            overflowX: "hidden",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <ShowOrders />
        </div>
      </div>
    </div>
  );
});
