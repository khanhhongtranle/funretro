var io = require('socket.io').listen(3005);
io.sockets.on('connection', function (socket) {
    socket.on('login', function (data) {
        console.log(data);
        socket.join(data);
        socket.emit('login-success',"login success with user: "+data);
    });
});
console.log('Server is running on port 3005');


//handle event from php
var iophp = require('socket.io').listen(3002);
iophp.sockets.on('connection', function (socket) {
    var request = socket.handshake.query;
    if (request.is_php_client) {
        var message = JSON.parse(request.message);
        io.sockets.emit('update_board', JSON.stringify(message));
        console.log(JSON.stringify(message));
    }
});
