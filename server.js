const express = require('express');
const app = express();
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

app.use(express.static('./client'))

// Run when client connect 

const PORT = 80 || process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));
const io = socketio(server);

io.on('connection', socket => {


    //Join room 
    socket.on('joinRoom', (data) => {
        const user = userJoin(socket.id, data.username, data.room)
        socket.join(user.room)

        io.to(user.room).emit('getUsers', getRoomUsers(user.room));

        //console.log('New client connected..')
        socket.emit('message', formatMessage("Admin(管理员)", 'Welcome to live chatting(欢迎来到聊天室)'))

        socket.broadcast.to(user.room).emit('message', formatMessage("Admin", `${user.username} joined the chat!`))

        // Run client disconnects 
        socket.on('disconnect', () => {

            io.to(user.room).emit('message', formatMessage("Admin", `${user.username} has left chat`));
            io.to(user.room).emit('getUsers', userLeave(socket.id));
        })

        //Listen for Chatmessage
        socket.on('chatMessage', (chatInfo) => {
            io.to(user.room).emit('message', formatMessage(chatInfo.username, chatInfo.text))
        })
    })






})

