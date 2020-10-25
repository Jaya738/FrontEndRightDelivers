import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header/Header";
import StickyCart from "../StickyCart";
import ProductCategoryList from "./ProductCategoryList";
import ProductNew from "./ProductNew";
import Spinner from "../Common/Spinner";
// import MblNavbar from "../Common/MblNavbar";
import { Image } from "react-bootstrap";
import { imgUrl } from "../../config";
import {fetchWithTimeout} from '../../api';
import Search from "../Common/Search/Search";
import fssai from "../../Assets/fssai.svg";

function ProductList(props) {
  const step = 8;
  const allowedVegServices = [1,3];
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const rcats = props.config.rcats;
  const [showHeader, setShowHeader] = useState(false);
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


  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
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

    const res = await (await fetchWithTimeout(apiUrl, options)).json();
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
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
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
  const navStyle = {
    position: "fixed",
    padding: "0.5rem 1rem",
    top: "0",
    width: "100%",
    backgroundColor: "#2F4F4F",
    zIndex: "10",
  };
  const head = (
    <>
      <div className="row align-items-center">
        <div className="col col-12 col-sm-4" style={{ position: "relative" }}>
          <Image
            src={
              props.config.curService.pic &&
              imgUrl + "restaurants/shops/" + props.config.curService.pic
            }
            style={{
              borderRadius: "3px",
              width: "100%",
              height: "15vh",
              objectFit: "cover",
              opacity: "0.7",
            }}
          />
          <span
            onClick={() => history.goBack()}
            style={{
              fontSize: "20px",
              // backgroundColor:"black",
              color: "black",
              padding: "20px",
              position: "relative",
              bottom: "55px",
              marginBottom: "-55px",
              marginTop: "2vh",
            }}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div className="row m-2">
        <div className={`col ${allowedVegServices.includes(items[0]?.stype || 0) ? "col-9" : "col-12" } pl-3 pr-3`}>
          <div className="row">
            <div
              className="col col-12"
              style={{
                fontSize: "16px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div>{props.config.curService.name}</div>
            </div>
          </div>
          <div className="row">
            <div
              className="col col-12 align-self-center"
              style={{
                fontSize: "12px",
                color: "grey",
                marginTop: "5px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {props.config.curService.disc}
            </div>
          </div>
        </div>
        {items.length > 0 && allowedVegServices.includes(items[0]?.stype || 0) && (<div className="col col-3 pl-2">
          <span className="veg-btn">Veg Only</span>
          <label className="switch">
            <input type="checkbox" checked={vegOnly} onChange={handleVeg} />
            <span className="slider round"></span>
          </label>
        </div>
        )}
      </div>
    </>
  );
  return (
    <>
      <div className="d-none d-sm-block">
        <Header />
      </div>
      {showHeader && (
        <div className="fixed-top align-middle container" style={navStyle}>
          <div
            className="row"
            style={{
              paddingTop: "4vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="col col-1"
              onClick={() => history.goBack()}
              style={{
                fontSize: "20px",
                color: "white",
              }}
            >
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            <div
              className="col col-9"
              style={{
                fontSize: "14px",
                color: "white",
              }}
            >
              {props.config.curService.name}
            </div>
          </div>
        </div>
      )}
      {props.cart.cartItems.length > 0 && <StickyCart price={"350"} />}
      {loading ? (
        spinner
      ) : (
        <div className="">
          {head}
          <div className="container">
            <ProductCategoryList
              rcats={uniqueCats}
              handleSelectItem={filterProds}
              selected={selectedItem}
              handleReset={handleReset}
            />
            <Search
              displayText={`Search Items`}
              handleSearch={handleSearch}
              onClear={() => setSearchInput("")}
              value={searchInput}
            />
            {items.length > 0 ? (
              <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="product-list-view">
                    <div className="row">
                      {items
                        .filter((data) => {
                          if (searchInput === "") {
                            return data;
                          }
                          if (
                            data.name
                              .toLowerCase()
                              .includes(searchInput.toLowerCase()) ||
                            data.sdesc
                              .toLowerCase()
                              .includes(searchInput.toLowerCase())
                          ) {
                            return data;
                          }
                        })
                        .map((item) => (
                          <ProductNew data={item} key={item.pid} />
                        ))}
                    </div>

                    <div className="col-md-12">
                      <div
                        className="more-product-btn"
                        style={{ fontSize: "12px", margin: "0px 0px" }}
                      >
                        <Image
                          src={fssai}
                          style={{ width: "50px" }}
                          fluid
                          alt="FSSAI"
                        />
                        <span>License No. {props.config.curService.fssai}</span>
                      </div>
                    </div>
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
    restaurant: state.restaurant,
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
