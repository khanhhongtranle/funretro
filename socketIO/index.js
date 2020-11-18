var fs = require('fs');
var express = require('express');
var app = new express();
var options = {
    key: fs.readFileSync('ssl/key.txt'),
    cert: fs.readFileSync('ssl/cert.txt'),
    requestCert: true,
    rejectUnauthorized: false
};
var callservice = require('https').createServer(options, app);
callservice.listen(9019);
var io = require('socket.io').listen(callservice);io.sockets.on('connection', function (socket) {
    socket.on('login', function (data) {
        //console.log(data);
        socket.join(data);
        socket.emit('login-success',"login success with user: "+data);
    });
});
console.log('Server is running on port 9019');


//handle event from php
var iophp = require('socket.io').listen(9020);
iophp.sockets.on('connection', function (socket) {
    var request = socket.handshake.query;
    if (request.is_php_client) {
        var message = JSON.parse(request.message);
        io.sockets.emit('update_board', JSON.stringify(message));
        console.log(JSON.stringify(message));
    }
});
