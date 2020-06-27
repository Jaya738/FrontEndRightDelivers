import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RestaurantItem from "./RestaurantItem";
import Header from "../Header/Header";

function RestaurantList(props) {
  const step = 8;
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const getData = () => {
    setIndex(index + step);
    const newProds = props.restaurants.items.slice(index, index + step);
    setItems((prevState) => prevState.concat(newProds));
  };
  useEffect(() => {
    getData();
    setLoadMore(false);
  }, [loadMore]);

  return (
    <>
      <Header />
      <div className="all-product-grid">
        <div className="container">
          <div className="main-title-tt">
            <div className="main-title-left">
              <span>Shop items in</span>
              <h2>Restaurants</h2>
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
}
const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurant,
  };
};

export default withRouter(connect(mapStateToProps)(RestaurantList));
