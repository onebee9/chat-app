//handle login and get username
module.exports =function submitName(){
  let username=document.getElementById("username").value;
  window.location.href = "/Users/ibifuro-odu/Documents/chat-app/FE/index.html"; 
  console.log(username);
  return username;
};
