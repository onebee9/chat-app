const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require ("socket.io")(server);
const bodyParser = require("body-parser");
const PORT = 3000;
const chatbot = "Chabot";

//get external modules
const { formatMessage} = require("./FE/formatMessage.js");
const { formatUsers, userList} = require("./FE/users.js");

app.use(express.static(path.join(__dirname + "/FE/")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let userData = [];

io.on("connection", (socket) => {
  
  const userId = socket.id; 

  //recieves the first message from the client
  socket.on("userJoin", (userDetails) => {
    let user = userList(userId, userDetails.username, userDetails.room);
    userData.push(user);
    io.emit("onlineUsers", userData);
    io.emit("newUser", user);
  });

  socket.emit(
    "BroadcastMessage",
    formatMessage(chatbot, "Welcome to your first message!")
  );

  socket.emit(
    "BroadcastMessage",
    formatMessage(chatbot, "A user has joined the chat!")
  );

  socket.on("disconnect", () => {
  //removes disconnected users from the array 
    let leftUser = userData.indexOf(userId);
    if (leftUser >= 0) userData.splice(leftUser, 1);
    io.emit("removeUser", userId);
    io.emit(
      "BroadcastMessage",
      formatMessage(chatbot, "A user has left the chat")
    );
  });

  socket.on("typing", (username) => {
    io.emit("incoming", username);
  });

  socket.on("chat_message", (msg) => {
    io.emit("NewMessage", formatUsers(msg, userId));
  });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
