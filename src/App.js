import React, { Component } from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Store from "./Store/configStore";
import SignIn from "./Containers/SignIn";
import SignUp from "./Containers/SignUp";
import Home from "./Containers/Home";
import ProductList from "./Components/Products/ProductList";
import RestaurantList from "./Components/Restaurants/RestaurantList";
import Dashboard from "./Containers/Dashboard";
import ProductDetail from "./Components/Products/ProductDetail";
import Checkout from "./Components/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/:location" component={Home} />
            <Route
              exact
              path="/:location/:serviceId"
              component={RestaurantList}
            />
            <Route
              exact
              path="/:location/:serviceId/:restaurantId"
              component={ProductList}
            />
            <Route
              exact
              path="/:location/:serviceId/:restaurantId/:productId"
              render={() => <ProductDetail />}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}
export default App;
