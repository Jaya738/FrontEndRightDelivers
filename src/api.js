import openSocket from "socket.io-client";
import { connect } from "react-redux";
import * as actionCreators from "./Store/actions/index";
import Store from "./Store/configStore";

//api
const socket = openSocket("https://stream.rightdelivers.in", {
  path: "/socket.io",
  transports: ["websocket"],
});

function subscribeToSockets(props) {
  const state = Store.getState();
  socket.connect();
  const payload = { status: "Cooking" };
  //remove below line
  Store.dispatch(actionCreators.setOrderStatus(payload));

  //Establish connection
  socket.on("connect", (payload) => console.log(payload));

  //Subscribe to sockets with token
  socket.emit("subscribe", {
    rKey: state.config.authData.rKey || "",
    dKey: state.config.authData.dKey || "",
  });

  //Get Messages from sockets
  socket.on("message", (message) => {
    console.log(message);
  });

  //Get Order Status from sockets
  socket.on("orderstatus", function (ordersData) {
    Store.dispatch(actionCreators.setOrderStatus(ordersData));
  });

  //Get Toast Messages
  socket.on("toast", function (message) {
    console.log(message);
  });
}
export { subscribeToSockets };
