import React from "react";
import "./Menu.css";
import Avatar from "./img-5.jpg";
import { connect } from "react-redux";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as actionCreators from "../../Store/actions/index";

function Menu(props) {
  const currentUser = "Jay";
  const history = useHistory();
  const goToLink = (link) => {
    history.push(link);
  };
  const handleLogout = () => {
    props.logout();
    console.log("logged out");
    history.push("/");
  };
  const data = [
    {
      item: "Dashboard",
      icon: "uil uil-apps icon__1",
      link: "/dashboard",
    },
    {
      item: "My Orders",
      icon: "uil uil-box icon__1",
      link: "/dashboard/orders",
    },
    {
      item: "My Address",
      icon: "uil uil-location-point icon__1",
      link: "/dashboard/address",
    },
    {
      item: "Faq",
      icon: "uil uil-info-circle icon__1",
      link: "/dashboard/faq",
    },
  ];

  return (
    <div>
      <div className="opts_account">
        <img src={Avatar} alt="" />
        <DropdownButton className="btn" title={"Hi " + currentUser + " "}>
          {data.map((dataItem) => (
            <Dropdown.Item
              eventKey={dataItem.link}
              className="drop-item item"
              onSelect={goToLink}
            >
              <i className={dataItem.icon}></i>
              {dataItem.item}
            </Dropdown.Item>
          ))}
          <Dropdown.Item className="drop-item item" onSelect={handleLogout}>
            <i className="uil uil-lock-alt icon__1"></i>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Menu);
