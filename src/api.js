import openSocket from "socket.io-client";
import { connect } from "react-redux";
import * as actionCreators from "./Store/actions/index";
import Store from "./Store/configStore";

//api
const socket = openSocket("https://stream.rightdelivers.in", {
  path: "/socket.io",
  transports: ["websocket"],
});


function subscribeToSockets(userID) {
  const state = Store.getState();
  socket.connect();
  const ord = {msg: "Order Accepted",
    orderId: "111136",
    ost: 1,
    ptime: 0,
    ratime: 1597241022,
    rjtime: 0,
    status: 1,
    }
  
  //Establish connection
  socket.on("connect");

  //Subscribe to sockets with token
  socket.emit("subscribe",userID);
  //Get Messages from sockets
  socket.on("message", (message) => {
    console.log(message);
  });

  //Get Order Status from sockets
  socket.on("orderstatus",(ordersData) => {
    Store.dispatch(actionCreators.setOrderStatus(ordersData));
  });

  socket.on("refreshRestaurants",()=>{
    Store.dispatch(actionCreators.setReloadRestaurants());
  })
  //Get Toast Messages
  socket.on("toast", function (message) {
    console.log(message);
  });
}
export { subscribeToSockets };
