import React from "react";
import { connect } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import item1 from "./banner-1.svg";
import item2 from "./banner-2.png";
import item3 from "./banner-3.svg";
//import Search from "../Common/Search/Search";
import CategoryItem from "./CategoryItem";
import "./ribbon.css";
import ActiveOrders from "../Orders/ActiveOrders";

function CategoryList(props) {
  const services = props.config.services;
  //const [loading, setLoading] = useState(true);
  const bannerList = [item1, item2, item3];
  const activeOrders=props.orders.activeOrders || [];
  const bannerItems = (
    <Carousel>
     { bannerList.map((image) => (
      <Carousel.Item key={image}>
        <div style={{
      backgroundColor: "grey",
      minHeight:"180px"
    }}>
          <Image src={image} alt="" fluid />
        </div>
      </Carousel.Item>
    ))}
    </Carousel>
  )
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div
            className="col-md-12 br-3"
            style={{ position: "relative", zIndex: "0", marginTop: "15%" }}
          >
        {bannerItems}
          </div>
        </div>
        <div style={{ marginTop:"8%",marginBottom:"15%"}}>
          {activeOrders.length > 0 && (
            <ActiveOrders orders={props.orders} />
          )}
          <div className="row mb-5 mr-auto mb-5" style={{ width: "100vw" }}>
            {Object.keys(services).map((key,index) => (
              <CategoryItem category={services[key]} key={key} index={index}/>
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
