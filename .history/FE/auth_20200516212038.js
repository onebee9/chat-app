const socket = io();
const userTest={};

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById('username').value;
  let room = document.getElementById('room').value;
  userTest.username = username;
  userTest.room = room;

  socket.emit("firstMessage", userTest);
  console.log(userTest);
  window.location.replace("chat.html");
});

// get complete userDetails
socket.on("authenticate", (msg) => {
  console.log(msg);
});