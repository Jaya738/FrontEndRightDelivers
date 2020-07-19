import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import DashHead from "./DashHead";
import SideBar from "./SideBar";
import Profile from "./Profile";
import Orders from "./Orders";
import Cart from "./Cart";
import Address from "./Address";
import Faq from "./Faq";

export default withRouter(function DashHome(props) {
  return (
    <div>
      <DashHead />
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-4">
              <SideBar />
            </div>
            <div class="col-lg-9 col-md-8">
              <div class="dashboard-right">
                <Switch>
                  <Route
                    path={`${props.match.url}/orders`}
                    component={Orders}
                  />
                  <Route path={`${props.match.url}/cart`} component={Cart} />
                  <Route
                    path={`${props.match.url}/address`}
                    component={Address}
                  />
                  <Route path={`${props.match.url}/faq`} component={Faq} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
