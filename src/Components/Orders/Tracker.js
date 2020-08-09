import React from "react";
import "./tracker.css";

export default function Tracker(props) {
  const status = props.status;
  return (
    <div className="row justify-content-between">
      <div className={`order-tracking ${status > 1 && "completed"}`}>
        <span className="is-complete"></span>
        <p>Cooking</p>
      </div>
      <div className={`order-tracking ${status > 2 && "completed"}`}>
        <span className="is-complete"></span>
        <p>Packed</p>
      </div>
      <div className={`order-tracking ${status > 3 && "completed"}`}>
        <span className="is-complete"></span>
        <p>In Transit</p>
      </div>
      <div className={`order-tracking ${status > 4 && "completed"}`}>
        <span className="is-complete"></span>
        <p>Delivered</p>
      </div>
    </div>
  );
}
