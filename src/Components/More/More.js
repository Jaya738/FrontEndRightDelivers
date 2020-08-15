import React from "react";
import MblNavbar from "../Common/MblNavbar";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { useHistory, withRouter, Link } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";
import ShowOrders from "../Dashboard/ShowOrders";
import CheckoutAddress from "../Checkout/CheckoutAddress";
import Faq from "../Dashboard/Faq";
import "./More.css";

function More(props) {
  const history = useHistory();
  const handleLogout = () => {
    props.logout();
  };
  const Support = <div>Support</div>;
  const moreOptions = (
    <div class="dashboard-left-links" style={{ marginTop: "14vh" }}>
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
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: "18px",
            }}
          >
            <i className="fa fa-shipping-fast icon__1"></i> Orders
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Orders">
            <div
              style={{
                height: "40vh",
                overflowX: "hidden",
                overflowY: "auto",
                borderRadius: "10px",
              }}
            >
              <ShowOrders />
            </div>
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Address"
            className="user-item"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: "18px",
            }}
          >
            <i className="fa fa-map-marked-alt icon__1"></i> Address
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Address">
            <div
              style={{
                height: "40vh",
                overflowX: "hidden",
                overflowY: "auto",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <CheckoutAddress />
            </div>
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Faq"
            className="user-item"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: "18px",
            }}
          >
            <i className="fa fa-question-circle  icon__1"></i> Faq
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Faq">
            <div
              style={{
                height: "30vh",
                overflowX: "hidden",
                overflowY: "auto",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <Faq />
            </div>
          </Accordion.Collapse>
        </div>
        <div>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="Support"
            className="user-item"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: "18px",
            }}
          >
            <i className="far fa-comment icon__1"></i> Support
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="Support">
            <div
              style={{
                height: "40vh",
                overflowX: "hidden",
                overflowY: "auto",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              {Support}
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
      <Link
        to="/login"
        className="user-item"
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          fontSize: "18px",
          backgroundColor: "white",
        }}
        onSelect={handleLogout}
      >
        <i className="fa fa-sign-out-alt icon__1"></i>Logout
      </Link>
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
