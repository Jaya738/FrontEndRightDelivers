import React from "react";
import Tracker from "./Tracker";
import dateFormat from "dateformat";
import { Accordion } from "react-bootstrap";
import productReducer from "../../Store/reducers/productReducer";

export default function ActiveOrders(props) {
  const isFutureDate = (slotDate) => {
    const dateToCheck = new Date(slotDate * 1000)
    const curDate = new Date()
    var diff =(dateToCheck.getTime() - curDate.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    if(diff > 0){
      return true
    }else{
      return false
    }
  }
  return (
    <div>
      <Accordion
        className="panel-group accordion active-orders mt-0 mb-0"
        defaultActiveKey="0"
      >
        {props.orders.orderStatus && props.orders.activeOrders.map((order) => (
          <div
            key={order.ordid}
            style={{
              backgroundColor: "white",
              boxShadow: "0px 3px 8px 2px rgba(0, 0, 0, .08)",
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "10px",
              padding: "10px",
              margin: "5px 0px",
              marginBottom:"15px",
              color: "#2f4f4f",
            }}
            className="active-order-item"
          >
            <>
            {order.type === 6 ?
            (
              <>
              <Accordion.Toggle
              eventKey={order.ordid}
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
              {order.slot !== 0 && isFutureDate(order.slot_date) ?
              (
                <div>
                <i
                  style={{marginLeft:"5px",fontSize:"14px"}}
                  className="fa fa-calendar-check"
                ></i>
                <span style={{ marginLeft: "5px", fontSize: "14px" }}>
                  {`Scheduled slot at ${dateFormat(order.slot_date * 1000, "shortTime")}, ${dateFormat(order.slot_date * 1000, "mediumDate")}`}
                </span>
                <i style={{ fontSize: "18px",marginTop:"1.5px" }} className="fa fa-angle-right float-right mr-2"></i>
              </div>
              )
              :
              (<div>
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
                <i style={{ fontSize: "18px",marginTop:"1.5px" }} className="fa fa-angle-right float-right mr-2"></i>
                
              </div>
              )}
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
                      className="col col-12"
                      style={{
                        paddingBottom: "5px",
                      }}
                    >
                      <br />
                    <div>
                      <span style={{fontWeight: "bold", color: "#d30013"}}>Pickup Address: </span>
                      {order.items.start.flat}, {order.items.start.area}
                    </div>
                    <div>
                      <span style={{fontWeight: "bold", color: "#d30013"}}>Drop Address: </span>
                      {order.items.drop.flat}, {order.items.drop.area}
                    </div> 
                    <div>
                      <span style={{fontWeight: "bold", color: "#d30013"}}>Type: </span>
                      {order.items.type}
                    </div>
                    <div>
                      <span style={{fontWeight: "bold", color: "#d30013"}}>{order.items.trip === "1" ? "One way" : "Round trip"}</span>  
                    </div>              
                    </div>
                    <div className="col col-12 pt-1">
                      <li style={{listStyle:"none", marginBottom:"5px", fontWeight: "bold", color: "#d30013"}}>Delivery Charges <span style={{float:"right"}}>₹{order.fee}</span> </li>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-12">
                      <Tracker status={order.ost} order={order} theme="dark" />
                    </div>
                  </div>
                </div>
              </Accordion.Collapse>
              </>
            )
            :
            (
              <>
              <Accordion.Toggle
              eventKey={order.ordid}
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
              {order.slot !== 0 && isFutureDate(order.slot_date) ?
              (
                <div>
                <i
                  style={{marginLeft:"5px",fontSize:"14px"}}
                  className="fa fa-calendar-check"
                ></i>
                <span style={{ marginLeft: "5px", fontSize: "14px" }}>
                  {`Scheduled slot at ${dateFormat(order.slot_date * 1000, "shortTime")}, ${dateFormat(order.slot_date * 1000, "mediumDate")}`}
                </span>
                <i style={{ fontSize: "18px",marginTop:"1.5px" }} className="fa fa-angle-right float-right mr-2"></i>
              </div>
              )
              :
              (<div>
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
                <i style={{ fontSize: "18px",marginTop:"1.5px" }} className="fa fa-angle-right float-right mr-2"></i>
                
              </div>
              )}
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
                          <li key={item.p} style={{listStyle:"none",marginTop:"5px",marginBottom:"5px"}}>
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
                      <Tracker status={order.ost} order={order} theme="dark" />
                    </div>
                  </div>
                </div>
              </Accordion.Collapse>
              </>
            )}
            </>
            <div className="m-2">
              <span style={{fontSize:"10px",float:"left",color:"grey"}}><i className="fa fa-calendar pr-2"></i>{dateFormat(order.time * 1000, "mediumDate")}</span>
              <span style={{fontSize:"10px",float:"right",color:"grey"}}><i className="fa fa-clock pr-2"></i>{dateFormat(order.time * 1000, "shortTime")}</span>
            </div>
          </div>
        ))}
      </Accordion>
      
    </div>
  );
}
