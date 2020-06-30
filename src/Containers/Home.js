import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../Store/actions/index";
import Notification from "../Components/Notification";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import CategoryList from "../Components/Categories/CategoryList";
import Spinner from "../Components/Common/Spinner";
import StickyCart from "../Components/StickyCart";

function Home(props) {
  const [loading, setLoading] = useState(false);
  const data = props.config.loadedData;
  useEffect(() => {}, []);

  const homeView = (
    <div>
      <Header />
      <Notification />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
