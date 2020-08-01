import React from "react";
import { connect } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import item1 from "./banner-1.svg";
import item2 from "./banner-2.png";
import item3 from "./banner-3.svg";
import preloaderImage from "../Common/spinner2.svg";
import CategoryItem from "./CategoryItem";
import "./ribbon.css";

function CategoryList(props) {
  const services = props.config.services;
  const bannerList = [item1, item2, item3, item1, item2, item3];

  const bannerItems = bannerList.map((image) => {
    const imageStyle = {
      backgroundImage: `url(${image}), url(${preloaderImage});`,
    };
    return (
      <Carousel.Item>
        <div>
          <img className="w-100" src={image || preloaderImage} />
        </div>
      </Carousel.Item>
    );
  });
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 br-3">
            <Carousel>{bannerItems}</Carousel>
          </div>
        </div>
        <div class="main-title-left">
          <h2></h2>
        </div>
        <div className="row mb-5 mr-auto mt-3 mb-5" style={{ width: "100vw" }}>
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
