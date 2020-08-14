import React from "react";
import Tracker from "./Tracker";
import dateFormat from "dateformat";
import { Accordion, Card } from "react-bootstrap";

export default function ActiveOrders(props) {
  return (
    <div>
      <Accordion
        className="panel-group accordion mt-0 mb-0"
        defaultActiveKey="0"
      >
        {props.orders.orderStatus && props.orders.activeOrders.map((order) => (
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0px 3px 8px 2px rgba(0, 0, 0, .08)",
              borderRadius: "5px",
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "10px",
              padding: "10px",
              margin: "5px",
              marginBottom:"15px",
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
                <i
                  style={{marginLeft:"5px",fontSize:"14px"}}
                  className={`fa ${
                    order.ost === 1
                      ? "fa-clock"
                      : order.ost === 2
                      ? "fa-utensils"
                      : order.ost === 3
                      ? "fa-shopping-bag"
                      : order.ost === 4
                      ? "fa-motorcycle"
                      : "fa-check"
                  } pr-2`}
                ></i>
                <span style={{ fontSize: "14px" }}>
                  {props.orders.orderStatus[order.ost] && props.orders.orderStatus[order.ost].l}
                </span>
                <i style={{ fontSize: "18px" }} className="fa fa-angle-right float-right pt-1 mr-2"></i>
                
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={order.ordid}>
              <div className="container" style={{ margin: "5px" }}>
                <div
                  className="row"
                  style={{
                    paddingBottom: "10px",
                    marginBottom: "10px",
                   
                  }}
                >
                  <div
                    className="col col-12 align-middle"
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <br />
                    {order.items.map((item) => (
                      <>
                        <li style={{listStyle:"none",marginTop:"5px",marginBottom:"5px"}}>
                          {item.n} x {item.q} <span style={{float:"right"}}> ₹{item.p * item.q} </span>
                        </li>
                        
                      </>
                    ))}
                  </div>
                  <div className="col col-12 pt-1">
                    
                    <li style={{listStyle:"none", marginBottom:"5px"}}>Delivery Charges <span style={{float:"right"}}>₹{order.fee}</span> </li>
                    <li style={{ fontSize: "16px", fontWeight: "bold",listStyle:"none"}}>
                      Total <span style={{float:"right"}}>₹{order.amt + order.fee}</span>
                    </li>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-12">
                    <Tracker status={order.ost} theme="dark" />
                  </div>
                </div>
              </div>
            </Accordion.Collapse>
            <br />
            <div className="mt-2">
              <span style={{fontSize:"10px",float:"left"}}><i className="fa fa-calendar pr-2"></i>{dateFormat(order.time * 1000, "mediumDate")}</span>
              <span style={{fontSize:"10px",float:"right"}}><i className="fa fa-clock pr-2"></i>{dateFormat(order.time * 1000, "shortTime")}</span>
            </div>
        </div>
          
        ))}
      </Accordion>
      
    </div>
  );
}
