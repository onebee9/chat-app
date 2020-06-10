const socket = io();

let timeoutId; // variable used to keep track of timers
const textArea = document.getElementById("message"); //Gets sent chat message from text_area.
const chatForm = document.getElementById("chatForm");
const incomingContainer = document.getElementById("incoming-messages"); //To display "typing" indicator
const usernameDisplay = document.getElementById("onlineUsersDisplay"); //To display connected users, need to change this to new format.
const RoomDisplay = document.getElementById("room");
const RoomHighlight = document.getElementById("room");
const displayName = document.getElementById("profileName");
const messageContainer = document.getElementById("messageDetails"); //To hold all message content
const profilePic = document.getElementById("messageProfilePic"); //profile picture.
const userLang = window.navigator.userLanguage || window.navigator.language; //get user language
const username = localStorage.getItem("username");
const room = localStorage.getItem("room");
const userDetails = { username, room, userLang };
const incomingDivs = {};

//sending user information to the server
socket.emit("userJoin", userDetails);

//personalisation
let selectedRoom = document.createElement("p");
let profileName = document.createElement("p");

selectedRoom.textContent = userDetails.room;
profileName.textContent = `${userDetails.username}'s`;
profileName.classList.add("profileName");

RoomDisplay.appendChild(selectedRoom);
displayName.appendChild(profileName);

//function list

const showIncomingAlert = (username) => {
  //show typing alert
  if (username !== "chabot") {
    if (!incomingDivs[username]) {
      incomingDivs[username] = document.createElement("p");
      incomingContainer.appendChild(incomingDivs[username]);
    }
    incomingDivs[username].textContent = `${username} is typing a message...`;
    incomingDivs[username].classList.remove("hidden-incoming");
    incomingDivs[username].classList.add("visible-incoming");
  }
};

const hideIncomingAlert = (username) => {
  //hide typing alert
  if (username !== "chabot") {
    incomingDivs[username].textContent = "";
    incomingDivs[username].classList.remove("visible-incoming");
    incomingDivs[username].classList.add("hidden-incoming");
  }
};

const DisplayOnlineUsers = (user) => {
  // create list of online users
  let onlineUser = document.createElement("a");
  let linkText = document.createTextNode(user.username);
  onlineUser.appendChild(linkText);
  onlineUser.setAttribute("id", user.id);
  onlineUser.setAttribute("href", "#");
  usernameDisplay.appendChild(onlineUser);
};

const removeDisconnectedUsers = (userId) => {
  //remove disconnected users from userList.
  let offlineUser = document.getElementById(userId);
  console.log(offlineUser);
  console.log(userId);
  offlineUser.parentNode.removeChild(offlineUser);
};
const createMessage = (msg) => {
  //Create and style messages and append.
  if (messageContainer) {
    let messageBubble = document.createElement("p");
    let chatMessageAuthor = document.createElement("p");
    let messageTime = document.createElement("p");

    //add the retrieved content to the created html elements
    messageBubble.textContent = msg.message;
    messageTime.textContent = msg.time;
    chatMessageAuthor.textContent = msg.username;

    //Append a style class
    chatMessageAuthor.classList.add("author");
    messageTime.classList.add("messageTime");
    messageBubble.classList.add("messageText");
    messageBubble.style.padding = "2px 10px 5px 0px";

    //Append to dom
    messageContainer.appendChild(chatMessageAuthor);
    messageContainer.appendChild(messageTime);
    messageContainer.appendChild(messageBubble);
    messageContainer.style.padding = "5px 10px 20px 0px";

    document.getElementById("chatForm").reset();
  }
};

// Sending and recieving Events
if (chatForm !== null) {
  // submits message and its sttributes to server
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newMessage = e.target.elements.message.value.trim();
    socket.emit("chat_message", { newMessage, username, room });
  });
}

if (textArea !== null) {
  // sends notification for a "typing" event
  textArea.addEventListener("input", (event) => {
    socket.emit("typing", username);
  });
}

// Recieve list of online users and display(First Connection)
socket.once("onlineUsers", (userData) => {
  userData.forEach(DisplayOnlineUsers);
});

// Recieve list of online users and display(subsequent connections)
socket.on("newUser", (user) => {
  if(!(user.username ===username)){
     DisplayOnlineUsers(user)
  }
});

// Remove disconnected users
socket.on("removeUser", (userId) => removeDisconnectedUsers(userId));

// recieve usernmames of connected clients currently typing a message
socket.on("incoming", (username) => {
  showIncomingAlert(username);
  if (timeoutId) clearTimeout(timeoutId); // reset timeout if this handler is executed again. this is necessary to reset the timeout function
  timeoutId = setTimeout(() => hideIncomingAlert(username), 1000); // execute only the final timeout function after 1second of inactivity
});

//recieve new messages on the "chat_message" event and output to DOM
socket.on("NewMessage", (msg) => {
  hideIncomingAlert(msg.username);
  createMessage(msg);
});

socket.on("BroadcastMessage", (msg) => createMessage(msg));
