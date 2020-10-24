import React from "react";
import "./tracker.css";

export default function Tracker({status, order, theme}) {
  const textColor = theme === "light" ? "#2f4f4f" : "white";
  return (
    <div className="row justify-content-between">
      <div className={`order-tracking ${status > 1 && "completed"}`}>
        <span className="is-complete"></span>
        <p style={{color:{textColor}}}>Accepted</p>
      </div>
      <div className={`order-tracking ${status > 2 && "completed"}`}>
        <span className="is-complete"></span>
        <p>{order.type === 6 ? "In Process" : "Cooked"}</p>
      </div>
      <div className={`order-tracking ${status > 3 && "completed"}`}>
        <span className="is-complete"></span>
        <p>{order.type === 6 ? "Picked Up" : "On the way"}</p>
      </div>
      <div className={`order-tracking ${status > 4 && "completed"}`}>
  <span className="is-complete"></span>
        <p>Delivered</p>
      </div>
    </div>
  );
}
