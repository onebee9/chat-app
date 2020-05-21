const Author = require('/Users/ibifuro-odu/Documents/chat-app/FE/index.js');
//formatting the message to add on all required content

//getting the username from the query string
//var urlParams = new URLSearchParams(window.location.search);
//let username = urlParams.get('username');
//console.log(username); 

//create and store the time a message is recieved
  let date_recieved = new Date().toLocaleTimeString();
  let username = document.getElementById('username').value;

  //create a message object to hold all message attributes and export so we can use the function on the server side.
  module.exports = function formatMessage(username,msg){
    let sentMessageObj ={
      username:username,
      message:msg,
      time:date_recieved,
      //language:navigator.language need to figure out how to get user's browser language
    };
    return sentMessageObj;
  };
