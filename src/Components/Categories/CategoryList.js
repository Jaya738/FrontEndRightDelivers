import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import item1 from "./banner-1.svg";
import item2 from "./banner-2.png";
import item3 from "./banner-3.svg";
import Search from "../Common/Search/Search";
import CategoryItem from "./CategoryItem";
import "./ribbon.css";
import ActiveOrders from "../Orders/ActiveOrders";

function CategoryList(props) {
  const services = props.config.services;
  const [loading, setLoading] = useState(true);
  const bannerList = [item1, item2, item3];
  const bannerItems = bannerList.map((image) => {
    let imgLoaded = false;
    const imgContainer = {
      backgroundColor: "grey",
      width: "100%",
      height: "24.5vh",
    };
    return (
      <Carousel.Item>
        <div style={imgContainer}>
          <Image onLoad={() => (imgLoaded = true)} src={image} alt="" fluid />
        </div>
      </Carousel.Item>
    );
  });
  return (
    <div className="">
      <div className="container">
        <div className="row">
          {/* <div
            className="col-md-12 mt-5 br-3"
            style={{ position: "fixed", marginTop: "5vh" }}
          >
            <Search />
          </div> */}
          <div
            className="col-md-12 br-3"
            style={{ position: "fixed", zIndex: "9999", marginTop: "10vh" }}
          >
            <Carousel>{bannerItems}</Carousel>
          </div>
        </div>
        <div style={{ marginTop: "44vh" }}>
          {props.orders.activeOrders.length > 0 && (
            <ActiveOrders orders={props.orders} />
          )}
          <div className="row mb-5 mr-auto mb-5" style={{ width: "100vw" }}>
            {Object.keys(services).map((key) => (
              <CategoryItem category={services[key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    curLocation: state.config.curLocation,
    config: state.config,
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(CategoryList);
