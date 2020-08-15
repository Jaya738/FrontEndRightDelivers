import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import * as actionCreators from "../../Store/actions/index";
import { Image,Accordion } from "react-bootstrap";
import notifIcon from "./noNotifications.svg";
import Spinner from "../Common/Spinner";
import {useHistory} from "react-router-dom";
import MblNavbar from "../Common/MblNavbar";


function Notifications(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [Notifications, setNotifications] = useState(["This is 1", "Your Order is delivered","Waiting for cooking"]);
  // const apiUrl =
  //   "https://api.rightdelivers.in/user/api/v1/restaurants/myNotifications";

  // const loadNotifications = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //       rKey: props.config.authData.rKey,
  //       dKey: props.config.authData.dKey,
  //     },
  //   };

  //   const res = await (await fetch(apiUrl, options)).json();
  //   if (res && res.status === 1) {
  //     //props.updateNotifications(res);
  //     setLoading(false);
  //     setNotifications(res.Notifications);
  //   }
  // };
  // useEffect(() => {
  //   loadNotifications();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const noNotifications = (
    <div className="" style={{margin:"50% 10%"}}>
      <Image src={notifIcon} fluid />
      <p
        style={{
          color: "#2f4f4f",
          margin: "10%",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        {" "}
        You have no Notifications{" "}
      </p>
    </div>
  );
  const NotificationsList = (
    <div className="w-100 p-3" style={{marginTop:"16vh"}}>
      {Notifications.length > 0 && Notifications.map((notif) => (
        <div
          style={{
            backgroundColor: "white",
            overflowX: "hidden",
            overflowY: "auto",
            borderRadius: "4px",
            padding: "10px",
            margin: "10px",
            color: "#2f4f4f",
            textAlign: "left",
              verticalAlign:"middle"
          }}
        >
          <div
            className=""
            style={{
              overflow: "hidden",
              paddingTop: "3px",
              paddingBottom: "3px",
              width: "100%",
              fontSize: "10px",
              color: "#2f4f4f",
            }}
          >
              <i
                style={{margin:"5px",fontSize:"14px"}}
                className="fa fa-bell">
              </i>
              <span style={{ fontSize: "14px" }}>
                {notif}
              </span>
            </div>
      
            <div className="mt-2">
              <span style={{fontSize:"10px",float:"left"}}><i className="fa fa-calendar pr-2"></i>{dateFormat(1597387665 * 1000, "mediumDate")}</span>
              <span style={{fontSize:"10px",float:"right"}}><i className="fa fa-clock pr-2"></i>{dateFormat(1597387665 * 1000, "shortTime")}</span>
            </div>
            </div>
      ))}
  </div>

  );
  const spinner = (
    <div>
      <Spinner />
    </div>
  );
  return(
  <div>
      <MblNavbar heading="Notifications" back={() => history.goBack()} />
      <div>
      {loading ? spinner : Notifications.length > 0 ? NotificationsList : noNotifications}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    notifications: state.notifications,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   setLoadedNotifications: () => dispatch(actionCreators.setLoadedNotifications()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
