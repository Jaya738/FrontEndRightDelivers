import openSocket from "socket.io-client";

//api
const socket = openSocket("https://stream.rightdelivers.in", {
  path: "/socket.io",
  transports: ["websocket"],
});

function subscribeToSockets(interval, cb) {
  socket.connect();
  socket.on("connect", (payload) => console.log(payload));
  socket.emit("subscribe", { rKey: "", dKey: "" });
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.on("orderstatus", function (ordersData) {
    console.log(ordersData);
  });
  socket.on("toast", function (message) {
    console.log(message);
  });
}
export { subscribeToSockets };
