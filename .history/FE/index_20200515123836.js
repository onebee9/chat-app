//get usernames from query string
const{username,room}= Qs.parse(location.search,{ignoreQueryPrefix:true});
console.log(username,room);

const socket = io();

let timeoutId; // variable used to keep track of timers
const textArea = document.getElementById("text_box");
const incomingContainer = document.getElementById("incoming-messages");
const incomingDivs = {};
const onlineUsers = [];

function showIncomingAlert(username) {
  if (username !== "chabot") {
    if (!incomingDivs[username]) {
      incomingDivs[username] = document.createElement("p");
      incomingContainer.appendChild(incomingDivs[username]);
    }
    incomingDivs[username].textContent = `${username} is typing a message...`;
    incomingDivs[username].classList.remove("hidden-incoming");
    incomingDivs[username].classList.add("visible-incoming");
  }
}

function hideIncomingAlert(username) {
  if (username !== "chabot") {
    incomingDivs[username].textContent = "";
    incomingDivs[username].classList.remove("visible-incoming");
    incomingDivs[username].classList.add("hidden-incoming");
  }
}
//get the usernames of the people typing  and send to the server on the "typing" event.
textArea.addEventListener("input", (event) => {
  socket.emit("typing", username);
});

//get the usernames of everyone connected and send to the server on the "connectedUsers" event.
  

// message input field submit
chat_form.addEventListener("submit", (e) => {
  e.preventDefault();

  //get message text
  let newMessage = e.target.elements.text_box.value;
  // let username = e.target.elements.uname.value;
  let user_lang = window.navigator.userLanguage || window.navigator.language;
  console.log(newMessage);
  // console.log(user_lang);

  //document.getElementById("sent_msg").innerHTML = new_message;
  //emitting a message to the server.
  socket.emit("chat_message", { newMessage, username, user_lang });
  socket.emit("connectedUsers", username);
});

//recieve user object containing username and userID from the server and print both to screen
socket.on("userDetails", (userDetails) => {
 console.log(userDetails);
});

// recieve usernmames of connected clients currently typing to send a message
socket.on("incoming", (username) => {
  showIncomingAlert(username);

  // reset timeout if this handler is executed again. this is necessary to reset the timeout function
  if (timeoutId) clearTimeout(timeoutId);

  // execute only the final timeout function after 1second if inactivity
  timeoutId = setTimeout(() => hideIncomingAlert(username), 1000);
});


//output message from chat_message to DOM
socket.on("message", (msg) => {
  hideIncomingAlert(msg.username);
  console.log(msg);
  //creates a new div with the recieved message content everytime it recieves a message, like a normal chat.
  let messageContainer = document.getElementById("messages");
  let messageBubble = document.createElement("div");
  let broadcast_bubble = document.createElement("div");
  // let messageTime = document.createElement('p');
  let messageAuthor = document.createElement("p");

  //add the retrieved content to the created html elements
  messageBubble.textContent = msg.message;
  //messageTime.textContent=msg.time;
  messageAuthor.textContent = msg.username;
  broadcast_bubble.textContent = msg.message;

  //syle the message content by appending css style classes
  messageBubble.classList.add("sent_message");
  messageAuthor.classList.add("message_author");
  broadcast_bubble.classList.add("sent_message");
  //messageTime.classList.add('message_recieved_date');

  //add the message and its contents to the div
  messageContainer.appendChild(messageAuthor);
  messageContainer.appendChild(messageBubble);
  messageContainer.appendChild(broadcast_bubble);
  //messageContainer.appendChild(messageTime);

  //creates a new div for online users
  let userArea = document.getElementById("user_panel");
  let userlist = document.createElement("p");
  userlist.textContent = msg.id;
  userlist.classList.add("sent_message");
  userArea.appendChild(userlist);

  document.getElementById("chat_form").reset();
});
