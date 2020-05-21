const socket = io();
//Message from server
socket.on('message',message=>{
  console.log(message);
});
let username = document.querySelector('#uname');
console.log(username);
 // message input field submit
 chat_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  //get message text
  let new_message = e.target.elements.text_box.value;
  //document.getElementById("sent_msg").innerHTML = new_message;
  //emitting a message to the server.
  socket.emit('chat_message',{new_message,username});
});
//output message from chat_message to DOM
socket.on(('message'),(msg)=>{
console.log(msg);
  //creates a new div with the recieved message content everytime it recieves a message, like a normal chat.
  let messageContainer = document.getElementById('messages');
  let messageBubble = document.createElement('div');
 // let messageTime = document.createElement('p');
  let messageAuthor = document.createElement('p');

  //add the retrieved content to the created html elements
  messageBubble.textContent=msg.new_message;
  //messageTime.textContent=msg.time;
  messageAuthor.textContent=msg.username;

  //syle the message content by appending css style classes
  messageBubble.classList.add('sent_message');
  messageAuthor.classList.add('message_author');
  //messageTime.classList.add('message_recieved_date');

  //add the message and its contents to the div
  messageContainer.appendChild(messageAuthor);
  messageContainer.appendChild(messageBubble);
  //messageContainer.appendChild(messageTime);
  
  
  
  document.getElementById('chat_form').reset();
});
