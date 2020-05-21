module.exports=function formatUsers(msg,userId) {
  let sentMessageObj = {
    username:msg.username,
    message: msg.msg,
    time: date_recieved,
    id:userId
  };
  return sentMessageObj;
};