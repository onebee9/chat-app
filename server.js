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
const {botMessage} = require("./FE/formatMessage.js");
const {formatUsers,userList,searchArrayObj} = require("./FE/users.js");

app.use(express.static(path.join(__dirname + "/FE/")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let userData =[];
let roomData = ["travel & tourism","shopping","expat","fishing"];
let memberCount = 0;

io.on("connection", (socket) => {
  
  const userId = socket.id; 
  //recieves the first message from the client
  socket.on("userJoin", (userDetails) => {

    
      socket.join(userDetails.chosenRoom);
      //add create a complete user object
      let user = userList(userId, userDetails.username, userDetails.chosenRoom);
      userData.push(user);
      //send to client 
      io.emit("onlineUsers", userData);
      io.emit("newUser", user);
      
      //welcome user to room
      io.to(user.room).emit(
        'broadcastMessage',botMessage(chatbot,`Welcome to the ${user.room} club ${user.username}!`));
    
  });

  socket.on("chatMessage", (msg) => {
    io.in(msg.chosenRoom).emit("newMessage", formatUsers(msg, userId));
  });

  socket.on("privateMessage", (msg) => {
   socket.join(msg.recipientId);
   io.in(msg.recipientId).emit("incomingPrivateMessage",formatUsers(msg));
  });

  io.emit("AvailableRooms",(roomData));

  socket.on("typing", (username) => {
    io.emit("incoming", username);
  });
 
  socket.on("disconnect", () => {
    //removes disconnected users from the array 
      let location = searchArrayObj(userId,userData);
      let leftUser = userData.indexOf(location);
        if (leftUser >= 0){userData.splice(leftUser, 1);}
          io.emit("removeUser", userId);
            socket.emit(
              "BroadcastMessage",
              botMessage(chatbot, "A user has left the chat")
            );
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
