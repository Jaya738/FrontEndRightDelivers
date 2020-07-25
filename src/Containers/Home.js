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
              <li class="active">
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
                <Link to="/">
                  <i class="fa fa-ellipsis-h"></i>More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div class="bnav d-flex">
        <Link to="/">
          <div className="menu-item-inner">
            <i class="fa fa-home"></i>

            <span>Home</span>
          </div>
        </Link>
        <Link to="/dashboard/cart">
          <div className="menu-item-inner">
            <i className="fa fa-shopping-cart"></i>

            <span>Cart</span>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="menu-item-inner">
            <i className="fa fa-user"></i>

            <span>Cart</span>
          </div>
        </Link>
        <Link to="/">
          <div className="menu-item-inner">
            <i className="fa fa-ellipsis-h icon-size"></i>

            <span className="text-size">More</span>
          </div>
        </Link>
      </div>
      */}
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
