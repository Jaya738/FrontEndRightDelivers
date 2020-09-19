import React, { useState } from "react";
import "./Menu.css";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

function ProductQuantity(props) {
  const data = [
    {
      type: "0.5 kg",
      price: "100",
    },
    {
      type: "1 kg",
      price: "200",
    },
    {
      type: "1.5 kg",
      price: "300",
    },
    {
      type: "2 kg",
      price: "400",
    },
  ];
  const [selectedType, setSelectedType] = useState(data[0]);
  const handleSelect = (selectedObj) => {
    setSelectedType(selectedObj);
  };

  return (
    <div className="product-types">
      <Dropdown as={ButtonGroup}>
        <Button>{selectedType.type}</Button>
        <Dropdown.Toggle split id="dropdown-split-basic" />
        <Dropdown.Menu>
          {data.map((item) => (
            <Dropdown.Item key={item.price} onSelect={() => handleSelect(item)}>
              {item.type}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
export default ProductQuantity;
