import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import Header from "../Header/Header";
import * as actionCreators from "../../Store/actions/index";
import MblNavbar from "../Common/MblNavbar";
import { Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { fetchWithTimeout } from '../../api';
import pickupImg from "./SourceLocation.svg";
import dropImg from "./DestinationLocation.svg";
import "./Package.css";
import CheckoutPackage from "./CheckoutPackage";

function Package(props) {
  const categories = props.package.packageData.types;
  const [error, setError] = useState("");
  const [show, setShowToast] = useState(false);
  const baseUrl = props.config.baseUrl;
  const [selectedCategory,setSelectedCategory] = useState(null)
  const [isOneWay,setIsOneWay] = useState(true)
  const [showCheckout,setShowCheckout] = useState(false)
  const history = useHistory();
  const pickAddress = props.package.pickUpAddress
  const dropAddress = props.package.dropAddress

  const handleShowCheckout = () => {
    if (pickAddress === null || dropAddress === null) {
        setError("Please add pickup address and drop address to deliver your package");
        setShowToast(true);
      }
      else if (selectedCategory === null){
        setError("Please pick the package category");
        setShowToast(true);
      }
      else {
        setShowCheckout(true);
      }
  }
  const notifModal = (
    <Toast
      onClose={() => setShowToast(false)}
      show={show}
      delay={2000}
      autohide
      style={{
        position: "fixed",
        bottom: "20vh",
        zIndex: "999",
        textAlign: "center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Toast.Body
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          borderBottom: "none",
          textAlign: "center",
          padding: "0.2rem 0.8rem",
        }}
      >
        {<strong className="mr-auto">{error}</strong>}
      </Toast.Body>
    </Toast>
  );
  
  const PackageHome = () => (
    <>
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
        <div className="pickup-categories d-flex justify-content-center flex-column">
            <div className="caution-note d-flex flex-row justify-content-center m-3">
              <i
                style={{marginLeft:"5px",fontSize:"14px", color:"#d30013", marginTop: "2px"}}
                className="fa fa-exclamation-triangle"
              ></i>
              <span style={{ marginLeft: "5px", fontSize: "14px", color:"#d30013" }}>
                {props.package.packageData?.message}
              </span>
            </div>
            <DropdownButton className="d-flex justify-content-center" size="lg" key="down" drop="down" title={selectedCategory || "Select Package type"}>
                {Object.keys(categories).map((category)=>(
                  <Dropdown.Item key={category} eventKey={category} onClick={() => setSelectedCategory(categories[category])}>
                      {categories[category]}
                  </Dropdown.Item>
                ))}        
            </DropdownButton>
        </div>
        <div className="pickup-options">
            <div className="one-way">
                <div className="switch-btn-package">
                    <label className="switch-package">
                        <input type="checkbox" checked={isOneWay} onChange={()=>setIsOneWay(!isOneWay)} />
                        <span className="slider-package round"></span>
                    </label>
                </div>
                <div className="one-way-text">
                    One - way
                </div>
            </div>
            <div className="round-trip">
               <div className="switch-btn-package">
                    <label className="switch-package">
                        <input type="checkbox" checked={!isOneWay} onChange={()=>setIsOneWay(!isOneWay)} />
                        <span className="slider-package round"></span>
                    </label>
                </div>
                <div className="round-trip-text">
                    Round - trip 
                </div>
            </div>
        </div>
      </div>
      <div className="package-next-btn" onClick={handleShowCheckout}>
        Next
      </div>
    </>
  )

  return  (
  <>
      <div className="d-none d-sm-block">
        <Header />
      </div>
      <div className="d-block d-sm-none">
        <MblNavbar
          heading= { showCheckout ? "Checkout" : "Packages" }
          back={()=> {
            showCheckout ? setShowCheckout(false) : history.goBack()
          }
        }
        />
      </div>
        {notifModal}
      {showCheckout ? <CheckoutPackage hideCheckout={() => setShowCheckout(false)} pickAddress={pickAddress} dropAddress={dropAddress} selectedCategory={selectedCategory} isOneWay={isOneWay} setError={(msg)=> setError(msg)} setShowToast={(foo)=> setShowToast(foo)} /> : <PackageHome />}
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
