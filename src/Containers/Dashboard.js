import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";

import Profile from "../Components/Dashboard/Profile";
import Orders from "../Components/Dashboard/Orders";
import Cart from "../Components/Dashboard/Cart";
import Address from "../Components/Dashboard/Address";
import Faq from "../Components/Dashboard/Faq";

export default function Dashboard(props) {
  const history = useHistory();
  return (
    <div>
      <div className="mar-15">
        <div class="dashboard-right">
          <Switch>
            <Route path={`/dashboard/orders`} component={Orders} />
            <Route path={`/dashboard/cart`} component={Cart} />
            <Route path={`/dashboard/address`} component={Address} />
            <Route path={`/dashboard/faq`} component={Faq} />
            <Route path={`/dashboard`} exact component={Profile} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
