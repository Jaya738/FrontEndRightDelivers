import React, { useState } from "react";
import "./search.css";

export default function Search({
  displayText = "Search",
  value = "",
  handleSearch,
  onClear,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="restaurants-search-box d-flex"
      style={{ justifyContent: "left", margin: "0px 16px" }}
    >
      <input
        style={{
          border: "none",
          backgroundColor: "transparent",
          color: "#2f4f4f",
          fontSize: "16px",
          borderRadius: "5px",
        }}
        type="text"
        placeholder={displayText}
        value={value}
        onChange={handleSearch}
      />
      {value !== "" && (
        <button
          className="clear-field"
          onClick={onClear}
          style={{
            border: "none",
            backgroundColor: "#2f4f4f",
            color: "white",
            padding: "4px 20px",
            borderRadius: "5px",
          }}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
}
