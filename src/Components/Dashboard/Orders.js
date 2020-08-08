import React from "react";
import ShowOrders from "./ShowOrders";
import MblNavbar from "../MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { withRouter, useHistory } from "react-router-dom";

function Orders(props) {
  const history = useHistory();
  return (
    <div className="row">
      <MblNavbar heading="Orders" back={() => history.goBack()} />
      <ShowOrders />
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
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
    clearCart: () => dispatch(actionCreators.clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
