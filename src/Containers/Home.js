import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as actionCreators from "../Store/actions/index";

import Header from "../Components/Header/Header";
import "./home.css";
import CategoryList from "../Components/Categories/CategoryList";
import Spinner from "../Components/Common/Spinner";

function Home(props) {
  const history = useHistory();
  const backUrl = props.location.pathname;
  const [loading, setLoading] = useState(true);
  const curLocation = props.config.curLocation;
  // const data = props.config.loadedData;
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    if (!props.config.isAuth) {
      history.push("/login");
      return;
    }
  }, []);
  useEffect(() => {
    props.setBackUrl(backUrl);
    if (curLocation) {
      props.clearNotification();
      history.push("/" + curLocation);
    }
  }, []);
  const homeView = (
    <div>
      <Header />
      <div class="ColorBg"></div>
      <div style={{ marginTop: "60px" }}>
        <div className="">
          <CategoryList />
        </div>
      </div>
      <div class="footer-nav-area" id="footerNav">
        <div class="container h-100 px-0">
          <div class="suha-footer-nav h-100">
            <ul class="h-100 d-flex align-items-center justify-content-between pl-0">
              <li>
                <Link to="/">
                  <i class="fa fa-home"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/cart">
                  <i class="fa fa-shopping-cart"></i>Cart
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i class="fa fa-user"></i>Profile
                </Link>
              </li>
              <li>
                <Link to="/more">
                  <i class="fa fa-ellipsis-h"></i>More
                </Link>
              </li>
            </ul>
          </div>
        </div>
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
