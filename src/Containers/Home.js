import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actionCreators from "../Store/actions/index";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import CategoryList from "../Components/Categories/CategoryList";
import Spinner from "../Components/Common/Spinner";
import StickyCart from "../Components/StickyCart";

function Home(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const curLocation = props.config.curLocation;
  const data = props.config.loadedData;
  useEffect(() => {
    if (curLocation) {
      props.clearNotification();
      history.push("/" + curLocation);
    }
  }, []);
  const homeView = (
    <div>
      <Header />

      <StickyCart />
      <div className="mr-3">
        <CategoryList />
      </div>

      <Footer />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
