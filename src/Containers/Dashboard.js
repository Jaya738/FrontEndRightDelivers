import React,{useEffect} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {connect} from "react-redux"
import Profile from "../Components/Dashboard/Profile";
import Orders from "../Components/Dashboard/Orders";
import Cart from "../Components/Dashboard/Cart";
import Address from "../Components/Dashboard/Address";
import Faq from "../Components/Dashboard/Faq";


function Dashboard(props) {
  const history = useHistory();
  useEffect(() => {
    if (!props.config.isAuth) {
      history.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div style={{marginTop:"12vh"}}>
        <div className="dashboard-right">
          <Switch>
            <Route path={'/dashboard/chat'} component={() => { 
     window.location.href = 'https://tawk.to/chat/5f33eb1a4c7806354da5cef8/default'; 
     return null;
}} />
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

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};

export default connect(mapStateToProps)(Dashboard);

