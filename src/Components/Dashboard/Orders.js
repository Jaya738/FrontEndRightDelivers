import React from "react";
import { Link } from "react-router-dom";

export default function Orders(props) {
  const orders = [
    {
      ordid: 111111,
      rid: 7,
      name: "Ramesh Gellu",
      mobile: 7396240424,
      items:
        '[{"id":1,"q":1,"p":250,"f":0},{"id":4,"q":1,"p":250,"f":0},{"id":3,"q":1,"p":160,"f":0}]',
      mode: 1,
      amt: 660,
      fee: 0,
      time: 1594869606,
      note: "",
      ost: 1,
      ratime: 0,
      ptime: 0,
      dtime: 0,
      pst: 1,
      itmre: null,
      reamt: 0,
      dlvaddr: 11111,
      location: null,
      payid: null,
    },
    {
      ordid: 111122,
      rid: 7,
      name: "Jay",
      mobile: 7396240424,
      items:
        '[{"id":1,"q":1,"p":250,"f":0},{"id":4,"q":1,"p":250,"f":0},{"id":3,"q":1,"p":160,"f":0}]',
      mode: 1,
      amt: 700,
      fee: 0,
      time: 1594869606,
      note: "",
      ost: 1,
      ratime: 0,
      ptime: 0,
      dtime: 0,
      pst: 1,
      itmre: null,
      reamt: 0,
      dlvaddr: 11111,
      location: null,
      payid: null,
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-title-tab">
          <h4>
            <i className="uil uil-box"></i>My Orders
          </h4>
        </div>
      </div>
      <div className="col-lg-12 col-md-12">
        {orders.map((order) => (
          <div className="pdpt-bg">
            <div className="pdpt-title">
              <h6>Delivery Timing 10 May, 3.00PM - 6.00PM</h6>
            </div>
            <div className="order-body10">
              <ul className="order-dtsll">
                <li>
                  <div className="order-dt-img">
                    <img src="images/groceries.svg" alt="" />
                  </div>
                </li>
                <li>
                  <div className="order-dt47">
                    <h4>Chicken Biryani</h4>
                    <p>Delivered </p>
                    <div className="order-title">
                      2 Items{" "}
                      <span
                        data-inverted=""
                        data-tooltip="2kg broccoli, 1kg Apple"
                        data-position="top center"
                      >
                        ?
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="total-dt">
                <div className="total-checkout-group">
                  <div className="cart-total-dil">
                    <h4>Sub Total</h4>
                    <span>₹{order.amt}</span>
                  </div>
                  <div className="cart-total-dil pt-3">
                    <h4>Delivery Charges</h4>
                    <span>{orders.fee > 0 ? orders.fee : "Free"}</span>
                  </div>
                </div>
                <div className="main-total-cart">
                  <h2>Total</h2>
                  <span>₹{order.amt + order.fee}</span>
                </div>
              </div>
              <div className="track-order">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
