const socket = io();
const userTest={};

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById('username');
  let room = document.getElementById('room');
  userTest.username = username;
  userTest.room = room;

  socket.emit("firstMessage", username);
  console.log(username);
});

// get complete userDetails
socket.on("authenticate", (msg) => {
  console.log(msg);
});