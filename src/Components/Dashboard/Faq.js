import React from "react";
import { Accordion, Card } from "react-bootstrap";
import MblNavbar from "../Common/MblNavbar";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Faq(props) {
  const history = useHistory();
  const faqData = props.config.faqs || [];
  return (
    <div className="container">
      <MblNavbar heading="FAQ" back={() => history.goBack()} />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="default-title mt-5">
            <h2>Frequently Asked Questions</h2>
          </div>
          <Accordion
            className="w-100 accordion mb-5"
            defaultActiveKey="0"
          >
            {faqData.map((data) => (
              <div style={{ marginBottom: "10px" }}>
                <Accordion.Toggle as={Card.Header} eventKey={data.t}>
                  {data.t}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={data.t}>
                  <div className="panel-body">
                    <p>{data.a}</p>
                  </div>
                </Accordion.Collapse>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
export default connect(mapStateToProps)(withRouter(Faq));