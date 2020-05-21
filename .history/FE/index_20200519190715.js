const socket = io();

let timeoutId; // variable used to keep track of timers
const textArea = document.getElementById("text_box"); //Gets sent chat message from text_area.
const incomingContainer = document.getElementById("incoming-messages"); //To display "typing" indicator.
const messageContainer = document.getElementById("messages"); //To hold all message content
const userLang = window.navigator.userLanguage || window.navigator.language; //get user language
const username = sessionStorage.getItem("username");
const room = sessionStorage.getItem("room");
const incomingDivs = {};
const userDetails = [];
userDetails.push(username);

const userDetails_endpoint = 'http://localhost:3000/api/userDetails';
const getInfo = document.getElementById("getInfo");

getInfo.addEventListener("submit", async(e) => {
  e.preventDefault();
    try{
      //sessionStorage.setItem("username", document.getElementById("username").value);
      //sessionStorage.setItem("room", document.getElementById("room").value);
      const response = await fetch(userDetails_endpoint);
      console.log(userDetails_endpoint);

      const user_data = await response.json();
      console.log(user_data);

      window.location.href='http://localhost:3000/chat.html';
  }
    catch (error){  //handles all errors
      console.error('Error:', error);
  }
});

//send first message with userDetails
socket.emit("firstMessage", userDetails);
  console.log(userDetails);

// get complete userDetails
socket.on("authenticate", (userDetails) => {
  console.log(userDetails);

  //Create a div and a paragraph for connected users
  const usernameDisplay = document.getElementById("usernameDisplay");
  const connectedUsers = document.createElement("p"); //To append the usernames
  
  //insert content
  connectedUsers.textContent = userDetails.username;

  //add a class for styling
  connectedUsers.classList.add("message_author");

  //add to connected users to main div
  usernameDisplay.appendChild(connectedUsers);
});

// submit message and its sttributes to server
let chatForm = document.getElementById("chat_form");
if (chatForm !== null) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newMessage = e.target.elements.text_box.value; //get message text
    socket.emit("chat_message", { newMessage, username, room });
  });
}

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

//use invisible placeholder text to keep div shape
function hideIncomingAlert(username) {
  if (username !== "chabot") {
    incomingDivs[username].textContent = "placeholder text to keep div-shape";
    incomingDivs[username].classList.remove("visible-incoming");
    incomingDivs[username].classList.add("hidden-incoming");
  }
}
if (textArea !== null) {
  textArea.addEventListener("input", (event) => {
    socket.emit("typing", username);
  });
}

// recieve usernmames of connected clients currently typing a message
socket.on("incoming", (username) => {
  showIncomingAlert(username);
  if (timeoutId) clearTimeout(timeoutId); // reset timeout if this handler is executed again. this is necessary to reset the timeout function
  timeoutId = setTimeout(() => hideIncomingAlert(username), 1000); // execute only the final timeout function after 1second if inactivity
});

//recieve new messages on the "chat_message" event and output to DOM
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

//recieve broadcast messages on the "message" event and output to DOM
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
