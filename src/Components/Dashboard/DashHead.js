import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "../DropDown/img-5.jpg";

function DashHead(props) {
  const username = props.config.authData.user.name;
  const [edit, setEdit] = useState(false);
  const mobile = props.config.authData.user.mbl;

  return (
    <div class="dashboard-group">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="user-dt">
              <div class="user-img">
                <img src={Avatar} alt="" />
              </div>
              <h4>{username || "Guest"}</h4>
              <p>{mobile || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};

export default connect(mapStateToProps)(DashHead);
