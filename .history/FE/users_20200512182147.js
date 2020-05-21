let date_recieved = new Date().toLocaleTimeString();
module.exports=function formatUsers(msg,userId) {
  let sentMessageObj = {
    username:msg.username,
    message: msg.new_message,
    time: date_recieved,
    id:userId
  };
  return sentMessageObj;
};