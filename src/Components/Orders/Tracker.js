import React from "react";
import "./tracker.css";

export default function Tracker(props) {
  const status = props.status;
  const textColor = props.theme === "light" ? "#2f4f4f" : "white";
  return (
    <div className="row justify-content-between">
      <div className={`order-tracking ${status > 1 && "completed"}`}>
        <span className="is-complete"></span>
        <p style={{color:{textColor}}}>Accepted</p>
      </div>
      <div className={`order-tracking ${status > 2 && "completed"}`}>
        <span className="is-complete"></span>
        <p>Cooked</p>
      </div>
      <div className={`order-tracking ${status > 3 && "completed"}`}>
        <span className="is-complete"></span>
        <p>On the way</p>
      </div>
      <div className={`order-tracking ${status > 4 && "completed"}`}>
  <span className="is-complete"></span>
        <p>Delivered</p>
      </div>
    </div>
  );
}
