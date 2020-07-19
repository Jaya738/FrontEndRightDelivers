import React from "react";
import { Link } from "react-router-dom";

function MblNavbar(props) {
  const navStyle = {
    position: "fixed",

    padding: "0.5rem 1rem",
    top: "0",
    width: "100%",
    zIndex: "1",
  };

  return (
    <div className="fixed-top  bg-white align-middle" style={navStyle}>
      <div
        style={{
          paddingTop: "4vh",
          display: "flex",
          alignItems: "center",
          paddingBottom: "5px",
        }}
      >
        <div
          onClick={props.back}
          style={{ fontSize: "20px", marginLeft: "10px" }}
        >
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <span
          style={{
            fontSize: "18px",
            color: "black",
            marginLeft: "20px",
          }}
        >
          <name>{props.heading}</name>
        </span>
      </div>
    </div>
  );
}

export default MblNavbar;
