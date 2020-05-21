const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const PORT = 3000;
const qs = require('qs');
const { MongoClient } = require('mongodb');
const formatMessage = require('./FE/formatMessage.js');
const formatUsers = require('./FE/users.js')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const chatbot = 'chabot';
const uri = "mongodb+srv://ibifuro:<password>@onebee9-6shml.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);


//set static folder
app.use(express.static(path.join(__dirname + '/FE/')));


io.on('connection', socket => {
    // get message time and Id;
    const userId = socket.id;
    console.log(usercount++);

    //recieve first message from user
    socket.on("firstMessage",(userDetails)=>{
        userDetails.id = userId;
            io.emit('authenticate', userDetails);
    });

    //single client - send to just one client i.e a personal notification
    socket.emit('BroadcastMessage', formatMessage(chatbot,'welcome to your first message!'));

    //Broadcast when a user connects( everyone except the person that sent the broadcast/person that the broadcast concerns).
    io.emit('BroadcastMessage', formatMessage(chatbot, 'user has joined the chat!'));


    //runs when client disconnects
    socket.on('disconnect', () => {
        // this function is used to send a message to every single person in the chat.
        io.emit('BroadcastMessage', formatMessage(chatbot, 'a user has left the chat'));
    });

    //listen for usernames on the typing event and send it back on the incoming event
    socket.on('typing', (username) => {
        io.emit('incoming', username);
    });

    //listen for chat message
    socket.on('chat_message', (msg) => {
        io.emit('NewMessage',formatUsers(msg,userId));
        // users.foow1.lemit('message', (msg));
    });

});


server.listen(PORT, () => console.log(`listening on port ${PORT}`));