import openSocket from "socket.io-client";
import * as actionCreators from "./Store/actions/index";
import Store from "./Store/configStore";

//api
const socket = openSocket("https://stream.rightdelivers.in", {
  path: "/socket.io",
  transports: ["websocket"],
});


function subscribeToSockets(userID) {
  //const state = Store.getState();
  socket.connect();
  
  //Establish connection
  socket.on("connect");

  //Subscribe to sockets with token
  socket.emit("subscribe",userID);
  //Get Messages from sockets
  socket.on("message", (message) => {
  });

  //Get Order Status from sockets
  socket.on("orderstatus",(ordersData) => {
    console.log("received")
    Store.dispatch(actionCreators.setOrderStatus(ordersData));
  });

  socket.on("refreshRestaurants",()=>{
    Store.dispatch(actionCreators.setReloadRestaurants());
  })
  //Get Toast Messages
  socket.on("toast", function (message) {
    return
  });
}
export { subscribeToSockets };
