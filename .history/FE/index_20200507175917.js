const socket = io();
//Message from server
socket.on('message',message=>{
  console.log(message);
});

 // message input field submit
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
  let date_recieved = new Date().toLocaleTimeString();
  let sentMessageObj={
    username:'username',
    message:msg,
    time:date_recieved,
    language:navigator.language
  };
  //creates a new message bubble with the recieved message like a normal chat
  let a = document.getElementById('message_area');
  let b = document.createElement('div');
  let c = document.createElement('p');
  let d = document.createElement('p');
  b.textContent=sentMessageObj.message;
  c.textContent=sentMessageObj.time;
  b.classList.add('sent_message');
  c.classList.add('message_recieved_date');
  a.appendChild(b);
  a.appendChild(c);
  a.appendChild(d);
  
  
  
  document.getElementById('chat_form').reset();
});