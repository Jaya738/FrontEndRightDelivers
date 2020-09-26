import React, { useState } from "react";
import "./search.css";

export default function Search(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div classNameName="wrap">
      <form id="content">
        <input
          type="text"
          name="input"
          className={expanded ? "input square" : "input"}
          id="search-input"
        />
        <button
          type="reset"
          className={expanded ? "search close" : "search"}
          id="search-btn"
          onClick={() => setExpanded(!expanded)}
        ></button>
      </form>
    </div>
  );
}
