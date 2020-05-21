
function formatUsers(msg) {
  let sentMessageObj = {
    username:msg.username,
    message: msg.newMessage,
    time: socket.time,
    id:socket.id,
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
