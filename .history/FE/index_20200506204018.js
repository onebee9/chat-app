const socket = io();

socket.on('message',message=>{
  console.log(message);
});

// message submit
chat_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let new_message = e.target.elements.text_box.value;
  console.log(new_message);
})