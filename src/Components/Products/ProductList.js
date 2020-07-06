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
  const rcats = [{ id: "0", name: "All" }].concat(props.config.rcats);
  const [uniqueCats, setUniqueCats] = useState([]);
  const [selectedItem, setSelectedItem] = useState(rcats[0].id);
  const [allProds, setAllProds] = useState([]);
  const [filteredProds, setFilteredProds] = useState([]);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const baseUrl = props.config.baseUrl;
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const getData = () => {
    let newProds = [];
    if (filteredProds.length < step) {
      newProds = filteredProds;
    } else {
      newProds = filteredProds.slice(index, index + step);
      if (newProds.length > 0) {
        setIndex(index + step);
      }
    }
    setItems((prevState) => prevState.concat(newProds));
  };
  useEffect(() => {
    loadProducts();
    console.log(props.match);
  }, []);
  useEffect(() => {
    getData();
    setLoadMore(false);
  }, [loadMore, filteredProds]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const getAvailableCats = (cats) => {
    const uniq = rcats.filter((uitem) => cats.includes(uitem.id));
    setUniqueCats([{ id: "0", name: "All" }].concat(uniq));
  };
  const last = "0";
  const apiUrl =
    baseUrl +
    props.match.params.service +
    "/items?rid=" +
    props.match.params.restaurant +
    "&last=" +
    last;

  const loadProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 0) {
      setItems([]);
    }
    if (res && res.status === 1) {
      // props.updateProducts(res);
      setAllProds(res.items);
      setFilteredProds(res.items);
      const cats = [...new Set(res.items.map((item) => item.catid))];
      getAvailableCats(cats);
      setLoading(false);
      setLoadMore(true);
    }
  };

  const filterProds = (id) => {
    setIndex(0);
    setSelectedItem(id);
    if (id == 0) {
      setFilteredProds([...allProds]);
    } else {
      setFilteredProds(allProds.filter((x) => x.catid === id));
    }
    setItems([]);
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    getData();
  };
  const spinner = (
    <div
      style={{
        color: "#d30013",
        fontSize: "20px",
        padding: "40px",
        marginTop: "20%",
        textAlign: "center",
      }}
    >
      loading...
    </div>
  );
  const noItems = (
    <div
      style={{
        color: "#d30013",
        fontSize: "20px",
        padding: "40px",
        marginTop: "20%",
        textAlign: "center",
      }}
    >
      No Restaurants in this Branch yet...
    </div>
  );
  return (
    <>
      <Header />
      <StickyCart />
      {loading ? (
        spinner
      ) : (
        <div className="all-product-grid" style={{ marginTop: "60px" }}>
          <div className="container">
            <ProductCategoryList
              rcats={uniqueCats}
              handleSelectItem={filterProds}
              selected={selectedItem}
            />
            {items.length > 0 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="product-list-view">
                    <div className="row">
                      {items.map((item) => (
                        <Product data={item} key={item.pid} />
                      ))}
                    </div>
                    {/*
                <div className="col-md-12">
                  <div className="more-product-btn">
                    <button className="show-more-btn hover-btn" onClick={getData}>
                      Show More
                    </button>
                  </div>
                </div>
                */}
                  </div>
                </div>
              </div>
            ) : (
              noItems
            )}
          </div>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    /* updateProducts: (payload) =>
      dispatch(actionCreators.updateProducts(payload)),*/
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
