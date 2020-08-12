import React from "react";
import "./tracker.css";

export default function Tracker(props) {
  const status = props.status;
  const textColor = props.theme === "light" ? "#2f4f4f" : "white";
  return (
    <div className="row justify-content-between">
      <div className={`order-tracking ${status > 1 && "completed"}`}>
        <span className="is-complete">{status===1 && <i style={{ fontSize: "12px",color:"white" }} className="fa mt-2 fa-hourglass"></i>}</span>
        <p style={{color:{textColor}}}>Accepted</p>
      </div>
      <div className={`order-tracking ${status > 2 && "completed"}`}>
        <span className="is-complete">{status===2 && <i style={{ fontSize: "12px",color:"white" }} className="fa mt-2 fa-hourglass"></i>}</span>
        <p>Cooked</p>
      </div>
      <div className={`order-tracking ${status > 3 && "completed"}`}>
        <span className="is-complete">{status===3 && <i style={{ fontSize: "12px",color:"white" }} className="fa mt-2 fa-hourglass"></i>}</span>
        <p>On the way</p>
      </div>
      <div className={`order-tracking ${status > 4 && "completed"}`}>
  <span className="is-complete">{status===4 && <i style={{ fontSize: "12px",color:"white" }} className="fa mt-2 fa-hourglass"></i>}</span>
        <p>Delivered</p>
      </div>
    </div>
  );
}
