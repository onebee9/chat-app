module.exports=function formatUsers(username,userID,msg) {
  let sentMessageObj = {
      username,
      userID,
      msg
  };
  return sentMessageObj;
};