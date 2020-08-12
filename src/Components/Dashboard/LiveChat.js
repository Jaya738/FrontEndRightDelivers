import React from "react";
import MblNavbar from "../MblNavbar";
import {useHistory} from "react-router-dom";

export default function LiveChat(props) {
    const history = useHistory()
  return (
    <div>
        <MblNavbar heading="More" back={() => history.goBack()} />
      <h1>LiveChat</h1>
    </div>
  );
}
