import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RestaurantItem from "./RestaurantItem";
import Header from "../Header/Header";
import StickyCart from "../StickyCart";
import * as actionCreators from "../../Store/actions/index";

function RestaurantList(props) {
  const step = 8;
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const getData = () => {
    setIndex(index + step);
    const newProds = props.restaurants.items.slice(index, index + step);
    setItems((prevState) => prevState.concat(newProds));
  };
  useEffect(() => {
    loadRestaurants();
  }, []);
  useEffect(() => {
    getData();
    setLoadMore(false);
  }, [loadMore]);
  const apiUrl =
    "https://api.rightdelivers.in/user/api/v1/restaurants/?branch=1";
  const loadRestaurants = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res) {
      props.updateRestaurants(res);
      setLoading(false);
    }
  };
  const loadSpinner = <p>loading...</p>;
  const afterLoading = (
    <>
      <Header />
      <StickyCart />
      <div style={{ marginTop: "60px" }} className="all-product-grid">
        <div className="container">
          <div className="main-title-tt">
            <div className="main-title-left">
              <span>Shop items in</span>
              <h3>Restaurants</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-list-view">
                <div className="row">
                  {items.map((item) => (
                    <RestaurantItem data={item} />
                  ))}
                </div>
                <div class="col-md-12">
                  <div class="more-product-btn">
                    <button class="show-more-btn hover-btn" onClick={getData}>
                      Show More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return <>{loading ? loadSpinner : afterLoading}</>;
}
const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateRestaurants: (payload) =>
      dispatch(actionCreators.updateRestaurants(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantList)
);
