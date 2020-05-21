
function formatUsers(msg,msgTime,userId) {
  let sentMessageObj = {
    username:msg.username,
    message: msg.newMessage,
    time:msgTime,
    id:userId
  };
  return sentMessageObj;
};

function userDetails (userId) {
  let sentMessageObj = {
    username,
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
