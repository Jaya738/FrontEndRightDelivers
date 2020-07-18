import React from "react";
import MblNavbar from "../Components/MblNavbar";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header/Header";
import DashHome from "../Components/Dashboard/DashHome";

export default function Dashboard(props) {
  const history = useHistory();
  return (
    <div>
      <MblNavbar heading="Dashboard" back={() => history.goBack()} />
      <DashHome />
    </div>
  );
}
