import React from "react";
import DashHead from "./DashHead";
import SideBar from "./SideBar";
import MblNavbar from "../MblNavbar";
import orderIcon from "./noOrders.svg";
import { Image } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";

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
      {noOrders}
    </div>
  );
});
