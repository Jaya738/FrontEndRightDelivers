import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Toast } from "react-bootstrap";
import { subscribeToSockets, fetchWithTimeout } from "./api";
import { Switch, Route } from "react-router-dom";
import * as actionCreators from "./Store/actions/index";
import { baseUrl } from "./config";
import Rating from "./Components/Common/Rating";

//lazy routes
const SignUp = lazy(() => import('./Containers/SignUp'));
const Home = lazy(() => import('./Containers/Home'));
const ProductList = lazy(() => import('./Components/Products/ProductList'));
const More = lazy(() => import('./Components/More/Morev2'));
const Dashboard = lazy(() => import('./Containers/Dashboard'));
const Checkout = lazy(() => import('./Components/Checkout/Checkout'));
const RListNew = lazy(() => import('./Components/Restaurants/RListNew'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const Notifications = lazy(() => import('./Components/Notifications/Notifications'));
const AddAddressFromMap = lazy(() => import('./Components/Maps/AddAddressFromMap'));
const ConfigureAddress = lazy(() => import('./Components/Dashboard/Address'));
const Package = lazy(() => import('./Components/Packages/Package'));
const AddAnyAddress = lazy(() => import('./Components/Packages/AddAnyAddress'));

function App(props) {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [disconnected, setDisconnected] = useState(false);
  const [rating,setRating] = useState(0);
  const [showRating, setShowRating] = useState(props.orders.ratings?.length > 0 || false);

  const reload = () => {
    if (navigator.onLine) {
      loadConfigData();
    } else {
      setDisconnected(true);
    }
  };

  const saveRating = async (rat) => {
    const ratingUrl = baseUrl + "order/rate";
    setRating(rat)
    setShowRating(false)
    const data={
      rating: rat,
      order_id: props.orders.ratings[0].ordid
    }
    //save data to api
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey || "",
        dKey: props.config.authData.dKey || "",
        ftoken: localStorage.getItem("ftoken") || "",
      },
      body: JSON.stringify(data),
    };

    const res = await (await fetchWithTimeout(ratingUrl, options, 3000)).json();
    if (res) {
      setError(res.msg)
      setShowToast(true)
    }
  }
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

  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={2000}
      autohide
      style={{
        position: "fixed",
        bottom: "20vh",
        zIndex: "999",
        textAlign: "center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Toast.Body
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          borderBottom: "none",
          textAlign: "center",
          padding: "0.2rem 0.8rem",
        }}
      >
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Body>
    </Toast>
  );

  return (
    <>
      {showRating && (
        <div className="rating-box">
          <Rating order={props.orders.ratings[0]} setRating={(rat)=>saveRating(rat)} onClose = {()=> saveRating(false)} />
        </div>
      )}
      {errorToast}
      {!disconnected && (
        <div className="" style={{ overflowX: "hidden" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/login" component={SignUp} />
              {/* <Route exact path="/welcome" component={Welcome} /> */}
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/addaddress" component={AddAddressFromMap} />
              <Route exact path="/pickaddress" render={()=><AddAnyAddress addressSource="pickup" />} />
              <Route exact path="/dropaddress" render={()=><AddAnyAddress addressSource="drop" />} />
              <Route
                exact
                path="/configure-address"
                component={ConfigureAddress}
              />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/more" component={More} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/checkout" component={Checkout} />
              <Route exact path="/:location" component={Home} />
              <Route exact path="/:location/packages" component={Package} />
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
    orders: state.orders
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
