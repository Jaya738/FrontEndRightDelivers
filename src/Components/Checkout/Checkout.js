import React from "react";
import { Route, Switch } from "react-router-dom";
import Summary from "./Summary";
import Bill from "./Bill";
import AddressStep from "./AddressStep";

export default function Checkout(props) {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.match.url}/`} component={AddressStep} />
        <Route path={`${props.match.url}/summary`} component={Summary} />
        <Route path={`${props.match.url}/bill`} component={Bill} />
      </Switch>
    </div>
  );
}
