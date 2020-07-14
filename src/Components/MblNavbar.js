import React from "react";
import { Link } from "react-router-dom";

function MblNavbar(props) {
  const navStyle = {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    top: "0",
    width: "100%",
    zIndex: "1",
  };

  return (
    <div className="fixed-top  bg-white align-middle" style={navStyle}>
      <Link to={props.backUrl} style={{ fontSize: "22px" }}>
        &#8249;
      </Link>
      <span
        style={{
          fontSize: "20px",
          color: "#d30013",
          marginLeft: "120px",
          alignItems: "center",
        }}
      >
        {props.heading}
      </span>
    </div>
  );
}

export default MblNavbar;
