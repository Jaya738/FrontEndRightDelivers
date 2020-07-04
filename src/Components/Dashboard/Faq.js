import React from "react";
import { Accordion, Card } from "react-bootstrap";

export default function Faq(props) {
  const dummyDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam semper faucibus erat a efficitur. Praesent vulputate
  mauris eget augue semper, at eleifend enim aliquam. Vivamus
  suscipit lacinia neque eget suscipit. Morbi vitae nisl ac
  justo placerat vulputate ac quis lectus. Vestibulum
  pellentesque, orci eu ultrices molestie, nisi libero
  hendrerit eros, vel interdum augue tortor vel urna. Nullam
  enim dolor, pulvinar in metus vitae, tincidunt dignissim
  neque.`;
  const faqData = [
    {
      id: "one",
      heading: "Registration",
      desc: dummyDesc,
    },
    {
      id: "two",
      heading: "Account Related",
      desc: dummyDesc,
    },
    {
      id: "three",
      heading: "Payment",
      desc: dummyDesc,
    },
    {
      id: "four",
      heading: "Delivery Related",
      desc: dummyDesc,
    },
    {
      id: "five",
      heading: "Order Related",
      desc: dummyDesc,
    },
    {
      id: "six",
      heading: "Return & Refund",
      desc: dummyDesc,
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="default-title mt-4">
            <h2>Frequently Asked Questions</h2>
          </div>
          <Accordion
            className="panel-group accordion pt-1 mb-5"
            defaultActiveKey="0"
          >
            {faqData.map((data) => (
              <div style={{}}>
                <Accordion.Toggle as={Card.Header} eventKey={data.id}>
                  {data.heading}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={data.id}>
                  <div className="panel-body">
                    <p>{data.desc}</p>
                  </div>
                </Accordion.Collapse>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
