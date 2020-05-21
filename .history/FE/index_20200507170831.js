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
  let a = document.getElementById('message_area');
  let b = document.createElement("div");
  b.textContent=msg;
  b.classList.add("message_area");
  a.appendChild(b);
  

  //sent_msg.innerHTML=msg;
  document.getElementById('chat_form').reset();
});