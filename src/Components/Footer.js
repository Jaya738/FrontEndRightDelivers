import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";

function Footer(props) {
  const services = props.config.services;
  const contact = "1800-234-567";
  const infoMail = "info@rightdelivers.com";
  const updateLocation = (loc) => {
    const payload = props.config.branches.find((branch) => branch.name === loc);
  };
  return (
    <div className="footer">
      <div className="footer-first-row">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <ul className="call-email-alt">
                <li>
                  <i className="uil uil-dialpad-alt"></i>
                  {contact}
                </li>
                <li>
                  <i className="uil uil-envelope-alt"></i>
                  {infoMail}
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="social-links-footer">
                <ul>
                  <li>
                    <i className="fab fa-facebook-f"></i>
                  </li>
                  <li>
                    <i className="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fab fa-google-plus-g"></i>
                  </li>
                  <li>
                    <i className="fab fa-linkedin-in"></i>
                  </li>
                  <li>
                    <i className="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fab fa-pinterest-p"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-second-row">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Categories</h4>
                <ul>
                  {Object.keys(services).map((key) => (
                    <li>
                      <Link to="/">{services[key].name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Useful Links</h4>
                <ul>
                  <li>About US</li>
                  <li>Featured Products</li>
                  <li>Offers</li>
                  <li>Blog</li>
                  <li>Faq</li>
                  <li>Careers</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Top Cities</h4>
                <ul>
                  {props.config.branches.map((branch) => (
                    <li>
                      <Link to={branch.route} onClick={updateLocation}>
                        {branch.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-last-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-bottom-links">
                <ul>
                  <li>About</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Term & Conditions</li>
                  <li>Refund & Return Policy</li>
                </ul>
              </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
    changeLocation: (payload) => dispatch(actionCreators.setLocation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
