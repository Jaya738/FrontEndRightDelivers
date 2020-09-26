import React from "react";
import CheckoutAddress from "./CheckoutAddress";
import MblNavbar from "../Common/MblNavbar";
import { useHistory } from "react-router-dom";

export default function AddressStep(props) {
  const history = useHistory();
  return (
    <div>
      <div className="">
        <MblNavbar heading="Address" back={() => history.goBack()} />

        <div className="all-product-grid container p-3">
          {" "}
          <CheckoutAddress />
        </div>
      </div>
    </div>
  );
}
