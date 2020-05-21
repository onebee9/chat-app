//get usernames from query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

const socket = io();

let timeoutId; // variable used to keep track of timers
const textArea = document.getElementById("text_box"); //Gets sent chat message from text_area.
const incomingContainer = document.getElementById("incoming-messages"); //To display "typing" indicator.
const messageContainer = document.getElementById("messages"); //To hold all message content
const messageAuthor = document.createElement("p"); //To append the username/author for the message
const incomingDivs = {};
const onlineUsers = [];

//show who's currently typing
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
    incomingDivs[username].textContent = "placeholder text to keep div-shape";
    incomingDivs[username].classList.remove("visible-incoming");
    incomingDivs[username].classList.add("hidden-incoming");
  }
}

//get the usernames of the people typing  and send to the server on the "typing" event.
textArea.addEventListener("input", (event) => {
  socket.emit("typing", username);
});

// TextArea submit
chat_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newMessage = e.target.elements.text_box.value; //get message text
  let userLang = window.navigator.userLanguage || window.navigator.language; //get user language

  //emit message to the server.
  socket.emit("chat_message", { newMessage, username, userLang });
  socket.emit("connectedUsers", username);
});

//recieve user object containing username and userID from the server and print both to screen
socket.on("userDetails", (userDetails) => {
  console.log(userDetails);
});

// recieve usernmames of connected clients currently typing a message
socket.on("incoming", (username) => {
  showIncomingAlert(username);
  if (timeoutId) clearTimeout(timeoutId); // reset timeout if this handler is executed again. this is necessary to reset the timeout function
  timeoutId = setTimeout(() => hideIncomingAlert(username), 1000); // execute only the final timeout function after 1second if inactivity
});

//output message from chat_message to DOM
socket.on("NewMessage", (msg) => {
  hideIncomingAlert(msg.username);
  console.log(msg);

  const messageBubble = document.createElement("div");//To append all messages from users
  // let messageTime = document.createElement('p');

  messageBubble.textContent = msg.message; //add the retrieved content to the created html elements
  //messageTime.textContent=msg.time;
  messageAuthor.textContent = msg.username;

  //Appending a style class
  messageBubble.classList.add("sent_message");
  messageAuthor.classList.add("message_author");
  //messageTime.classList.add('message_recieved_date');

  //add the message and its contents to the div
  messageContainer.appendChild(messageAuthor);
  messageContainer.appendChild(messageBubble);
  //messageContainer.appendChild(messageTime);

  document.getElementById("chat_form").reset();
});

socket.on("BroadcastMessage", (msg) => {
  console.log(msg);
  //To append all broadcast messages from the chatbot
  const broadcastBubble = document.createElement("div"); 

  //insert content
  broadcastBubble.textContent = msg.message;
  messageAuthor.textContent = msg.username;

  //add class for style
  broadcastBubble.classList.add("sent_message");

  //add to message container div
  messageContainer.appendChild(messageAuthor);
  messageContainer.appendChild(broadcastBubble);

});
