const socket = io();

socket.on('message',message=>{
  console.log(message);
});

// message submit
chat_form.addeventlistener('submit',(e)=>{
  e.preventDefault();
  let new_message = document.getElementById("text_box").value;
  console.log(new_message);
})