import React from "react";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";
import item1 from "./banner-1.svg";
import item2 from "./banner-2.png";
import item3 from "./banner-3.svg";
import CategoryItem from "./CategoryItem";
import "./ribbon.css";

function CategoryList(props) {
  const services = props.config.services;

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 br-3">
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={item3} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={item2} alt="second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={item1} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
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
