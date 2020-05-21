const socket = io();
const userDetails={};

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  sessionStorage.setItem("username",document.getElementById('username').value);
  sessionStorage.setItem("room",document.getElementById('room').value);

  userTest.username = sessionStorage.getItem('username');
  userTest.room = sessionStorage.getItem('room');

  socket.emit("firstMessage", userTest);
  console.log(userTest);
  window.location.replace("chat.html");
});

// get complete userDetails
socket.on("authenticate", (msg) => {
  console.log(msg);
  console.log(msg);
}); 