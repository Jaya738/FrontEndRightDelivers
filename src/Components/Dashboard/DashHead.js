import React from "react";
import { connect } from "react-redux";
//import Avatar from "../DropDown/img-5.jpg";

function DashHead(props) {
  const username = props.config.authData.user.name;
  const mobile = props.config.authData.user.mbl;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          height: "43vh",
          background: "#2f4f4f",
          display: "block",
          width: "100%",
          zIndex: "-1",
          borderRadius: "0 0 5px 5px",
        }}
        className="dash-head-bg"
      ></div>
      <div>
        <div class="container" style={{ marginTop: "17vh" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="user-dt">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#fff",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    borderRadius: "50%",
                    webkitBorderRadius: "50%",
                    mozBorderRadius: "50%",
                  }}
                  className="profile-icon"
                >
                  <span
                    style={{
                      position: "relative",
                      top: "20px",
                      fontSize: "40px",
                      lineHeight: "40px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {username[0] || "G"}
                  </span>
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
