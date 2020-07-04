import React from "react";
import { connect } from "react-redux";

import CategoryItem from "./CategoryItem";

function CategoryList(props) {
  const services = props.services;

  return (
    <div className="section145">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title-tt">
              <div className="main-title-left">
                <span>Shop By</span>
                <h2>Categories</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5 mr-auto">
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
    services: state.config.services,
  };
};

export default connect(mapStateToProps)(CategoryList);
