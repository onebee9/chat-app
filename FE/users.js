let date_recieved = new Date().toLocaleTimeString();

const formatUsers = (msg,userId) => {
  let sentMessageObj = {
    username:msg.username,
    message: msg.newMessage,
    time: date_recieved,
    id:userId
  };
  return sentMessageObj;
};

const userList = (id,username,room) => {
  let ConnectedUser = {id,username,room};
  return ConnectedUser;
};

const getCurrentUserId = (userId) =>{
  return userDetails.find(user => userDetails.id === userId);
};

module.exports = {
  formatUsers,
  userList,
  getCurrentUserId
};
