const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const PORT = 3000;
const qs = require('qs');
const { MongoClient } = require('mongodb');
const formatMessage = require('./FE/formatMessage.js');
const userDetails = require('./FE/users.js')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//const username = 'username';
const chatbot = 'chabot';
const uri = "mongodb+srv://ibifuro:<password>@onebee9-6shml.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);


//set static folder
app.use(express.static(path.join(__dirname, 'FE')));

//run when a client connects
let userCount = 0;
io.on('connection', socket => {
    const userId = socket.id;
    
    // console.log(++userCount + "are connected");
    console.log(userId);

    //single client - send to just one client i.e a personal notification
    socket.emit('message', formatMessage(chatbot,'welcome to your first message!'));

    //Broadcast when a user connects( everyone except the person that sent the broadcast/person that the broadcast concerns).
    io.emit('message', formatMessage(chatbot, 'A user has joined the chat!'));

    //runs when client disconnects
    socket.on('disconnect', () => {
        // this function is used to send a message to every single person in the chat.
        io.emit('message', formatMessage(chatbot, 'a user has left the chat'));
    });
    //listen for usernames on the typing event and send it back on the incoming event
    socket.on('typing', (username) => {
        //console.log(username, '+++++');
        io.emit('incoming', username);
    });
    //listen for chat message
    socket.on('chat_message', (msg) => {
        io.emit('message',userDetails(msg,userId));
        // users.foow1.lemit('message', (msg));
    });

});


server.listen(PORT, () => console.log(`listening on port ${PORT}`));