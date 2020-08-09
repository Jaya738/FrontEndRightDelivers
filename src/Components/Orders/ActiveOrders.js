import React from "react";
import Tracker from "./Tracker";
import { Accordion, Card } from "react-bootstrap";

export default function ActiveOrders(props) {
  return (
    <div>
      <Accordion
        className="panel-group accordion mt-0 mb-0"
        defaultActiveKey="0"
      >
        {props.orders.activeOrders.map((order) => (
          <div
            style={{
              backgroundColor: "#2f4f4f",
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "10px",
              padding: "10px",
              margin: "5px",
              color: "white",
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
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <i
                  className={`fa ${
                    order.ost === 1
                      ? "fa-clock"
                      : order.ost === 2
                      ? "fa-cutlery"
                      : order.ost === 3
                      ? "fa-shopping-bag"
                      : order.ost === 4
                      ? "fa-truck"
                      : "fa-check"
                  } pr-2`}
                ></i>
                <span style={{ fontSize: "14px" }}>
                  {props.orders.orderStatus[order.ost].l}
                </span>
                <i className="fa fa-plus float-right"></i>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={order.ordid}>
              <div className="container" style={{ margin: "5px" }}>
                <div
                  className="row"
                  style={{
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <div
                    className="col col-12 align-middle"
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Items</span>
                    <br />
                    {JSON.parse(order.items).map((item) => (
                      <>
                        <span>
                          Biryani ({item.q}) - ₹{item.p * item.q}
                        </span>
                        <br />
                      </>
                    ))}
                  </div>
                  <div className="col col-12">
                    {/* <span>Sub total - ₹{order.amt}</span>
                    <br />
                    <span>Fees - ₹{order.fee}</span>
                    <br /> */}
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Total - ₹{order.amt + order.fee}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-12">
                    <Tracker status={order.ost} />
                  </div>
                </div>
              </div>
            </Accordion.Collapse>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
