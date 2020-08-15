import React from "react";

import MblNavbar from "../MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { withRouter, useHistory } from "react-router-dom";

function Settings(props) {
  const history = useHistory();
  return (
    <div className="row">
      <MblNavbar heading="Account" back={() => history.goBack()} />
      Account
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
