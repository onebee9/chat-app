const socket = io();
const userDetails = {};

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(2);
  sessionStorage.setItem("username", document.getElementById("username").value);
  sessionStorage.setItem("room", document.getElementById("room").value);

  userDetails.username = sessionStorage.getItem("username");
  userDetails.room = sessionStorage.getItem("room");

  socket.emit("firstMessage", userDetails);
  window.location.replace("chat.html");
});


