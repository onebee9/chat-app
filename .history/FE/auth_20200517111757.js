const socket = io();

// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(2);
  sessionStorage.setItem("username", document.getElementById("username").value);
  sessionStorage.setItem("room", document.getElementById("room").value);

  window.location.href='http://localhost:3000/chat.html';
});


