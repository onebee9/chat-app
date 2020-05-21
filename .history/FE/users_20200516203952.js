let date_recieved = new Date().toLocaleTimeString();
function formatUsers(msg,userId) {
  let sentMessageObj = {
    username:msg.username,
    message: msg.newMessage,
    time: date_recieved,
    id:userId
  };
  return sentMessageObj;
};

function userDetails (username,userId) {
  let sentMessageObj = {
    username:username,
    room,
    language,
    id:userId
  };
  return sentMessageObj;
};
module.exports={
formatUsers,
userDetails
};
