import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import { withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";
import orderIcon from "./noOrders.svg";

function ShowOrders(props) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const apiUrl =
    "https://api.rightdelivers.in/user/api/v1/restaurants/myorders";

  const loadOrders = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        rKey: props.config.authData.rKey,
        dKey: props.config.authData.dKey,
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res && res.status === 1) {
      //props.updateOrders(res);
      setLoading(false);
      setOrders(res.orders);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const noOrders = (
    <div className="m-5" style={{ paddingTop: "35vh" }}>
      <Image src={orderIcon} fluid />
      <p
        style={{
          color: "#2f4f4f",
          margin: "10%",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {" "}
        You have no orders yet{" "}
      </p>
    </div>
  );
  const OrdersList = (
    <div className="col-lg-12 col-md-12 m3">
      {orders.map((order) => (
        <div className="pdpt-bg m-3 rounded">
          <div className="pdpt-title">
            <h6>{props.orders.orderStatus[order.ost].l}</h6>
          </div>
          <div className="order-body10">
            <ul className="order-dtsll">
              {/* <li>
              <div className="order-dt-img">
                <img src="../Products/img-14.jpg" alt="" />
              </div>
            </li> */}
              <li>
                <div className="order-dt47">
                  {JSON.parse(order.items).map((item) => (
                    <ul>
                      <li>
                        <h4>
                          Chicken Biryani <span>({item.id})</span> -{" "}
                          <span>₹{item.p * item.q}</span>
                        </h4>
                      </li>
                    </ul>
                  ))}

                  <div className="order-title">
                    {JSON.parse(order.items).length} Items{" "}
                    {/* <span
                    data-inverted=""
                    data-tooltip="2kg broccoli, 1kg Apple"
                    data-position="top center"
                  >
                    ?
                  </span> */}
                  </div>
                </div>
              </li>
            </ul>
            <div className="">
              <div className="total-checkout-group">
                <div className="cart-total-dil">
                  <h4>Sub Total</h4>
                  <span>₹{order.amt}</span>
                </div>
                <div className="cart-total-dil pt-3">
                  <h4>Fees</h4>
                  <span>{orders.fee || "Free"}</span>
                </div>
              </div>
              <div className="main-total-cart">
                <h2>Total</h2>
                <span>₹{order.amt + order.fee}</span>
              </div>
            </div>
            {/* <div className="track-order">
            <h4>Track Order</h4>
            <div className="bs-wizard" style={{ borderBottom: "0px" }}>
              <div className="bs-wizard-step complete">
                <div className="text-center bs-wizard-stepnum">Placed</div>
                <div className="progress">
                  <div className="progress-bar"></div>
                </div>
                <a href="#" className="bs-wizard-dot"></a>
              </div>
              <div className="bs-wizard-step complete">
                <div className="text-center bs-wizard-stepnum">Packed</div>
                <div className="progress">
                  <div className="progress-bar"></div>
                </div>
                <a href="#" className="bs-wizard-dot"></a>
              </div>
              <div className="bs-wizard-step ">
                <div className="text-center bs-wizard-stepnum">Arrived</div>
                <div className="progress">
                  <div className="progress-bar"></div>
                </div>
                <a href="#" className="bs-wizard-dot"></a>
              </div>
              <div className="bs-wizard-step ">
                <div className="text-center bs-wizard-stepnum">
                  Delivered
                </div>
                <div className="progress">
                  <div className="progress-bar"></div>
                </div>
                <a href="#" className="bs-wizard-dot"></a>
              </div>
            </div>
          </div>
          <div className="call-bill">
            <div className="order-bill-slip">
              <Link
                to="/dashboard/checkout/bill"
                className="bill-btn5 hover-btn"
              >
                View Bill
              </Link>
            </div>
          </div>*/}
          </div>
        </div>
      ))}
    </div>
  );
  return <>{orders.length > 0 ? OrdersList : noOrders}</>;
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBackUrl: (payload) => dispatch(actionCreators.setBackUrl(payload)),
    clearCart: () => dispatch(actionCreators.clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowOrders);
