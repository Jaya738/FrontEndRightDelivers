import React from "react";
import MblNavbar from "../MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory, withRouter, Link } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";
import Orders from "../Dashboard/Orders";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import Faq from "../Dashboard/Faq";
import "./More.css";

function More(props) {
  const history = useHistory();
  const handleLogout = () => {
    props.logout();
    console.log("logged out");
  };
  const moreData = [
    {
      item: "My Orders",
      icon: "uil uil-box icon__1",
      link: "/dashboard/orders",
      comp: Orders,
    },
    {
      item: "My Address",
      icon: "uil uil-location-point icon__1",
      link: "/dashboard/address",
      comp: CheckoutAddress,
    },
    {
      item: "Faq",
      icon: "uil uil-info-circle icon__1",
      link: "/dashboard/faq",
      comp: Faq,
    },
    {
      item: "Support",
      icon: "fa fa-comment icon__1",
      comp: <div>Support</div>,
    },
  ];
  const Support = <div>Support</div>;
  const moreOptions = (
    <div class="dashboard-left-links" style={{ marginTop: "15vh" }}>
      {/* {moreData.map((d) => (
        <Link to={d.link} className="user-item">
          <i className={d.icon}></i> {d.item}
        </Link>
      ))}
       */}

      <Accordion
        className="panel-group accordion mt-0 mb-0"
        defaultActiveKey="0"
      >
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Orders"
            className="user-item"
          >
            <i className="uil uil-box icon__1"></i> Orders
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Orders">
            <Orders />
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Address"
            className="user-item"
          >
            <i className="uil uil-location-point icon__1"></i> Address
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Address">
            <CheckoutAddress />
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Faq"
            className="user-item"
          >
            <i className="uil uil-location-point icon__1"></i> Faq
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Faq">
            <Faq />
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Support"
            className="user-item"
          >
            <i className="uil uil-location-point icon__1"></i> Support
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Support">{Support}</Accordion.Collapse>
        </div>
      </Accordion>
      <Link
        to="/login"
        style={{ backgroundColor: "white" }}
        className="user-item"
        onSelect={handleLogout}
      >
        <i className="fa fa-sign-out-alt icon__1"></i>Logout
      </Link>
      <div className="footer-more-area">
        <span style={{ color: "white" }} className="">
          App Version 1.0.1
        </span>
      </div>
    </div>
  );
  return (
    <div>
      <MblNavbar heading="More" back={() => history.goBack()} />

      {moreOptions}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(More));
