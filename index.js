const path = require('path');
const express = require('express');
const app = express();

//Setting
app.set('port', process.env.PORT || 4001);

//Static files
app.use(express.static(path.join(__dirname, 'src', 'public'))); 

//Start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//Websockets
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on('users_num', () => {
        let act_users = socket.client.conn.server.clientsCount;
        io.sockets.emit('users_num', act_users);
    });
    socket.on('disconnect',() => {
        let act_users = socket.client.conn.server.clientsCount;
        io.sockets.emit('users_num', act_users);
    });    
});
