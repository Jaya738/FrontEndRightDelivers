import React, { useState } from "react";
import Avatar from "../DropDown/img-5.jpg";

export default function DashHead(props) {
  const username = "Jay";
  const [edit, setEdit] = useState(false);
  const [mobile, setMobile] = useState("+919999999999");

  return (
    <div class="dashboard-group">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="user-dt">
              <div class="user-img">
                <img src={Avatar} alt="" />
              </div>
              <h4>{username}</h4>
              <p>{mobile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
