import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "../DropDown/img-5.jpg";

function DashHead(props) {
  const username = props.config.authData.user.name;
  const mobile = props.config.authData.user.mbl;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "43vh",
          background: "#2f4f4f",
          display: "block",
          width: "100%",
          zIndex: "-1",
          borderRadius: "0 0 5px 5px",
        }}
      ></div>
      <div>
        <div class="container" style={{ position: "fixed" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="user-dt">
                <div class="user-img">
                  <img
                    style={{
                      height: "12vh",
                      width: "auto",
                      marginBottom: "10px",
                    }}
                    src={Avatar}
                    alt=""
                  />
                </div>
                <br />
                <span
                  style={{
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  {username || "Guest"}
                </span>{" "}
                <br />
                <span style={{ color: "white", fontSize: "12px" }}>
                  {mobile || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};

export default connect(mapStateToProps)(DashHead);
