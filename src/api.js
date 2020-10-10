import openSocket from "socket.io-client";
import * as actionCreators from "./Store/actions/index";
import Store from "./Store/configStore";
import {streamUrl} from "./config"

const socket = openSocket(streamUrl, {
  path: "/socket.io",
  transports: ["websocket"],
});


function subscribeToSockets(userID) {
  console.log("subscribed")
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

function unsubscribeToSockets(userID){
  console.log("Unsubscribed")
  socket.emit("unsubscribe",userID)
}

//fetch api with timeout

const fetchWithTimeout = (uri, options = {}, time = 5000) => {
  // Lets set up our `AbortController`, and create a request options object
  // that includes the controller's `signal` to pass to `fetch`.
  const controller = new AbortController()
  const config = { ...options, signal: controller.signal }
  // Set a timeout limit for the request using `setTimeout`. If the body
  // of this timeout is reached before the request is completed, it will
  // be cancelled.
  const timeout = setTimeout(() => {
    controller.abort()
  }, time)
  return fetch(uri, config)
    .then((response) => {
      // Because _any_ response is considered a success to `fetch`, we
      // need to manually check that the response is in the 200 range.
      // This is typically how I handle that.
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return response
    })
    .catch((error) => {
      // When we abort our `fetch`, the controller conveniently throws
      // a named error, allowing us to handle them separately from
      // other errors.
      if (error.name === 'AbortError') {
        throw new Error('Response timed out')
      }
      throw new Error(error.message)
    })
}
export { subscribeToSockets, unsubscribeToSockets, fetchWithTimeout };
