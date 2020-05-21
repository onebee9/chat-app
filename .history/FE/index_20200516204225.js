const socket = io();



let timeoutId; // variable used to keep track of timers

const textArea = document.getElementById("text_box"); //Gets sent chat message from text_area.
const incomingContainer = document.getElementById("incoming-messages"); //To display "typing" indicator.
const messageContainer = document.getElementById("messages"); //To hold all message content
const userLang = window.navigator.userLanguage || window.navigator.language; //get user language
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix: true});
const incomingDivs = {};
const onlineUsers ={
  username,
  room
};
// send first message to identify users
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("firstMessage", username);
});

// submit message and its sttributes to server
let chatForm = document.getElementById("chat_form");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newMessage = e.target.elements.text_box.value;  //get message text
  socket.emit("chat_message", {newMessage,username,room});
});

// get complete userDetails
socket.on("authenticate", (msg) => {
  console.log(msg);
});

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

//use iinvisible placeholder text
function hideIncomingAlert(username) {
  if (username !== "chabot") {
    incomingDivs[username].textContent = "placeholder text to keep div-shape";
    incomingDivs[username].classList.remove("visible-incoming");
    incomingDivs[username].classList.add("hidden-incoming");
  }
}

textArea.addEventListener("input", (event) => {
  socket.emit("typing", username);
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

  const messageBubble = document.createElement("div"); //To append all messages from users
  let chatMessageAuthor = document.createElement("p"); //To append the username/author for the message
  // let messageTime = document.createElement('p');

  messageBubble.textContent = msg.message; //add the retrieved content to the created html elements
  //messageTime.textContent=msg.time;
  chatMessageAuthor.textContent = msg.username;

  //Appending a style class
  messageBubble.classList.add("sent_message");
  chatMessageAuthor.classList.add("message_author");
  //messageTime.classList.add('message_recieved_date');

  //add the message and its contents to the div
  messageContainer.appendChild(chatMessageAuthor);
  messageContainer.appendChild(messageBubble);
  //messageContainer.appendChild(messageTime);

  document.getElementById("chat_form").reset();
});

socket.on("BroadcastMessage", (msg) => {
  console.log(msg);
  //To append all broadcast messages from the chatbot
  const broadcastBubble = document.createElement("div");
  const broadcastMessageAuthor = document.createElement("p"); //To append the username/author for the message
  //insert content
  broadcastBubble.textContent = msg.message;
  broadcastMessageAuthor.textContent = msg.username;

  //add class for style
  broadcastBubble.classList.add("sent_message");
  broadcastMessageAuthor.classList.add("message_author");

  //add to message container div
  messageContainer.appendChild(broadcastMessageAuthor);
  messageContainer.appendChild(broadcastBubble);
});
