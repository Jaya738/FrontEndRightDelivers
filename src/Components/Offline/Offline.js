import React from "react";
import disconnected from "./offline.svg";
function Offline() {
  return (
    <div>
      <Image src={disconnected} fluid />
    </div>
  );
}

export default Offline;
