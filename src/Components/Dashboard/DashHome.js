import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Profile from "./Profile";
import Orders from "./Orders";
import Cart from "./Cart";
import Address from "./Address";
import Faq from "./Faq";

export default withRouter(function DashHome(props) {
  return (
    <div class="dashboard-right">
      <Switch>
        <Route path={`${props.match.url}/orders`} component={Orders} />
        <Route path={`${props.match.url}/`} exact component={Profile} />
        <Route path={`${props.match.url}/cart`} component={Cart} />
        <Route path={`${props.match.url}/address`} component={Address} />
        <Route path={`${props.match.url}/faq`} component={Faq} />
      </Switch>
    </div>
  );
});
