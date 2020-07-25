import React from "react";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import MblNavbar from "../MblNavbar";
import { useHistory, withRouter } from "react-router-dom";

export default withRouter(function Address(props) {
  const history = useHistory();
  return (
    <div>
      <MblNavbar heading="Address" back={() => history.goBack()} />
      <div className="row m-2">
        <CheckoutAddress />
      </div>
    </div>
  );
});
