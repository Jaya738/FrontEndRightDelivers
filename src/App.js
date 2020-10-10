import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { subscribeToSockets, fetchWithTimeout } from "./api";
import { Switch, Route } from "react-router-dom";
import * as actionCreators from "./Store/actions/index";
import { baseUrl } from "./config";

//lazy routes
const SignUp = React.lazy(() => import('./Containers/SignUp'));
const Home = React.lazy(() => import('./Containers/Home'));
const ProductList = React.lazy(() => import('./Components/Products/ProductList'));
const More = React.lazy(() => import('./Components/More/Morev2'));
const Dashboard = React.lazy(() => import('./Containers/Dashboard'));
const Checkout = React.lazy(() => import('./Components/Checkout/Checkout'));
const RListNew = React.lazy(() => import('./Components/Restaurants/RListNew'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));
const Notifications = React.lazy(() => import('./Components/Notifications/Notifications'));
const AddAddressFromMap = React.lazy(() => import('./Components/Maps/AddAddressFromMap'));
const ConfigureAddress = React.lazy(() => import('./Components/Dashboard/Address'));
const Rating = React.lazy(() => import('./Components/Common/Rating'));

function App(props) {
  const [disconnected, setDisconnected] = useState(false);
  const reload = () => {
    if (navigator.onLine) {
      loadConfigData();
    } else {
      setDisconnected(true);
    }
  };

  useEffect(() => {
    console.log(navigator.onLine);
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiUrl = baseUrl + "configs";
  const loadConfigData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey || "",
        dKey: props.config.authData.dKey || "",
        ftoken: localStorage.getItem("ftoken") || "",
      },
    };

    const res = await (await fetchWithTimeout(apiUrl, options, 3000)).json();
    if (res) {
      props.updateConfigData(res);
      props.setActiveOrders(res);
      props.setAddressList(res.address);
      const usrid = res.user && res.user.length > 0 ? res.user[0].userid : "";
      if (props.config.isAuth) {
        subscribeToSockets(usrid);
      }
    }
  };
  return (
    <>
      {!disconnected && (
        <div className="" style={{ overflowX: "hidden" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/login" component={SignUp} />
              {/* <Route exact path="/welcome" component={Welcome} /> */}
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/addaddress" component={AddAddressFromMap} />
              <Route
                exact
                path="/configure-address"
                component={ConfigureAddress}
              />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/more" component={More} />
              <Route exact path="/rating" component={Rating} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/checkout" component={Checkout} />
              <Route exact path="/:location" component={Home} />
              <Route exact path="/:location/:service" component={RListNew} />
              <Route
                exact
                path="/:location/:service/:restaurant"
                component={ProductList}
              />
            </Switch>
          </Suspense>
           </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateConfigData: (payload) =>
      dispatch(actionCreators.updateConfigData(payload)),
    setActiveOrders: (payload) =>
      dispatch(actionCreators.setActiveOrders(payload)),
    setAddressList: (payload) =>
      dispatch(actionCreators.setAddressList(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
