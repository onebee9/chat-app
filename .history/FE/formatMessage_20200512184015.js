//create and store the time a message is recieved
let date_recieved = new Date().toLocaleTimeString();

//create a message object to hold all message attributes and export so we can use the function on the server side.
module.exports = function formatMessage(username, msg,userID) {
    let sentMessageObj = {
        username: username || 'chatbot',
        message: msg,
        time: date_recieved,
        id:userID
        //language:navigator.language need to figure out how to get user's browser language
    };
    return sentMessageObj;
};

