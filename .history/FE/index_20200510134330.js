const socket = io();

let timeoutId;
const usernameContainer = document.getElementById('uname');
const textArea = document.getElementById('text_box');
const incoming = document.getElementById('incoming');

function showIncomingAlert(username) {
    incoming.textContent = `${username} is typing a message...`;
    incoming.classList.remove('hidden-incoming');
    incoming.classList.add('visible-incoming');
}

function hideIncomingAlert() {
    incoming.textContent = '';
    incoming.classList.remove('visible-incoming');
    incoming.classList.add('hidden-incoming');
}

textArea.addEventListener('input', event => {
    const username = usernameContainer.value;
    socket.emit('typing', username);
});

// message input field submit
chat_form.addEventListener("submit", (e) => {
    e.preventDefault();

    //get message text
    let new_message = e.target.elements.text_box.value;
    // let username = e.target.elements.uname.value;
    const username = usernameContainer.value;
    let user_lang = window.navigator.userLanguage || window.navigator.language;
    console.log(username);
    console.log(user_lang);

    //document.getElementById("sent_msg").innerHTML = new_message;
    //emitting a message to the server.
    socket.emit("chat_message", { new_message, username, user_lang });
});

socket.on('incoming', username => {
    showIncomingAlert(username);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => hideIncomingAlert(), 1000);
});

//output message from chat_message to DOM
socket.on("message", (msg) => {

    //creates a new div with the recieved message content everytime it recieves a message, like a normal chat.
    let messageContainer = document.getElementById("messages");
    let messageBubble = document.createElement("div");
    let broadcast_bubble = document.createElement("div");

    // let messageTime = document.createElement('p');
    let messageAuthor = document.createElement("p");

    //add the retrieved content to the created html elements
    messageBubble.textContent = msg.new_message;
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

    document.getElementById("chat_form").reset();
});