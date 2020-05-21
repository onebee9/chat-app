module.exports=function formatUsers(username,userID,msg) {
  let sentMessageObj = {
    username,
    message: msg,
    time: date_recieved,
    id:userID
  };
  return sentMessageObj;
};