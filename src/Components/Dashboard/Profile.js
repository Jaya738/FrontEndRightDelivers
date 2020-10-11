import React from "react";
import DashHead from "./DashHead";
import MblNavbar from "../Common/MblNavbar";
import { useHistory, withRouter } from "react-router-dom";
import ShowOrders from "./ShowOrders";

export default withRouter(function Profile(props) {
  const history = useHistory();
  return (
    <div>
      <MblNavbar heading="Profile" back={() => history.goBack()} />
      <DashHead />
      <div
        style={{
          marginTop: "8vh",
          width:"100%"          
        }}
      >
        <div
          style={{
            borderRadius: "10px",
          }}
        >
          <ShowOrders />
        </div>
      </div>
    </div>
  );
});
