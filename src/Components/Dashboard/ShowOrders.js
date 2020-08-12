import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { withRouter } from "react-router-dom";
import { Image,Accordion } from "react-bootstrap";
import orderIcon from "./noOrders.svg";
import Tracker from "../Orders/Tracker";

function ShowOrders(props) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const apiUrl =
    "https://api.rightdelivers.in/user/api/v1/restaurants/myorders";

  const loadOrders = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 1) {
      //props.updateOrders(res);
      setLoading(false);
      setOrders(res.orders);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const noOrders = (
    <div className="m-5" style={{ paddingTop: "35vh" }}>
      <Image src={orderIcon} fluid />
      <p
        style={{
          color: "#2f4f4f",
          margin: "10%",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {" "}
        You have no orders yet{" "}
      </p>
    </div>
  );
  const OrdersList = (
    <div>
    <Accordion
      className="panel-group accordion mt-0 mb-0"
      defaultActiveKey="0"
    >
      {orders.map((order) => (
        <div
          style={{
            backgroundColor: "white",
            overflowX: "hidden",
            overflowY: "auto",
            borderRadius: "4px",
            padding: "10px",
            margin: "10px",
            color: "#2f4f4f",
          }}
        >
          <Accordion.Toggle
            eventKey={order.ordid}
            className=""
            style={{
              backgroundColor: "Transparent",
              backgroundRepeat: "no-repeat",
              border: "none",
              cursor: "pointer",
              overflow: "hidden",
              paddingTop: "3px",
              paddingBottom: "3px",
              width: "100%",
              fontSize: "10px",
              color: "#2f4f4f",
              textAlign: "left",
              verticalAlign:"middle"
            }}
          >
            <div>
              <div>
              <i
                style={{marginLeft:"5px",fontSize:"14px"}}
                className={`fa ${
                  order.ost === 1
                    ? "fa-clock"
                    : order.ost === 2
                    ? "fa-cutlery"
                    : order.ost === 3
                    ? "fa-shopping-bag"
                    : order.ost === 4
                    ? "fa-motorcycle"
                    : "fa-check"
                } pr-2`}
              ></i>
              <span style={{ fontSize: "14px" }}>
                {props.orders.orderStatus[order.ost].l}
              </span>
              <i style={{ fontSize: "18px" }} className="fa fa-angle-right float-right pt-1 mr-2"></i>
              </div>
              <div
                  style={{
                    margin:"10px",
                    fontSize:"12px"
                  }}
                  className="col col-12 align-middle"
                >
                  <span style={{ fontWeight: "bold" }}>Items</span>
                  <br />
                  {order.items.map((item) => (
                    <>
                      <span style={{marginTop:"5px",marginBottom:"5px"}}>
                        {item.n} x {item.q} <span style={{float:"right"}}> ₹{item.p * item.q} </span>
                      </span>
                      <br />
                    </>
                  ))}
                </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={order.ordid}>
            <div className="container" style={{ margin: "5px" }}>
              <div
                className="row"
                style={{
                  paddingBottom: "5px",
                  marginBottom: "5px",
                  
                }}
              >
                
                <div className="col col-12 pt-1" style={{borderTop: "1px solid grey",}}>
                  
                  <span>Fees <span style={{float:"right"}}>₹{order.fee}</span> </span>
                  <br />
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Total <span style={{float:"right"}}>₹{order.amt + order.fee}</span>
                  </span>
                </div>
              </div>
              {/* <div className="row">
                <div className="col col-12">
                  <Tracker status={order.ost} theme="light" />
                </div>
              </div> */}
            </div>
          </Accordion.Collapse>
        </div>
      ))}
    </Accordion>
  </div>

  );
  return <>{orders.length > 0 ? OrdersList : noOrders}</>;
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
    clearCart: () => dispatch(actionCreators.clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowOrders);
