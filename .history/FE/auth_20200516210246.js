const socket = io();

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("firstMessage", username);
});

// get complete userDetails
socket.on("authenticate", (msg) => {
  console.log(msg);
});