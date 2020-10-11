import React, { useState } from "react";
import "./search.css";

export default function Search({
  displayText = "Search",
  value = "",
  handleSearch,
  onClear,
}) {
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
        className="search-input-field"
        type="text"
        placeholder={displayText}
        value={value}
        onChange={handleSearch}
      />
      {value !== "" && (
        <button
          className="clear-search-field"
          onClick={onClear}
          style={{
            border: "none",
            backgroundColor: "grey",
            color: "white",
            padding: "4px 12px",
            borderRadius: "5px",
            fontSize:"12px"
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
