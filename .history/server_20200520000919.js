const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const PORT = 3000;
const qs = require('qs');
const {MongoClient} = require('mongodb');
const formatMessage = require('./FE/formatMessage.js');
const formatUsers = require('./FE/users.js')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const chatbot = 'chabot';
const uri = "mongodb+srv://ibifuro:<password>@onebee9-6shml.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);


//middleware
app.use(express.static(path.join(__dirname + '/FE/')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//function to provide complete user details after login
app.get('/api/userDetails', (request, response) => {
    const username = req.query.username; // this is a destructured version of const language = request.query.to, format is const{key}=request.query
    const room = request.query.room;
    const id = socket.id;
    const userDetails={username,room,id};
    response.json(userDetails); 
    console.log(userDetails);
});


io.on('connection', socket => {
    // get message time and Id;
    const userId = socket.id;
    //function to provide complete user details after login
    app.post('/api/userDetails', (request, response) => {
        const username = req.body.username; // this is a destructured version of const language = request.query.to, format is const{key}=request.query
        const room = request.body.room;
        const id = socket.id;
        const userDetails={username,room,id};
        response.json(userDetails); 
        console.log(userDetails);
    });

    //recieve first message from user
    socket.on("firstMessage",(userDetails)=>{
        userDetails.push(userId);
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