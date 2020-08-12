import React from "react";
import MblNavbar from "../MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory, withRouter, Link } from "react-router-dom";
import { Accordion, cardTest } from "react-bootstrap";
import ShowOrders from "../Dashboard/ShowOrders";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import Faq from "../Dashboard/Faq";
import "./More.css";

function Morev2(props) {
    const moreData=[
        {
            name:"Orders",
            icon:"fa fa-motorcycle icon__1",
            link:"/dashboard/orders"
        },
        {
            name:"Address",
            icon:"fa fa-map-marked-alt icon__1",
            link:"/dashboard/address"
        },
        {
            name:"Faq",
            icon:"fa fa-question-circle  icon__1",
            link:"/dashboard/faq"
        },
        {
            name:"Live Chat",
            icon:"far fa-comment icon__1",
            link:"/dashboard/chat"
        },
        {
            name:"Settings",
            icon:"fa fa-user-cog icon__1",
            link:"/"
        },

    ]
  const history = useHistory();
  const handleLogout = () => {
    props.logout();
    console.log("logged out");
  };
  const Support = <div>Support</div>;
  const moreOptions = (
    <div className="Container" style={{ marginTop: "18vh" }}>
      <div className="row m-3">
          {moreData.map((d) => (
        <div className="col col-5 moreBtn">
            <Link to={d.link} style={{color:"white"}}>
          <i className={`iconStyle ${d.icon}`}></i><br /><span className="textStyle">{d.name}</span>
        </Link>
        </div>
      ))}
        <div className="col col-5 m-auto moreBtn" >
            <Link to="/login" style={{color:"white"}} onSelect={handleLogout}>
          <i className={`iconStyle fa fa-sign-out-alt icon__1`}></i><br /><span className="textStyle">Logout</span>
        </Link>
        </div>
       
      </div>
    </div>
  );
  return (
    <div>
      <MblNavbar heading="More" back={() => history.goBack()} />
      {moreOptions}
      <div className="footer-more-area">
        <span
          style={{
            color: "white",
            bottom: "2vh",
            right: "33%",
            position: "fixed",
          }}
          className=""
        >
          App Version 1.0.1
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Morev2));
