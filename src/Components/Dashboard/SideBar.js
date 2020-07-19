import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar(props) {
  const data = [
    {
      item: "Cart",
      icon: "uil uil-shopping-cart-alt icon-1",
      link: "/dashboard/cart",
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
    {
      item: "Logout",
      icon: "uil uil-lock-alt icon__1",
      link: "/login",
    },
  ];
  return (
    <div>
      <div class="left-side-tabs">
        <div class="dashboard-left-links">
          {data.map((d) => (
            <NavLink to={d.link} activeclassName="active" className="user-item">
              <i className={d.icon}></i> {d.item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
