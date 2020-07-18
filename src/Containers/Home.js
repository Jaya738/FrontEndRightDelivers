import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as actionCreators from "../Store/actions/index";

import Header from "../Components/Header/Header";
import "./home.css";
import Footer from "../Components/Footer";
import CategoryList from "../Components/Categories/CategoryList";
import Spinner from "../Components/Common/Spinner";
import StickyCart from "../Components/StickyCart";

function Home(props) {
  const history = useHistory();
  const backUrl = props.location.pathname;
  const [loading, setLoading] = useState(true);
  const curLocation = props.config.curLocation;
  const data = props.config.loadedData;
  useEffect(() => {
    props.setBackUrl(backUrl);
    if (curLocation) {
      props.clearNotification();
      history.push("/" + curLocation);
    }
    setInterval(1000, setLoading(false));
  }, []);
  const homeView = (
    <div>
      <Header />
      <div style={{ marginTop: "60px" }}>
        <div className="mr-3">
          <CategoryList />
        </div>
      </div>
      <div class="bnav">
        <Link to="/">
          <i class="fa fa-home"></i>
        </Link>
        <Link to="/dashboard/cart">
          <i className="fa fa-shopping-cart"></i>
        </Link>
        <Link to="/dashboard">
          <i className="fa fa-user"></i>
        </Link>
        <Link to="/">
          <i className="fa fa-bell"></i>
        </Link>
      </div>
    </div>
  );
  const spinner = (
    <div>
      <Spinner />
    </div>
  );
  return <div>{loading ? spinner : homeView}</div>;
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(actionCreators.loadData()),
    clearNotification: () => dispatch(actionCreators.clearNotification()),
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
