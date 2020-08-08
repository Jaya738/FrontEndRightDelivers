import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import item1 from "./banner-1.svg";
import item2 from "./banner-2.png";
import item3 from "./banner-3.svg";
import LazyImage from "../Common/LazyImage";
import dummy from "./dummy.png";
import CategoryItem from "./CategoryItem";
import "./ribbon.css";

function CategoryList(props) {
  const services = props.config.services;
  const [loading, setLoading] = useState(true);
  const bannerList = [item1, item2, item3];
  const bannerItems = bannerList.map((image) => {
    let imgLoaded = false;
    const imgContainer = {
      backgroundImage: `url(${dummy})`,
      width: "100%",
      height: "auto",
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
          <div className="col-md-12 mt-5 br-3" style={{ position: "fixed" }}>
            <Carousel>{bannerItems}</Carousel>
          </div>
        </div>
        <div class="main-title-left">
          <h2></h2>
        </div>
        <div
          className="row mb-5 mr-auto mb-5"
          style={{ width: "100vw", marginTop: "44vh" }}
        >
          {Object.keys(services).map((key) => (
            <CategoryItem category={services[key]} />
          ))}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    curLocation: state.config.curLocation,
    config: state.config,
  };
};

export default connect(mapStateToProps)(CategoryList);
