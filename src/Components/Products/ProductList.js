import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header/Header";
import StickyCart from "../StickyCart";
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
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getData();
    setLoadMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore, filteredProds]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  useEffect(() => {
    filterProds(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setLoadMore(true);
      setLoading(false);
    }
  };
  const handleVeg = () => {
    setVegOnly(!vegOnly);
  };
  const handleReset = () => {
    setFilteredProds(allProds);
    setVegOnly(false);
    setSelectedItem(0);
  };

  const filterProds = (id) => {
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
        fontSize: "12px",
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
      <span className="veg-btn">Veg Only</span>
      <label className="switch">
        <input type="checkbox" checked={vegOnly} onChange={handleVeg} />
        <span className="slider round"></span>
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
      {props.cart.cartItems.length > 0 && <StickyCart />}
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
              <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="product-list-view">
                    <div className="row">
                      {items.map((item) => (
                        <ProductNew data={item} key={item.pid} />
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
    cart: state.cart,
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
