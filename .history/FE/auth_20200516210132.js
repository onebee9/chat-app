const socket = io();

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("firstMessage", username);
});
