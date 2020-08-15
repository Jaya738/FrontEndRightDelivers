import React from "react";
import DashHead from "./DashHead";
import MblNavbar from "../MblNavbar";
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
        <div className="w-100 m-3" >
          <div className="main-title-tab">
            <h4 style={{color:"grey"}}>
              <i className="uil uil-box"></i>My Orders
            </h4>
          </div>
        </div>
        <div
          style={{
            // height: "52vh",
            // overflowX: "hidden",
            // overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <ShowOrders />
        </div>
      </div>
    </div>
  );
});
