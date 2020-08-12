import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import image from "./restaurant.svg";
import * as actionCreators from "../../Store/actions/index";
import "./restaurants.css";

function RestaurantItem(props) {
  const restaurant = { ...props.data };
  const [isClosed,setIsClosed]=useState(false)
  const backUrl = props.location.pathname;
  const sendProduct = () => {
    props.setCurProduct(restaurant);
  };
  useEffect(()=>{
    let timeData={}
    var d = new Date();
    const time= d.getHours();
    if(d.getDay===0){
      timeData=JSON.parse(props.data.time)[6]
    }
    else{
      timeData = JSON.parse(props.data.time)[d.getDay()-1]
    } 
    if((time >= timeData.t1 && time < timeData.t2) || (time >= timeData.t3 && time < timeData.t4)){
      setIsClosed(false)
    }
    else{
      setIsClosed(true)
    }
  },[])
  const selectRestaurant = () => {
    props.setBackUrl(backUrl);
    const payload = {
      ...props.data,
    };
    props.setCurRestaurant(payload);
  };
  const starCol = { color: "gold" };
  return (
    <div className="col col-12 col-sm-6 col-md-4 ">
      <Link
        to={{
          pathname: props.match.url + "/" + props.data.id,
        }}
        onClick={selectRestaurant}
      >
        <div className="row align-items-center rest-item no-gutters mb-4" style={{boxShadow: "0px 3px 4px 2px rgba(0, 0, 0, .14)"}}>
          <div className="col col-3 col-sm-4 p-2 mt-2 mb-2">
            <Image
              src={
                props.data.pic
                  ? "https://rightdelivers.in/uploads/restaurants/shops/" +
                    props.data.pic
                  : image
              }
		
        	style={{borderRadius:"3px",width:"90px",height:"70px",objectFit:"cover"}}
             
            />
          </div>
          <div className="col col-9 col-sm-8 p-3 pl-4">
	<div>
            <span className="rest-name">{props.data.name}</span> <br />
            <span className="sub-text">{props.data.disc}</span> <br />
            
          </div>
	<div>
<span style={{ fontSize: "12px" }}>
              <span
                class="fa fa-star"
                style={{ color: "gold",paddingRight: "3px" }}
              ></span>
             <span className="sub-text"> {props.data.rat}  </span>

            </span>
<span className="pl-2 pr-2" style={{color:"grey"}}>|</span>
{isClosed ? (<span className="sub-text" style={{color:"#d30013"}}>
              Closed
            </span>) : (<span className="sub-text" style={{color:"green"}}>
              
              Open
            </span>)}
            
	</div>
</div>
        </div>
      </Link>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurRestaurant: (payload) =>
      dispatch(actionCreators.setCurRestaurant(payload)),
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(RestaurantItem));
