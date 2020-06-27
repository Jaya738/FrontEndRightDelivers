import React from "react";
import "./Menu.css";
import Avatar from "./img-5.jpg";
import { connect } from "react-redux";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actionCreators from "../../Store/actions/index";

function Menu(props) {
  const currentUser = "Jay";
  const handleLogout = () => {
    props.logout();
    console.log("logged out");
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
      item: "My Cart",
      icon: "uil uil-shopping-cart-alt icon-1",
      link: "/dashboard/cart",
    },
    {
      item: "Faq",
      icon: "uil uil-info-circle icon__1",
      link: "/dashboard/faq",
    },
  ];
  return (
    <div>
      <a className="opts_account">
        <img src={Avatar} alt="" />
        <DropdownButton className="btn" title={"Hi " + currentUser + " "}>
          {data.map((dataItem) => (
            <Dropdown.Item eventKey={dataItem.item} className="channel_item1">
              <i className={dataItem.icon}></i>
              <Link to={dataItem.link}>{dataItem.item}</Link>
            </Dropdown.Item>
          ))}
          <Dropdown.Item className="channel_item1">
            <i className="uil uil-lock-alt icon__1"></i>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      </a>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Menu);
