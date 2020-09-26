import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import image from "./restaurant.svg";
import * as actionCreators from "../../Store/actions/index";
import "./restaurants.css";
import { imgUrl } from "../../config";

function RestaurantItem(props) {
  //const restaurant = { ...props.data };
  const [isClosed, setIsClosed] = useState(true);
  const backUrl = props.location.pathname;
  const history = useHistory();
  // const sendProduct = () => {
  //   props.setCurProduct(restaurant);
  // };
  useEffect(() => {
    let timeData = {};
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var d = new Date();
    const time = d.getHours();
    if (d.getDay() === 0) {
      timeData = JSON.parse(props.data.time)[6];
    } else {
      timeData = JSON.parse(props.data.time)[d.getDay() - 1];
    }

    if (timeData[days[d.getDay()]] === "o") {
      if (
        (time >= +timeData.t1.slice(0, 2) && time < +timeData.t2.slice(0, 2)) ||
        (time >= +timeData.t3.slice(0, 2) && time < +timeData.t4.slice(0, 2))
      ) {
        setIsClosed(false);
      } else {
        setIsClosed(true);
      }
    } else {
      setIsClosed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectRestaurant = () => {
    if (!isClosed) {
      history.push(props.match.url + "/" + props.data.id);
      props.setBackUrl(backUrl);
      const payload = {
        ...props.data,
      };
      props.setCurRestaurant(payload);
      props.setCurService(payload);
    }
  };
  //const starCol = { color: "gold" };
  return (
    <div className="col col-12 col-sm-6 col-md-4 ">
      <div
        onClick={selectRestaurant}
        style={{ opacity: isClosed ? "0.5" : "1" }}
      >
        <div
          className="row align-items-center rest-item no-gutters mb-4"
          style={{ boxShadow: "0px 3px 4px 2px rgba(0, 0, 0, .14)" }}
        >
          <div className="col col-3 col-sm-4 p-2 mt-2 mb-2">
            <Image
              src={
                props.data.pic
                  ? imgUrl + "restaurants/shops/" + props.data.pic
                  : image
              }
              style={{
                borderRadius: "3px",
                width: "90px",
                height: "70px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col col-9 col-sm-8 p-3 pl-4">
            <div>
              <span className="rest-name">{props.data.name}</span> <br />
              <span className="sub-text">{props.data.disc}</span> <br />
            </div>
            <div>
              {/* <span style={{ fontSize: "12px" }}>
              <span
                className="fa fa-star"
                style={{ color: "gold",paddingRight: "3px" }}
              ></span>
             <span className="sub-text"> {props.data.rat}  </span>

            </span> */}
              <span
                style={{
                  fontSize: "9px",
                  color: "white",
                  backgroundColor: "#2f4f4f",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                <span>{props.data.rat}</span>
                <span
                  className="fa fa-star"
                  style={{ color: "white", paddingLeft: "3px" }}
                ></span>
              </span>
              <span className="pl-2 pr-2" style={{ color: "grey" }}>
                |
              </span>
              {isClosed ? (
                <span className="sub-text" style={{ color: "#d30013" }}>
                  Closed
                </span>
              ) : (
                <span className="sub-text" style={{ color: "green" }}>
                  Open
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurRestaurant: (payload) =>
      dispatch(actionCreators.setCurRestaurant(payload)),
    setCurService: (payload) => dispatch(actionCreators.setCurService(payload)),
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(RestaurantItem));
