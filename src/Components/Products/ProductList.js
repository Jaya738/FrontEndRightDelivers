import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Product from "./Product";
import Header from "../Header/Header";
import StickyCart from "../StickyCart";
import ProductCategoryList from "./ProductCategoryList";
import * as actionCreators from "../../Store/actions/index";

function ProductList(props) {
  const step = 8;
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const getData = () => {
    setIndex(index + step);
    const newProds = props.product.items.slice(index, index + step);
    setItems((prevState) => prevState.concat(newProds));
  };
  useEffect(() => {
    loadProducts();
    console.log(props.match);
  }, []);
  useEffect(() => {
    getData();
    setLoadMore(false);
  }, [loadMore]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  const last = "0";
  const apiUrl =
    "https://api.rightdelivers.in/user/api/v1/restaurants/items?rid=9&last=" +
    last;
  const loadProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res) {
      props.updateProducts(res);
      setItems(res.items);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    getData();
  };
  return (
    <>
      <Header />
      <StickyCart />

      <div className="all-product-grid" style={{ marginTop: "60px" }}>
        <div className="container">
          <ProductCategoryList />

          <div className="row">
            <div className="col-lg-12">
              <div className="product-list-view">
                <div className="row">
                  {items.map((item) => (
                    <Product data={item} />
                  ))}
                </div>
                {/*
                <div class="col-md-12">
                  <div class="more-product-btn">
                    <button class="show-more-btn hover-btn" onClick={getData}>
                      Show More
                    </button>
                  </div>
                </div>
                */}
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
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProducts: (payload) =>
      dispatch(actionCreators.updateProducts(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
