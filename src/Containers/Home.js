import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as actionCreators from "../Store/actions/index";
import Header from "../Components/Header/Header";
import "./home.css";
import CategoryList from "../Components/Categories/CategoryList";

function Home(props) {
  const history = useHistory();
  const backUrl = props.location.pathname;
  const curLocation = props.config.curLocation;

  useEffect(() => {
    if (!props.config.isAuth) {
      history.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    props.setBackUrl(backUrl);
    if (curLocation) {
      props.clearNotification();
      history.push("/" + curLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const homeView = (
    <div>
      <Header />
      <div className="ColorBg"></div>
      <div style={{ marginTop: "60px" }}>
        <div className="">
          <CategoryList />
        </div>
      </div>
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between pl-0">
              <li>
                <Link to="/">
                  <i className="fa fa-home"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/cart">
                  <i className="fa fa-shopping-cart"></i>Cart
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="fa fa-user"></i>Profile
                </Link>
              </li>
              <li>
                <Link to="/more">
                  <i className="fa fa-ellipsis-h"></i>More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  return <div>{homeView}</div>;
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
    orders: state.orders
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
