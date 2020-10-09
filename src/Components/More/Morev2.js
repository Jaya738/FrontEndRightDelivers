import React, { useState, useEffect } from "react";
import MblNavbar from "../Common/MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory, withRouter } from "react-router-dom";
import "./More.css";
import { Toast } from "react-bootstrap";

function Morev2(props) {
  const [showToast, setShowToast] = useState(false);
  const error = "Coming Soon";
  const moreData = [
    {
      name: "Orders",
      icon: "fa fa-motorcycle icon__1",
      link: "/dashboard/orders",
      isEnabled: true,
    },
    {
      name: "Live Chat",
      icon: "far fa-comment icon__1",
      link: "",
      isEnabled: true,
    },
    {
      name: "Address",
      icon: "fa fa-map-marked-alt icon__1",
      link: "/dashboard/address",
      isEnabled: true,
    },
    {
      name: "Faq",
      icon: "fa fa-question-circle  icon__1",
      link: "/dashboard/faq",
      isEnabled: false,
    },

    {
      name: "Account",
      icon: "fa fa-user-cog icon__1",
      link: "/settings",
      isEnabled: true,
    },
  ];
  const history = useHistory();
  useEffect(() => {
    if (!props.config.isAuth) {
      history.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    props.logout();
    history.push("/login");
    props.clearOrders();
    props.clearAddress();
  };
  const handleClick = (d) => {
    if (d.name === "Live Chat") {
      //window.open('https://tawk.to/chat/5f33eb1a4c7806354da5cef8/default')
      window.location.href =
        "https://tawk.to/chat/5f33eb1a4c7806354da5cef8/default";
      return;
    }
    if (!d.isEnabled) {
      setShowToast(true);
    } else {
      history.push(d.link);
    }
  };
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
          <div className="col col-5 moreBtn" key={d.name}>
            <div onClick={() => handleClick(d)} style={{ color: "white" }}>
              <i className={`iconStyle ${d.icon}`}></i>
              <br />
              <span className="textStyle">{d.name}</span>
            </div>
          </div>
        ))}
        <div className="col col-5 m-auto moreBtn">
          <div style={{ color: "white" }} onClick={handleLogout}>
            <i className={`iconStyle fa fa-sign-out-alt icon__1`}></i>
            <br />
            <span className="textStyle">Logout</span>
          </div>
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
    clearOrders: () => dispatch(actionCreators.clearOrders()),
    clearAddress: () => dispatch(actionCreators.clearAddress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Morev2));
