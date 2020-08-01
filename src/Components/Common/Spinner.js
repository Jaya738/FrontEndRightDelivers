import React from "react";
import spinner from "./spinner.svg";
import "./Spinner.css";

export default () => {
  return (
    <div className="bodyMain">
      <img
        src={spinner}
        style={{
          width: "30%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          top: "45%",
          left: "42%",
        }}
        alt="Loading..."
      />
      {/* <div className="bodySpinner">
        <span className="spinnerSpan">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="loadText">loading ...</h1> */}
    </div>
  );
};
