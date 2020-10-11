import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header/Header";
import * as actionCreators from "../../Store/actions/index";
import MblNavbar from "../Common/MblNavbar";
import { Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { fetchWithTimeout } from '../../api';
import pickupImg from "./SourceLocation.svg";
import dropImg from "./DestinationLocation.svg";
import "./Package.css";

function Package(props) {
  const baseUrl = props.config.baseUrl;
  const [isOneWay,setIsOneWay] = useState(true)
  const history = useHistory();
  const pickAddress = props.package.pickUpAddress
  const dropAddress = props.package.dropAddress

  return  (
  <>
      <div className="d-none d-sm-block">
        <Header />
      </div>
      <div className="d-block d-sm-none">
        <MblNavbar
          heading="Packages"
          back={()=>history.goBack()}
        />
      </div>
      <div className="send-package-main p-3">
        <div className="pickup-package">
            <Image src={pickupImg} className="pickup-img" fluid />
            <div className="pickup-location">
                <p>Pickup Location</p>
                {pickAddress ? 
                (<div className="address-item">
                      <div className="address-dt-all">
                        {pickAddress.area}
                        <ul className="action-btns">
                        <li>
                          <div
                            className="action-btn"
                            onClick={() => {
                              history.push("/pickaddress")
                            }}
                          >
                            <i className="uil uil-edit"></i>
                          </div>
                        </li>
                        <li>
                          <div className="action-btn" onClick={()=> {
                            props.deletePickupAddress()
                          }}>
                            <i className="uil uil-trash-alt"></i>
                          </div>
                        </li>
                      </ul>
                      </div>
                    </div>
                  ) :
                (
                <span className="add-location" onClick={()=>history.push("/pickaddress")}>
                    <i className="fas fa-plus" />
                </span>
                )}
            </div> 
        </div>
        <div className="drop-package">
            <div className="drop-location">
                <p>Drop Location</p>
                {dropAddress ? 
                (<div className="">
                      <div className="">
                        {dropAddress.area}
                        <ul className="action-btns">
                        <li>
                          <div
                            className="action-btn"
                            onClick={() => {
                              history.push("/dropaddress")
                            }}
                          >
                            <i className="uil uil-edit"></i>
                          </div>
                        </li>
                        <li>
                          <div className="action-btn" onClick={()=> {
                            props.deleteDropAddress()
                          }}>
                            <i className="uil uil-trash-alt"></i>
                          </div>
                        </li>
                      </ul>
                      </div>
                    </div>
                  ) :
                (
                <span className="add-location" onClick={()=>history.push("/dropaddress")}>
                    <i className="fas fa-plus" />
                </span>
                )}
            </div> 
            <Image src={dropImg} className="drop-img" fluid />
        </div>
        <div className="pickup-categories">
            <DropdownButton size="lg" key="down" drop="down" title={"Categories"}>
                    <Dropdown.Item>
                        Groceries
                    </Dropdown.Item>
            </DropdownButton>
        </div>
        <div className="pickup-options">
            <div className="one-way">
                <div className="switch-btn">
                    <label className="switch">
                        <input type="checkbox" checked={isOneWay} onChange={()=>setIsOneWay(!isOneWay)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="one-way-text">
                    One - way
                </div>
            </div>
            <div className="round-trip">
               <div className="switch-btn">
                    <label className="switch">
                        <input type="checkbox" checked={!isOneWay} onChange={()=>setIsOneWay(!isOneWay)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="round-trip-text">
                    Round - trip 
                </div>
            </div>
        </div>
      </div>
    <div className="package-next-btn">
        Next
    </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
    package: state.package
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deletePickupAddress: (payload) =>
      dispatch(actionCreators.deletePickupAddress(payload)),
    deleteDropAddress: (payload) =>
      dispatch(actionCreators.deleteDropAddress(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Package);
