import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Product from "./Product";
import Header from "../Header/Header";
//import StickyCart from "../StickyCart";
import ProductCategoryList from "./ProductCategoryList";
import ProductNew from "./ProductNew";
import Spinner from "../Common/Spinner";
import MblNavbar from "../MblNavbar";

function ProductList(props) {
  const step = 8;
  const history = useHistory();
  const rcats = props.config.rcats;
  const [uniqueCats, setUniqueCats] = useState([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const [allProds, setAllProds] = useState([]);
  const [filteredProds, setFilteredProds] = useState([]);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const baseUrl = props.config.baseUrl;
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    let newProds = [];
    if (items.length === filteredProds.length) {
      return;
    }
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
    setLoading(true);
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
  useEffect(() => {
    setLoading(true);
    console.log(loading);
    filterProds(selectedItem);
  }, [vegOnly]);

  const getAvailableCats = (cats) => {
    const uniq = rcats.filter((uitem) => cats.includes(uitem.id));
    setUniqueCats(uniq);
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
  const handleVeg = () => {
    setLoading(true);
    setVegOnly(!vegOnly);
  };
  const handleReset = () => {
    setFilteredProds(allProds);
    setVegOnly(false);
    setSelectedItem(0);
  };

  const filterProds = (id) => {
    console.log(id);
    setLoading(true);
    setIndex(0);
    setItems([]);
    setSelectedItem(id);
    let updatedProd = [];
    if (vegOnly) {
      if (id === 0) {
        setFilteredProds([...allProds.filter((x) => x.type === 1)]);
      } else {
        updatedProd = allProds.filter((x) => x.catid === id && x.type === 1);
        setFilteredProds(updatedProd);
      }
    } else {
      if (id === 0) {
        updatedProd = allProds.filter((x) => true);
        setFilteredProds(updatedProd);
      } else {
        updatedProd = allProds.filter((x) => x.catid === id);
        setFilteredProds(updatedProd);
      }
    }
    setInterval(500, setLoading(false));
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
    <div>
      <Spinner />
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
      No Products in this Category
    </div>
  );
  const vegBtn = (
    <div className="vegBtn">
      <span class="veg-btn">Veg Only</span>
      <label class="switch">
        <input type="checkbox" checked={vegOnly} onChange={handleVeg} />
        <span class="slider round"></span>
      </label>
    </div>
  );
  return (
    <>
      <div className="d-none d-sm-block">
        <Header />
      </div>
      <div className="d-block d-sm-none">
        <MblNavbar heading="Products" back={() => history.goBack()} />
      </div>
   
      {loading ? (
        spinner
      ) : (
        <div className="all-product-grid mar-15">
          <div className="container">
            {vegBtn}
            <ProductCategoryList
              rcats={uniqueCats}
              handleSelectItem={filterProds}
              selected={selectedItem}
              handleReset={handleReset}
            />
            {items.length > 0 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="product-list-view">
                    <div className="row">
                      {items.map((item) => (
                        <>
                          <ProductNew data={item} key={item.pid} />
                          <Product data={item} key={item.pid} />
                        </>
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
