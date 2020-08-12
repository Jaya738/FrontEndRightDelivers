import React,{useState} from "react";
import MblNavbar from "../MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory, withRouter, Link } from "react-router-dom";
import { Accordion, cardTest } from "react-bootstrap";
import ShowOrders from "../Dashboard/ShowOrders";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import Faq from "../Dashboard/Faq";
import "./More.css";
import { Toast } from "react-bootstrap";

function Morev2(props) {
  const [showToast, setShowToast] = useState(false);
  const error = "Coming Soon";
    const moreData=[
        {
            name:"Orders",
            icon:"fa fa-motorcycle icon__1",
            link:"/dashboard/orders",
            isEnabled:true
        },
        {
          name:"Live Chat",
          icon:"far fa-comment icon__1",
          link:"/more",
          isEnabled:true
      },
        {
            name:"Address",
            icon:"fa fa-map-marked-alt icon__1",
            link:"/dashboard/address",
            isEnabled:false
        },
        {
            name:"Faq",
            icon:"fa fa-question-circle  icon__1",
            link:"/dashboard/faq",
            isEnabled:false
        },
        
        {
            name:"Settings",
            icon:"fa fa-user-cog icon__1",
            link:"/",
            isEnabled:false
        },

    ]
  const history = useHistory();
  const handleLogout = () => {
    props.logout();
    console.log("logged out");
  };
  const openChatWindow = (d)=>{
    if(d.name === "Live Chat"){
      console.log("clicked chat")
      window.open('https://tawk.to/chat/5f33eb1a4c7806354da5cef8/default')
    }
    setShowToast(true);
  }
  const Support = <div>Support</div>;
  const errorToast = (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={2000}
      autohide
      style={{
        position: "fixed",
        bottom: "20vh",
        zIndex: "999",
        textAlign: "center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Toast.Body
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          borderBottom: "none",
          textAlign: "center",
          padding: "0.2rem 0.8rem",
        }}
      >
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Body>
    </Toast>
  );
  const moreOptions = (
    <div className="Container" style={{ marginTop: "18vh" }}>
      <div className="row m-3">
          {moreData.map((d) => (
        <div className="col col-5 moreBtn">
            <Link onClick={() => openChatWindow(d)} to={d.isEnabled && d.link } style={{color:"white"}}>
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
      {errorToast}
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
