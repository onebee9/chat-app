const socket = io();
//Message from server
socket.on('message',message=>{
  console.log(message);
});

// message submit
chat_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  //get message text
  let new_message = e.target.elements.text_box.value;
  //document.getElementById("sent_msg").innerHTML = new_message;
  //emitting a message to the server.
  socket.emit('chat_message',new_message);
})
//output message from chat_message to DOM
socket.on(('message'),(msg)=>{
  
  //creates a new message bubble with the recieved message like a normal chat
  let a = document.getElementById('message_area');
  let b = document.createElement('div');
  b.textContent=msg;
  b.classList.add('sent_message');
  a.appendChild(b);
  
  
  document.getElementById('chat_form').reset();
});