import React from "react";
import DashHead from "./DashHead";
import SideBar from "./SideBar";
import MblNavbar from "../MblNavbar";
import { useHistory, withRouter } from "react-router-dom";

export default withRouter(function Profile(props) {
  const history = useHistory();
  return (
    <div>
      <MblNavbar heading="Profile" back={() => history.goBack()} />
      <DashHead />
      <SideBar />
    </div>
  );
});
